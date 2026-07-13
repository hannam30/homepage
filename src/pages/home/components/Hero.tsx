import { Link } from "react-router-dom";

interface HeroProps {
  onNavigate?: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="top" className="relative w-full min-h-[760px] lg:min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://public.readdy.ai/ai/img_res/edited_16caa0b294cbb0e297c4d03d39073439_599f5c6e.jpg"
          alt="사주성지학회 메인 비주얼"
          className="w-full h-full object-cover object-top animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-50/70 via-background-50/30 to-background-50/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pt-28 pb-12 px-6 md:px-10 lg:px-16 min-h-[760px] lg:min-h-screen flex flex-col">
        {/* Top label */}
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="h-px w-12 bg-primary-500"></div>
          <span className="text-primary-700 text-xs tracking-[0.4em] font-label uppercase">
            Saju Counseling · Est. 2003
          </span>
        </div>

        {/* Center title */}
        <div className="flex-1 flex flex-col justify-center max-w-5xl mt-10 animate-fade-up">
          <p className="font-heading text-primary-700 text-base md:text-lg tracking-[0.3em] mb-5">四柱成志學會</p>
          <h1 className="font-heading text-primary-950 text-5xl md:text-7xl lg:text-[88px] leading-[1.18] font-light">
            운명을 읽는<br />
            <span className="font-semibold italic">삶의 이야기</span>
          </h1>
          <p className="mt-16 md:mt-20 text-primary-800 text-base md:text-lg max-w-xl leading-relaxed font-light">
            분주한 일상 속에서 길을 잃은 순간,<br className="hidden md:block" />
            당신만의 고유한 기운과 방향을 따뜻하게 풀어드립니다.
          </p>

          {/* CTA row */}
          <div className="mt-28 md:mt-36 flex flex-col sm:flex-row gap-4">
            <Link
              to="/unse"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-accent-600 text-background-50 text-sm font-medium tracking-wide whitespace-nowrap cursor-pointer hover:bg-accent-700 transition-all duration-300"
            >
              운세 확인하기
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-background-50/90 text-accent-800 group-hover:bg-accent-200 transition-colors">
                <i className="ri-arrow-right-line text-sm"></i>
              </span>
            </Link>
            <a
              onClick={(e) => { e.preventDefault(); onNavigate?.("programs"); }}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-primary-300 text-primary-800 text-sm tracking-wide whitespace-nowrap cursor-pointer hover:bg-primary-50 hover:border-primary-500 transition-all duration-300"
            >
              <i className="ri-book-open-line"></i>
              프로그램 살펴보기
            </a>
          </div>
        </div>

        {/* Bottom stats
        <div className="hidden md:grid grid-cols-4 gap-8 pt-10 mt-10 border-t border-primary-300 max-w-4xl animate-fade-in">
          {[
            { num: "30", unit: "여년", label: "상담 경력" },
            { num: "8,400+", unit: "건", label: "누적 상담" },
            { num: "120+", unit: "명", label: "전문 상담사" },
            { num: "98", unit: "%", label: "만족도" },
          ].map((s) => (
            <div key={s.label}>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-primary-950 text-3xl lg:text-4xl font-light">{s.num}</span>
                <span className="text-primary-600 text-sm">{s.unit}</span>
              </div>
              <div className="text-primary-600 text-xs tracking-[0.2em] mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}