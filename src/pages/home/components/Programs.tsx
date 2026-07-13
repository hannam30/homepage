import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { programs } from "@/mocks/home";

interface ProgramsProps {
  onNavigate?: (section: string) => void;
}

function ImageSlider({
  images,
  isHovered,
  version,
}: {
  images: string[];
  isHovered: boolean;
  version: string;
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
    <div className="flex items-center justify-center bg-white p-4">
      <div
        className="relative grid w-full bg-white"
        style={{ maxWidth: "460px", height: "370px" }}
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

function PhoneSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative grid w-full">
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt={`성지사주 58가지 핵심운세 즉답 ${i + 1}`}
          style={{ gridArea: "1 / 1" }}
          className={`w-full h-auto object-cover transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default function Programs({ onNavigate }: ProgramsProps) {
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

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {programs.map((p, i) => {
            const isExpanded = expandedVersion === p.version;
            const isHovered = activeIndex === i;
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
                {/* Version Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary-500 text-background-50 text-xs font-label tracking-wider rounded-md whitespace-nowrap shadow-sm z-20">
                  Ver. {p.version}
                </div>

                {/* Screenshot with slider */}
                <div className="relative bg-white overflow-hidden">
                  <ImageSlider
                    images={p.images || []}
                    isHovered={isHovered}
                    version={p.version}
                  />
                  {/* Hover dim overlay */}
                  <div
                    className={`absolute inset-0 z-10 bg-primary-900/40 transition-opacity duration-500 pointer-events-none ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-foreground-950 text-lg md:text-xl font-medium leading-snug">
                      {p.title}
                    </h3>
                    <span className="font-heading text-foreground-300 text-sm tracking-widest">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="text-foreground-600 text-sm leading-[1.75] font-light">
                    {p.desc}
                  </p>
                  {/* Click prompt for expandable versions */}
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

                {/* Expandable Feature Details */}
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

                      {/* Collapse button */}
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

        {/* 58 Questions Feature Section */}
        <div className="mt-10 md:mt-12 bg-primary-900 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Text Content */}
            <div className="lg:col-span-3 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent-400" />
                <span className="text-accent-300 text-xs tracking-[0.3em] uppercase font-label">
                  Instant Fortune
                </span>
              </div>
              <h3 className="font-heading text-background-50 text-2xl md:text-3xl lg:text-4xl leading-[1.15] font-light mb-4">
                58가지 핵심 운세
                <br />
                <span className="font-medium italic">즉답 시스템</span>
              </h3>
              <p className="text-background-50/70 text-sm md:text-base leading-relaxed font-light mb-6 max-w-lg">
                20년 이상의 사주전문가팀이 엄선한 58가지 핵심 운세 항목을
                즉답으로 확인하세요. 믿고 보는 운세의 기운, 항목마다
                1,000원부터 시작됩니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
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
                      즉답 제공
                    </div>
                    <div className="text-background-50/50 text-xs">
                      기다림 없는 결과
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
                  <i className="ri-shield-check-line" />
                  성지사주학회 제공
                </span>
              </div>
            </div>

            {/* Mobile Screenshot */}
            <div className="lg:col-span-2 relative bg-primary-800/50 flex items-center justify-center p-6 md:p-10">
              <div className="relative">
                {/* Phone frame */}
                <div className="w-[220px] md:w-[240px] rounded-[2rem] border-[6px] border-primary-700 overflow-hidden bg-primary-700 shadow-2xl">
                  <PhoneSlider
                    images={["/images/phone_1.png", "/images/phone_2.png"]}
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-accent-500/30" />
                <div className="absolute -bottom-4 -left-8 w-16 h-16 rounded-full bg-accent-500/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}