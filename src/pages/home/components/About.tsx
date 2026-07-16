import { useState } from "react";
import { societyNews } from "@/mocks/home";

type AboutTab = "society" | "news" | "location";

const tabs: { id: AboutTab; label: string }[] = [
  { id: "society", label: "사주성지학회" },
  { id: "news", label: "학회소식" },
  { id: "location", label: "오시는 길" },
];

export default function About() {
  const [tab, setTab] = useState<AboutTab>("society");

  return (
    <section id="about" className="relative bg-background-100 py-10 md:py-14 lg:py-16 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="text-primary-800 text-xs tracking-[0.35em] uppercase font-label">
            / About
          </span>
        </div>

        <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl font-light mb-8">
          학회 소개
        </h2>

        <div className="flex flex-wrap gap-2 md:gap-3 mb-10 border-b border-background-300/70 pb-1">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 text-sm tracking-wide transition-colors cursor-pointer border-b-2 -mb-px ${
                  active
                    ? "border-accent-600 text-accent-700 font-medium"
                    : "border-transparent text-primary-800 hover:text-accent-600"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "society" && <SocietyPanel />}
        {tab === "news" && <NewsPanel />}
        {tab === "location" && <LocationPanel />}
      </div>
    </section>
  );
}

function SocietyPanel() {
  return (
    <div className="pb-16 md:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5 pb-10">
          <div className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-md bg-background-200">
              <img
                src="https://readdy.ai/api/search-image?query=Antique%20Korean%20study%20room%20with%20stacks%20of%20old%20eastern%20philosophy%20manuscripts%20and%20ancient%20divination%20texts%2C%20ink%20brush%20on%20wooden%20desk%2C%20warm%20ambient%20light%20through%20paper%20screen%20window%2C%20cream%20parchment%20scrolls%2C%20scholarly%20atmosphere%2C%20refined%20editorial%20still%20life%20photography%20with%20muted%20earthy%20tones%20and%20soft%20shadows&width=1000&height=1250&seq=saju-about-study-2026c&orientation=portrait"
                alt="성지학회 고서 연구실"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-primary-800 text-background-50 px-7 py-6 rounded-md max-w-[240px]">
              <div className="font-heading text-3xl font-light">
                30<span className="font-semibold">+</span> Years
              </div>
              <div className="text-background-50/70 text-xs tracking-[0.2em] uppercase mt-1">
                기문둔갑 연구 &middot; 수련
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <h3 className="font-heading text-foreground-950 text-2xl md:text-3xl lg:text-4xl leading-[1.25] font-light">
            기문둔갑,
            <br />
            <span className="italic font-medium text-primary-700">시공간을 읽고</span>
            <br />
            운명을 설계하는 지혜
          </h3>

          <p className="mt-6 text-foreground-800 text-base md:text-lg leading-[1.75] font-light text-justify">
            사주성지학회는 지난 30여 년 동안 동양학의 정수인 &lsquo;기문둔갑(奇門遁甲)&rsquo;을
            깊이 있게 연구하고 수련해 왔습니다. 엄격한 수련 과정을 거치며 동문수학한 인재 분들,
            20년 이상의 기문둔갑 수련자 분들과 지속적으로 교류를 이루면서, 학문적 이론에만
            머무르지 않고, 삶의 지혜와 실전 적용을 통해 현대인들이 스스로의 길을 찾고
            위기를 기회로 바꿀 수 있도록 돕고 있습니다.
          </p>

          <p className="mt-5 text-foreground-800 text-base md:text-lg leading-[1.75] font-light text-justify">
            역사적으로 검증된 50여 권의 기문둔갑 고서(古書)들을 철저히 고증·분석하여,
            독자적인 &lsquo;성지 기문둔갑 프로그램&rsquo;을 자체 개발하였습니다.
            저작권 등록을 완료하였으며, 특허 출원을 진행 중에 있습니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mt-8 pt-8 border-t border-background-300/70">
            {[
              {
                icon: "ri-file-copy-2-line",
                title: "문헌 고증",
                desc: "50여 권의 기문둔갑 고서를 철저히 고증·분석하여 핵심 비법 집대성",
              },
              {
                icon: "ri-shield-check-line",
                title: "법적 공신력",
                desc: "저작권 등록 완료 및 특허 출원 진행 중인 독자적 프로그램",
              },
              {
                icon: "ri-database-2-line",
                title: "임상 데이터",
                desc: "오랜 기간 축적된 심층 임상 데이터로 정교한 시너지 구현",
              },
              {
                icon: "ri-user-heart-line",
                title: "삶의 동반자",
                desc: "두려움에서 확신으로 — 당신의 여정에 가장 든든한 동반자",
              },
            ].map((v) => (
              <div key={v.title} className="flex gap-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-100 text-primary-700 shrink-0">
                  <i className={`${v.icon} text-xl`}></i>
                </div>
                <div>
                  <div className="font-heading text-foreground-950 text-base font-medium">{v.title}</div>
                  <div className="text-foreground-700 text-sm mt-1 leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
        <div className="w-12 h-px bg-background-300/70 mx-auto mb-8" />
        <p className="text-foreground-800 text-base md:text-lg leading-[1.75] font-light text-justify">
          이제 사주성지학회는 정통 학문의 맥을 올바르게 이어가는 것을 넘어,
          여러분의 삶이 두려움에서 확신으로 바뀌는 그 모든 여정에 가장 든든한 동반자가 되고자 합니다.
          정밀한 프로그램의 과학성과 오랜 수련으로 다져진 직관을 통해,
          시공간의 흐름을 포착하고 위기를 기회로 바꾸는 능동적인 삶의 전략을 제시해 드리겠습니다.
          동양학의 진정한 가치와 지혜를 증명해 나갈 사주성지학회의 걸음에
          앞으로도 따뜻한 관심과 성원을 부탁드립니다.
        </p>
        <div className="w-16 h-px bg-background-300/60 mx-auto my-6" />
        <p className="text-foreground-800 text-base md:text-lg leading-[1.75] font-light text-justify">
          시공간의 흐름을 포착하여 능동적으로 삶을 개척해 나가는 최고의 전략입니다.
          사주성지학회는 앞으로도 정통 학문의 맥을 올바르게 이어가며,
          여러분의 삶이 두려움에서 확신으로 바뀌는 그 모든 여정에 든든한 동반자로
          함께할 것을 약속드립니다.
        </p>
        <p className="mt-6 text-center text-foreground-700 text-lg md:text-xl font-medium font-heading">
          감사합니다.
        </p>
      </div>
    </div>
  );
}

function NewsPanel() {
  return (
    <div className="max-w-4xl">
      <p className="text-foreground-700 text-sm mb-8 leading-relaxed">
        학회의 공지와 일정을 최신순으로 안내합니다.
      </p>

      <ul className="divide-y divide-background-300/70 border-t border-b border-background-300/70">
        {societyNews.map((item) => (
          <li key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
            <div className="md:col-span-3 text-sm text-foreground-600 tracking-wide pt-1">
              {item.date}
            </div>
            <div className="md:col-span-9">
              <div className="flex items-start gap-3">
                <h3 className="font-heading text-foreground-950 text-lg md:text-xl font-medium leading-snug">
                  {item.title}
                </h3>
                {item.isNew && (
                  <span className="shrink-0 mt-1 text-[10px] tracking-wider uppercase px-2 py-0.5 bg-accent-600 text-background-50">
                    New
                  </span>
                )}
              </div>
              <p className="mt-3 text-foreground-800 text-sm md:text-base leading-[1.75] font-light">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LocationPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
      <div className="lg:col-span-5 space-y-8">
        <div>
          <h3 className="font-heading text-foreground-950 text-2xl font-medium mb-4">주소</h3>
          <p className="text-foreground-950 text-base md:text-lg leading-relaxed font-medium">
            서울특별시 은평구 연서로20길 5
          </p>
          <p className="text-foreground-600 text-sm mt-1.5">
            (지번) 대조동 221-61
          </p>
        </div>

        <div>
          <h3 className="font-heading text-foreground-950 text-2xl font-medium mb-5">지하철</h3>
          <ul className="space-y-5">
            <li className="flex gap-4">
              <div className="shrink-0 flex gap-1.5">
                <span className="w-9 h-9 rounded-full bg-[#EF7C1C] text-white text-sm font-semibold flex items-center justify-center">
                  3
                </span>
                <span className="w-9 h-9 rounded-full bg-[#CD7C2F] text-white text-sm font-semibold flex items-center justify-center">
                  6
                </span>
              </div>
              <div>
                <div className="text-foreground-950 font-medium">연신내역</div>
                <div className="text-foreground-700 text-sm mt-1 leading-relaxed">
                  도보 약 5~7분
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 w-9 h-9 rounded-full bg-[#CD7C2F] text-white text-sm font-semibold flex items-center justify-center">
                6
              </span>
              <div>
                <div className="text-foreground-950 font-medium">구산역</div>
                <div className="text-foreground-700 text-sm mt-1 leading-relaxed">
                  도보 약 5~7분
                </div>
              </div>
            </li>
          </ul>
        </div>

        <a
          href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%9D%80%ED%8F%89%EA%B5%AC%20%EC%97%B0%EC%84%9C%EB%A1%9C20%EA%B8%B8%205"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-accent-700 hover:text-accent-800 transition-colors cursor-pointer"
        >
          네이버 지도에서 길찾기
          <i className="ri-external-link-line"></i>
        </a>

        <p className="text-foreground-600 text-sm leading-relaxed">
          방문 상담은 사전 예약 후 이용해 주시기 바랍니다.
        </p>
      </div>

      <div className="lg:col-span-7">
        <div className="overflow-hidden rounded-md bg-background-200 border border-background-300/50">
          <img
            src="/images/location-map.png"
            alt="사주성지학회 오시는 길 — 연서로20길 5, 연신내역·구산역 도보 5~7분"
            className="w-full h-auto object-cover object-center"
          />
        </div>
        <p className="mt-3 text-foreground-600 text-xs tracking-wide">
          연신내역 · 구산역에서 도보 약 5~7분
        </p>
      </div>
    </div>
  );
}
