export default function About() {
  return (
    <section id="about" className="relative bg-background-100 py-10 md:py-14 lg:py-16 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <span className="text-primary-800 text-xs tracking-[0.35em] uppercase font-label">
            / Saju Seongji Academic Society
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left visual */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-md bg-background-200">
                <img
                  src="https://readdy.ai/api/search-image?query=Antique%20Korean%20study%20room%20with%20stacks%20of%20old%20eastern%20philosophy%20manuscripts%20and%20ancient%20divination%20texts%2C%20ink%20brush%20on%20wooden%20desk%2C%20warm%20ambient%20light%20through%20paper%20screen%20window%2C%20cream%20parchment%20scrolls%2C%20scholarly%20atmosphere%2C%20refined%20editorial%20still%20life%20photography%20with%20muted%20earthy%20tones%20and%20soft%20shadows&width=1000&height=1250&seq=saju-about-study-2026c&orientation=portrait"
                  alt="성지학회 고서 연구실"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-8 -right-4 md:-right-10 bg-primary-800 text-background-50 px-7 py-6 rounded-md max-w-[260px]">
                <div className="font-heading text-3xl font-light">30<span className="font-semibold">+</span> Years</div>
                <div className="text-background-50/70 text-xs tracking-[0.2em] uppercase mt-1">기문둔갑 연구 &middot; 수련</div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-7 lg:pl-8">
            <h2 className="font-heading text-foreground-950 text-3xl md:text-4xl lg:text-5xl leading-[1.2] font-light">
              기문둔갑,<br />
              <span className="italic font-medium text-primary-700">시공간을 읽고</span>
              <br />
              운명을 설계하는 지혜
            </h2>

            <p className="mt-6 text-foreground-800 text-base md:text-lg leading-[1.75] font-light text-justify">
              사주성지학회는 지난 30여 년 동안 동양학의 정수인 &lsquo;기문둔갑(奇門遁甲)&rsquo;을
              깊이 있게 연구하고 수련해 왔습니다, 엄격한 수련 과정을 거치며 동문수학한 인재 분들,
              20년 이상의 기문둔갑 수련자 분들과 지속적으로 교류를 이루면서, 학문적 이론에만
              머무르지 않고, 삶의 지혜와 실전 적용을 통해 현대인들이 스스로의 길을 찾고
              위기를 기회로 바꿀 수 있도록 돕고 있습니다. 오랜 시간 축적된 데이터와 정통 수련법을
              바탕으로, 동양학의 가치를 현대적으로 계승 발전시켜 나가는데 최선을 다하고 있습니다.
            </p>

            <p className="mt-5 text-foreground-800 text-base md:text-lg leading-[1.75] font-light text-justify">
              긴 시간에 걸쳐 누적된 경험과 시중의 단편적인 이론에 의존하지 않고, 역사적으로
              검증된 50여 권의 방대한 기문둔갑 고서(古書)들을 철저히 고증하고 분석하여,
              방대한 문헌 속 핵심 비법을 집대성한 독자적인 &lsquo;성지 기문둔갑 프로그램&rsquo;을
              자체 개발하는 쾌거를 이루었습니다. 특히 이 프로그램은 그 독창성과 기술력을
              인정받아 현재 저작권 등록을 완료하였으며, 특허 출원을 진행 중에 있어
              학문적&middot;법적 공신력을 모두 확보하였습니다.
            </p>

            <p className="mt-5 text-foreground-800 text-base md:text-lg leading-[1.75] font-light text-justify">
              이처럼 역사적 고증을 마친 독자적인 프로그램 시스템은 본 학회의 오랜 자산인
              깊이 있는 임상 데이터와 만나 더욱 정교하고 강력한 시너지를 내고 있습니다.
              이는 단순한 프로그램을 넘어, 현대인들의 복잡한 삶을 완벽하게 진단하고 치유하는
              가장 과학적이고 확실한 도구가 되었습니다.
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-5 mt-8 pt-8 border-t border-background-300/70">
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

        {/* Closing statement */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="w-12 h-px bg-background-300/70 mx-auto mb-8" />

          <div className="flex flex-col gap-6">
            <p className="text-foreground-800 text-base md:text-lg leading-[1.75] font-light text-justify">
              이제 성지사주학회는 정통 학문의 맥을 올바르게 이어가는 것을 넘어,
              여러분의 삶이 두려움에서 확신으로 바뀌는 그 모든 여정에 가장 든든한 동반자가 되고자 합니다.
              정밀한 프로그램의 과학성과 오랜 수련으로 다져진 직관을 통해,
              시공간의 흐름을 포착하고 위기를 기회로 바꾸는 능동적인 삶의 전략을 제시해 드리겠습니다.
              동양학의 진정한 가치와 지혜를 증명해 나갈 성지사주학회의 걸음에
              앞으로도 따뜻한 관심과 성원을 부탁드립니다. 감사합니다.
            </p>

            <div className="w-16 h-px bg-background-300/60 mx-auto" />

            <p className="text-foreground-800 text-base md:text-lg leading-[1.75] font-light text-justify">
              시공간의 흐름을 포착하여 능동적으로 삶을 개척해 나가는 최고의 전략입니다.
              성지사주학회는 앞으로도 정통 학문의 맥을 올바르게 이어가며,
              여러분의 삶이 두려움에서 확신으로 바뀌는 그 모든 여정에 든든한 동반자로
              함께할 것을 약속드립니다.
            </p>

            <div className="w-16 h-px bg-background-300/60 mx-auto" />

            <p className="text-center text-foreground-700 text-lg md:text-xl font-medium font-heading">
              감사합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}