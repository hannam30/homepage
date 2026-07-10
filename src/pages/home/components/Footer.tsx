import { socialLinks } from "@/mocks/home";

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-primary-950 text-background-50 px-6 md:px-10 lg:px-16 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-background-50/10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-500 text-foreground-950">
                <span className="font-heading text-xl font-semibold">志</span>
              </div>
              <div>
                <div className="font-heading text-2xl font-medium">사주성지학회</div>
                <div className="text-xs tracking-[0.25em] text-background-50/60">四柱成志學會</div>
              </div>
            </div>
            <p className="text-background-50/70 text-sm leading-[1.85] font-light max-w-md">
              사주성지학회는 동양 명리(命理)의 학문적 깊이를 회복하고,
              현대인의 삶에 닿는 통찰로 재해석하는 비영리 학술 공동체입니다.
            </p>

            <div className="mt-8 space-y-3 text-sm text-background-50/75">
              <div className="flex items-start gap-3">
                <i className="ri-map-pin-line text-accent-400 mt-0.5 w-4 h-4 flex items-center justify-center"></i>
                <span>서울특별시 종로구 인사동길 12, 성지빌딩 5층</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-phone-line text-accent-400 w-4 h-4 flex items-center justify-center"></i>
                <span>02-720-8400 (평일 10:00 - 18:00)</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-mail-line text-accent-400 w-4 h-4 flex items-center justify-center"></i>
                <a href="mailto:info@saju-society.kr" className="hover:text-accent-300 cursor-pointer transition-colors">info@saju-society.kr</a>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading text-base font-medium mb-5">학회 안내</h4>
              <ul className="space-y-3 text-sm text-background-50/70">
                {["학회 소개", "연구진 소개", "윤리 강령", "찾아오시는 길", "연혁"].map((l) => (
                  <li key={l}><a onClick={(e) => { e.preventDefault(); onNavigate?.("about"); }} className="hover:text-accent-300 cursor-pointer transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-base font-medium mb-5">프로그램</h4>
              <ul className="space-y-3 text-sm text-background-50/70">
                {["입문 과정", "심화 연구", "응용 워크숍", "전문가 자격", "주역·풍수 특강"].map((l) => (
                  <li key={l}><a onClick={(e) => { e.preventDefault(); onNavigate?.("programs"); }} className="hover:text-accent-300 cursor-pointer transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-heading text-base font-medium mb-5">소셜 채널</h4>
              <ul className="space-y-3 text-sm text-background-50/70">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="nofollow noopener"
                      className="inline-flex items-center gap-3 hover:text-accent-300 cursor-pointer transition-colors"
                    >
                      <span className="w-5 h-5 flex items-center justify-center">
                        <i className={s.icon}></i>
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social row + copyright */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="nofollow noopener"
                aria-label={s.label}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-background-50/20 hover:bg-accent-500 hover:border-accent-500 hover:text-foreground-950 transition-all cursor-pointer"
              >
                <i className={`${s.icon} text-base`}></i>
              </a>
            ))}
          </div>
          <div className="text-background-50/55 text-xs tracking-wide flex flex-wrap gap-x-5 gap-y-2">
            <span>© 2026 사주성지학회 (四柱成志學會). All rights reserved.</span>
            <a href="#" className="hover:text-accent-300 cursor-pointer transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-accent-300 cursor-pointer transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}