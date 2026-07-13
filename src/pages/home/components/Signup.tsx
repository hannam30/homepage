import { FormEvent, useState } from "react";

export default function Signup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot
    const honeypot = (formData.get("website_alt") as string) || "";
    if (honeypot.trim() !== "") {
      setStatus("success");
      setMessage("회원가입을 축하드립니다");
      form.reset();
      return;
    }

    // Validate
    const email = (formData.get("email") as string) || "";
    const name = (formData.get("name") as string) || "";
    if (!email || !name) {
      setStatus("error");
      setMessage("이름과 이메일을 모두 입력해 주세요.");
      return;
    }
    const message = (formData.get("message") as string) || "";
    if (message.length > 500) {
      setStatus("error");
      setMessage("문의 내용은 500자 이내로 작성해 주세요.");
      return;
    }

    setStatus("loading");

    const payload = new URLSearchParams();
    formData.forEach((value, key) => {
      if (key === "website_alt") return;
      if (typeof value === "string" && value.trim() !== "") {
        payload.append(key, value);
      }
    });

    try {
      const res = await fetch("https://readdy.ai/api/form/d907joo4jh3v1cgkskk0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setMessage("회원가입을 축하드립니다");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("일시적 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <section id="signup" className="relative bg-background-50 py-10 md:py-14 lg:py-16 px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-500"></span>
              <span className="text-secondary-700 text-xs tracking-[0.35em] uppercase font-label">Membership</span>
            </div>
            <h2 className="font-heading text-foreground-950 text-4xl md:text-5xl leading-[1.1] font-light">
              학회와 함께<br />
              <span className="italic font-medium text-primary-700">운명의 길</span>을 걷다.
            </h2>
            <div className="mt-14 space-y-4">
              {[
                "정기 학술 모임 우선 신청 권한",
                "회원 전용 강의 20% 할인",
                "학회 인증 자격 과정 우선 안내",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-foreground-800 text-sm">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-foreground-950 shrink-0 mt-0.5">
                    <i className="ri-check-line text-xs"></i>
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              data-readdy-form
              id="signup-form-saju"
              className="bg-background-100 border border-background-200 rounded-lg p-8 md:p-10"
            >
              <h3 className="font-heading text-foreground-950 text-2xl md:text-3xl font-medium mb-2">회원 가입 신청</h3>
              <p className="text-foreground-600 text-sm mb-8">아래 정보를 입력해 주시면 24시간 내 담당자가 안내드립니다.</p>

              {/* Honeypot */}
              <div className="hp-field-decoy" aria-hidden="true">
                <label>웹사이트 (입력하지 마세요)
                  <input
                    type="text"
                    name="website_alt"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-foreground-700 text-xs tracking-wider uppercase mb-2">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-background-300 focus:border-primary-700 outline-none text-sm text-foreground-950 placeholder:text-foreground-400"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-foreground-700 text-xs tracking-wider uppercase mb-2">이메일 *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-background-300 focus:border-primary-700 outline-none text-sm text-foreground-950 placeholder:text-foreground-400"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-foreground-700 text-xs tracking-wider uppercase mb-2">연락처</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-0 py-3 bg-transparent border-b border-background-300 focus:border-primary-700 outline-none text-sm text-foreground-950 placeholder:text-foreground-400"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-foreground-700 text-xs tracking-wider uppercase mb-2">관심 분야</label>
                  <select
                    name="interest"
                    className="w-full px-0 py-3 bg-transparent border-b border-background-300 focus:border-primary-700 outline-none text-sm text-foreground-950 cursor-pointer pr-8"
                  >
                    <option value="입문 과정">입문 과정</option>
                    <option value="심화 연구">심화 연구</option>
                    <option value="응용 워크숍">응용 워크숍</option>
                    <option value="운세 상담">운세 상담</option>
                    <option value="학술 활동">학술 활동</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-foreground-700 text-xs tracking-wider uppercase mb-2">하고 싶은 말 (500자 이내)</label>
                  <textarea
                    name="message"
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 bg-background-50 border border-background-200 rounded-md focus:border-primary-700 outline-none text-sm text-foreground-950 placeholder:text-foreground-400 resize-none"
                    placeholder="학회에 전하고 싶은 말씀이 있으시면 자유롭게 적어주세요."
                  />
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agree"
                  required
                  id="agree"
                  className="mt-1 w-4 h-4 accent-primary-700 cursor-pointer"
                />
                <label htmlFor="agree" className="text-foreground-700 text-xs leading-relaxed cursor-pointer">
                  개인정보 수집·이용에 동의합니다. 수집된 정보는 회원 안내 목적에 한해 사용됩니다.
                </label>
              </div>

              {status !== "idle" && message && (
                <div
                  className={`mt-6 px-4 py-3 rounded-md text-sm ${
                    status === "success"
                      ? "bg-accent-100 text-accent-900 border border-accent-300"
                      : status === "error"
                      ? "bg-secondary-100 text-secondary-900 border border-secondary-300"
                      : "bg-background-50 text-foreground-700 border border-background-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary-800 hover:bg-primary-900 disabled:opacity-60 text-background-50 text-sm font-medium tracking-wide whitespace-nowrap cursor-pointer transition-colors duration-300"
                >
                  {status === "loading" ? "전송 중..." : "회원가입"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}