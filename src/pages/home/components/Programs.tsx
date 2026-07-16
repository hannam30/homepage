import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { programs, phonePrograms } from "@/mocks/home";

interface ProgramsProps {
  onNavigate?: (section: string) => void;
}

type ProgramCard = {
  version: string;
  title: string;
  desc: string;
  images?: string[];
  features?: string[];
  badge?: string;
};

function ImageSlider({
  images,
  isHovered,
  version,
  compact = false,
}: {
  images: string[];
  isHovered: boolean;
  version: string;
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isHovered || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  useEffect(() => {
    if (!isHovered) setIndex(0);
  }, [isHovered]);

  return (
    <div className={`flex items-center justify-center bg-white ${compact ? "p-3" : "p-4"}`}>
      <div
        className="relative grid w-full bg-white"
        style={{
          maxWidth: compact ? "320px" : "460px",
          height: compact ? "420px" : "370px",
        }}
      >
        {images.map((img, i) => (
          <img
            key={`${version}-${i}`}
            src={img}
            alt={`프로그램 이미지 ${i + 1}`}
            style={{ gridArea: "1 / 1" }}
            className={`block max-w-full max-h-full w-auto h-auto object-contain place-self-center transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {images.length > 1 && (
          <div
            style={{ gridArea: "1 / 1" }}
            className="relative z-10 self-end justify-self-center flex items-center gap-1.5 pb-1"
          >
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i === index ? "bg-primary-500" : "bg-black/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgramCardGrid({
  items,
  numberOffset = 0,
  badgeFallback,
  columns = 2,
}: {
  items: ProgramCard[];
  numberOffset?: number;
  badgeFallback?: (p: ProgramCard) => string;
  columns?: 2 | 3;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const toggleExpand = (e: React.MouseEvent, version: string) => {
    e.stopPropagation();
    setExpandedVersion((prev) => {
      if (prev === version) {
        const cardEl = cardRefs.current.get(version);
        if (cardEl) {
          requestAnimationFrame(() => {
            cardEl.scrollIntoView({ behavior: "instant", block: "nearest" });
          });
        }
        return null;
      }
      return version;
    });
  };

  const gridClass =
    columns === 3
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      : "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5";

  return (
    <div className={gridClass}>
      {items.map((p, i) => {
        const isExpanded = expandedVersion === p.version;
        const isHovered = activeIndex === i;
        const badge = p.badge || badgeFallback?.(p) || `Ver. ${p.version}`;
        return (
          <article
            key={p.version}
            ref={(el) => {
              if (el) cardRefs.current.set(p.version, el);
              else cardRefs.current.delete(p.version);
            }}
            className={`group relative bg-background-100 border rounded-lg overflow-hidden transition-all duration-500 ${
              isExpanded
                ? "border-primary-300"
                : "border-background-200/80 hover:border-primary-300"
            } ${p.features ? "cursor-pointer" : ""}`}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={(e) => {
              const related = e.relatedTarget;
              const card = e.currentTarget;
              if (!related || !(related instanceof Node) || !card.contains(related)) {
                setActiveIndex(null);
              }
            }}
          >
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary-500 text-background-50 text-xs font-label tracking-wider rounded-md whitespace-nowrap shadow-sm z-20">
              {badge}
            </div>

            <div className="relative bg-white overflow-hidden">
              <ImageSlider
                images={p.images || []}
                isHovered={isHovered}
                version={p.version}
                compact={columns === 3}
              />
              <div
                className={`absolute inset-0 z-10 bg-primary-900/40 transition-opacity duration-500 pointer-events-none ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            <div className={`p-5 ${columns === 3 ? "md:p-5" : "md:p-6"}`}>
              <div className="flex items-center justify-between mb-2 gap-2">
                <h3 className={`font-heading text-foreground-950 font-medium leading-snug ${columns === 3 ? "text-base md:text-lg" : "text-lg md:text-xl"}`}>
                  {p.title}
                </h3>
                <span className="font-heading text-foreground-300 text-sm tracking-widest shrink-0">
                  {String(numberOffset + i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className={`text-foreground-600 leading-[1.75] font-light ${columns === 3 ? "text-xs md:text-sm" : "text-sm"}`}>
                {p.desc}
              </p>
              {p.features && (
                <button
                  type="button"
                  onClick={(e) => toggleExpand(e, p.version)}
                  className="mt-3 inline-flex items-center gap-2 text-primary-600 text-xs font-label hover:text-primary-700 transition-colors whitespace-nowrap"
                >
                  <span>주요 특징 살펴보기</span>
                  <i
                    className={`ri-arrow-down-s-line transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            {p.features && isExpanded && (
              <div
                className="border-t border-background-200/80"
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent-500" />
                    <h3 className="font-heading text-foreground-950 text-sm md:text-base font-medium">
                      주요 특징
                    </h3>
                    <span className="text-foreground-300 text-xs tracking-widest">
                      총 {p.features.length}가지
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {p.features.map((feature, fi) => (
                      <div
                        key={fi}
                        className="flex items-start gap-3 p-3 bg-background-50 rounded-md border border-background-200/50"
                      >
                        <span className="w-6 h-6 flex items-center justify-center shrink-0 rounded-full bg-primary-100 text-primary-700 text-xs font-bold mt-0.5">
                          {fi + 1}
                        </span>
                        <p className="text-foreground-800 text-sm leading-[1.7] font-normal">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={(e) => toggleExpand(e, p.version)}
                      className="inline-flex items-center gap-1.5 text-foreground-500 text-xs hover:text-foreground-800 transition-colors whitespace-nowrap"
                    >
                      <i className="ri-arrow-up-s-line" />
                      접기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default function Programs({ onNavigate }: ProgramsProps) {
  return (
    <section
      id="programs"
      className="relative bg-background-50 py-10 md:py-14 lg:py-16 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent-500" />
              <span className="text-secondary-700 text-xs tracking-[0.35em] uppercase font-label">
                Programs
              </span>
            </div>
            <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-light max-w-3xl">
              성지 기문둔갑
              <br />
              <span className="italic font-medium">프로그램</span>
            </h2>
          </div>
          <p className="text-foreground-700 text-sm leading-relaxed max-w-md font-light">
            30년 연구와 50여 권 고서 고증을 바탕으로 자체 개발한 독자적 시스템.
            2.0부터 7.0까지 버전별로 진화하는 기문둔갑 분석 플랫폼입니다.
          </p>
        </div>

        {/* Instant Fortune */}
        <div className="mb-10 md:mb-12 bg-primary-900 rounded-lg overflow-hidden">
          <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent-400" />
              <span className="text-accent-300 text-xs tracking-[0.3em] uppercase font-label">
                Instant Fortune · Mobile
              </span>
            </div>
            <h3 className="font-heading text-background-50 text-2xl md:text-3xl lg:text-4xl leading-[1.15] font-light mb-4">
              58가지 핵심 운세
              <br />
              <span className="font-medium italic">즉답 시스템</span>
            </h3>
            <p className="text-background-50/70 text-sm md:text-base leading-relaxed font-light mb-6 max-w-2xl">
              20년 이상의 사주전문가팀이 엄선한 58가지 핵심 운세 항목을
              즉답으로 확인하세요. 믿고 보는 운세의 기운, 항목마다
              1,000원부터 시작됩니다. 모바일에서도 바로 확인할 수 있습니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-500/20 text-accent-400 text-sm shrink-0">
                  <i className="ri-check-line" />
                </span>
                <div>
                  <div className="text-background-50 text-sm font-medium mb-0.5">
                    58가지 핵심 문항
                  </div>
                  <div className="text-background-50/50 text-xs">
                    전문가 엄선 질문
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-500/20 text-accent-400 text-sm shrink-0">
                  <i className="ri-check-line" />
                </span>
                <div>
                  <div className="text-background-50 text-sm font-medium mb-0.5">
                    모바일 전용 화면
                  </div>
                  <div className="text-background-50/50 text-xs">
                    핸드폰에서도 바로 확인
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-500/20 text-accent-400 text-sm shrink-0">
                  <i className="ri-check-line" />
                </span>
                <div>
                  <div className="text-background-50 text-sm font-medium mb-0.5">
                    1,000원부터
                  </div>
                  <div className="text-background-50/50 text-xs">
                    항목별 부담 없는 가격
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-500/20 text-accent-400 text-sm shrink-0">
                  <i className="ri-check-line" />
                </span>
                <div>
                  <div className="text-background-50 text-sm font-medium mb-0.5">
                    무료맛보기 ~ 패키지
                  </div>
                  <div className="text-background-50/50 text-xs">
                    다양한 이용 옵션
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/unse"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-500 text-foreground-950 text-sm font-medium rounded-md whitespace-nowrap cursor-pointer hover:bg-accent-400 transition-colors"
              >
                운세 확인하기
                <i className="ri-arrow-right-line" />
              </Link>
              <span className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-background-50/20 text-background-50/70 text-sm rounded-md whitespace-nowrap">
                <i className="ri-smartphone-line" />
                모바일 버전 지원
              </span>
            </div>
          </div>
        </div>

        {/* Program Cards: 2.0 → 3.0 → 5.0 → 7.0 */}
        <ProgramCardGrid
          items={programs}
          badgeFallback={(p) => `Ver. ${p.version}`}
        />

        {/* Phone Programs — 7.0 아래, PC와 동일 폼 */}
        <div className="mt-14 md:mt-16 mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            <span className="text-secondary-700 text-xs tracking-[0.35em] uppercase font-label">
              Mobile Apps
            </span>
          </div>
          <h3 className="font-heading text-foreground-950 text-2xl md:text-3xl leading-[1.15] font-light">
            핸드폰버전 <span className="italic font-medium">프로그램</span>
          </h3>
          <p className="mt-3 text-foreground-700 text-sm leading-relaxed max-w-2xl font-light">
            PC 전문 프로그램을 모바일로 이식한 구성학·58가지 운세·기문둔갑.
            언제 어디서나 동일한 해석 체계를 확인할 수 있습니다.
          </p>
        </div>

        <ProgramCardGrid
          items={phonePrograms}
          numberOffset={programs.length}
          badgeFallback={() => "Phone"}
          columns={3}
        />
      </div>
    </section>
  );
}
