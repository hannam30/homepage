import { youtubeVideos } from "@/mocks/home";

interface FortuneAndYoutubeProps {
  onNavigate?: (section: string) => void;
}

export default function FortuneAndYoutube({ onNavigate }: FortuneAndYoutubeProps) {
  return (
    <>
      {/* Fortune Service */}
      <section id="fortune" className="relative bg-primary-900 text-background-50 py-10 md:py-14 lg:py-16 px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Decorative bg image */}
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://readdy.ai/api/search-image?query=Abstract%20oriental%20constellation%20chart%20painted%20with%20gold%20ink%20on%20deep%20brown%20parchment%2C%20faint%20chinese%20zodiac%20symbols%20and%20bazi%20pillars%20arranged%20in%20geometric%20pattern%2C%20moody%20warm%20amber%20glow%2C%20stylized%20abstract%20art%20composition%2C%20editorial%20fine%20art%20background%20with%20rich%20texture&width=2000&height=1200&seq=saju-fortune-bg-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-400"></span>
                <span className="text-accent-300 text-xs tracking-[0.35em] uppercase font-label">Fortune Reading</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-light">
                학회 인증 전문가와<br />
                <span className="italic font-medium text-accent-300">1:1 사주 상담</span>을<br />
                예약하세요.
              </h2>
              <p className="mt-8 text-background-50/75 text-base md:text-lg leading-[1.85] font-light max-w-2xl">
                학회가 양성한 인증 상담사가 60분 동안 당신의 명조(命造)를 함께 읽어드립니다.
                대운·세운의 흐름, 직업·관계·재물의 가능성을 차분하게 풀어내며,
                상담 후에는 손글씨 명식지(命式紙)를 우편으로 보내드립니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                {[
                  { icon: "ri-time-line", title: "60분 심층", desc: "전화 · 화상 · 대면" },
                  { icon: "ri-shield-check-line", title: "윤리 인증", desc: "학회 자격 보유" },
                  { icon: "ri-mail-send-line", title: "명식지 발송", desc: "손글씨 정본" },
                ].map((f) => (
                  <div key={f.title} className="bg-background-50/5 border border-background-50/10 rounded-md p-5">
                    <i className={`${f.icon} text-accent-400 text-xl`}></i>
                    <div className="font-heading text-base mt-3">{f.title}</div>
                    <div className="text-background-50/60 text-xs mt-1">{f.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  onClick={(e) => { e.preventDefault(); onNavigate?.("signup"); }}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-accent-500 text-foreground-950 text-sm font-medium tracking-wide whitespace-nowrap cursor-pointer hover:bg-accent-400 transition-colors duration-300"
                >
                  상담 예약하기
                  <i className="ri-arrow-right-line"></i>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-background-50/30 text-background-50 text-sm whitespace-nowrap cursor-pointer hover:bg-background-50/10 transition-colors duration-300"
                >
                  <i className="ri-file-list-3-line"></i>
                  상담 절차 안내
                </a>
              </div>
            </div>

            {/* Price card */}
            <div className="lg:col-span-5">
              <div className="bg-background-50 text-foreground-950 rounded-lg p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs tracking-[0.3em] uppercase text-secondary-700">Featured Plan</span>
                  <span className="px-3 py-1 rounded-full bg-accent-100 text-accent-900 text-xs">추천</span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-medium leading-snug">
                  종합 사주 풀이<br />상담 패키지
                </h3>
                <div className="flex items-baseline gap-2 mt-6">
                  <span className="font-heading text-5xl md:text-6xl font-light">₩180,000</span>
                  <span className="text-foreground-600 text-sm">/ 60분</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {[
                    "대운·세운 10년 흐름 분석",
                    "직업·재물·관계 핵심 진단",
                    "맞춤 운용 전략 3가지 처방",
                    "손글씨 명식지 우편 발송",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground-800 text-sm">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-700 text-background-50 shrink-0 mt-0.5">
                        <i className="ri-check-line text-xs"></i>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  onClick={(e) => { e.preventDefault(); onNavigate?.("signup"); }}
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary-800 hover:bg-primary-900 text-background-50 text-sm font-medium tracking-wide whitespace-nowrap cursor-pointer transition-colors duration-300"
                >
                  지금 예약하기 →
                </a>
                <p className="text-foreground-500 text-xs text-center mt-4">전일 예약 취소 시 100% 환불</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section id="youtube" className="relative bg-background-50 py-10 md:py-14 lg:py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <i className="ri-youtube-fill text-accent-600 text-xl w-5 h-5 flex items-center justify-center"></i>
                <span className="text-secondary-700 text-xs tracking-[0.35em] uppercase font-label">Youtube · 성지명리</span>
              </div>
              <h2 className="font-heading text-foreground-950 text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-light max-w-3xl">
                영상으로 만나는<br />
                <span className="italic font-medium">학회 명리 강의</span>
              </h2>
            </div>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="nofollow noopener"
              className="inline-flex items-center gap-3 text-foreground-800 text-sm cursor-pointer hover:text-primary-700 transition-colors whitespace-nowrap"
            >
              유튜브 채널 전체 보기
              <span className="w-9 h-9 flex items-center justify-center rounded-full border border-background-300 group-hover:border-primary-700">
                <i className="ri-arrow-right-up-line"></i>
              </span>
            </a>
          </div>

          {/* Featured + side videos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Featured */}
            <a href="https://youtube.com" target="_blank" rel="nofollow noopener" className="lg:col-span-8 group relative aspect-[16/10] rounded-lg overflow-hidden cursor-pointer">
              <img
                src="https://readdy.ai/api/search-image?query=Cinematic%20oriental%20astrology%20video%20thumbnail%20with%20handwritten%20bazi%20chart%20on%20cream%20parchment%2C%20chinese%20calligraphy%20brush%20strokes%20and%20golden%20zodiac%20symbols%2C%20warm%20amber%20studio%20lighting%2C%20moody%20editorial%20photography%2C%20professional%20academic%20mood%2C%20muted%20brown%20and%20cream%20palette&width=1600&height=1000&seq=saju-yt-featured-2026&orientation=landscape"
                alt={youtubeVideos[0].title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/85 via-foreground-950/20 to-transparent"></div>
              <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-accent-500 text-foreground-950 text-xs font-medium tracking-wide">
                FEATURED
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center rounded-full bg-background-50/95 text-primary-800 group-hover:scale-110 transition-transform duration-500">
                <i className="ri-play-fill text-3xl ml-1"></i>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-background-50/70 text-xs tracking-[0.25em] uppercase mb-2">최신 강의 · 2026.06</div>
                <h3 className="font-heading text-background-50 text-2xl md:text-4xl font-light leading-tight max-w-2xl">
                  {youtubeVideos[0].title}
                </h3>
                <div className="flex items-center gap-5 mt-4 text-background-50/80 text-xs">
                  <span className="flex items-center gap-1.5"><i className="ri-eye-line"></i>{youtubeVideos[0].views} 조회</span>
                  <span className="flex items-center gap-1.5"><i className="ri-time-line"></i>{youtubeVideos[0].duration}</span>
                </div>
              </div>
            </a>

            {/* Side list */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {youtubeVideos.slice(1).map((v, i) => (
                <a
                  key={v.title}
                  href="https://youtube.com"
                  target="_blank"
                  rel="nofollow noopener"
                  className="group flex-1 relative rounded-lg overflow-hidden bg-background-100 min-h-[180px] flex flex-col justify-end cursor-pointer"
                >
                  <img
                    src={i === 0
                      ? "https://readdy.ai/api/search-image?query=Oriental%20calligraphy%20brush%20painting%20chinese%20zodiac%20year%20of%20horse%202026%20on%20deep%20cream%20parchment%2C%20gold%20ink%20strokes%2C%20warm%20moody%20studio%20lighting%2C%20editorial%20fine%20art%20photography%2C%20muted%20amber%20palette%2C%20refined%20academic%20composition&width=1000&height=700&seq=saju-yt-side-1-2026&orientation=landscape"
                      : "https://readdy.ai/api/search-image?query=Vintage%20wooden%20desk%20with%20twelve%20small%20porcelain%20cups%20arranged%20in%20circle%20representing%20chinese%20zodiac%2C%20warm%20amber%20candle%20light%2C%20soft%20cream%20parchment%20background%2C%20editorial%20still%20life%20photography%2C%20muted%20earthy%20brown%20tones%2C%20refined%20minimal%20composition&width=1000&height=700&seq=saju-yt-side-2-2026&orientation=landscape"}
                    alt={v.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/85 to-transparent"></div>
                  <div className="relative p-5">
                    <div className="flex items-center gap-3 text-background-50/80 text-[10px] tracking-[0.2em] uppercase mb-2">
                      <span>{v.duration}</span>
                      <span>·</span>
                      <span>{v.views} 조회</span>
                    </div>
                    <h3 className="font-heading text-background-50 text-base md:text-lg font-light leading-snug">
                      {v.title}
                    </h3>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-background-50/95 text-primary-800 group-hover:bg-accent-500 transition-colors">
                    <i className="ri-play-fill text-lg ml-0.5"></i>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}