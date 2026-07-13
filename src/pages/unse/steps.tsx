import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loadSelectedPresets,
  saveSelectedPresets,
  unsePresetCategories,
} from "./presetData";

export type UnseBirthData = {
  gender: "남" | "여";
  calendar: "solar" | "lunar";
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const STORAGE_KEY = "unse-birth";

function pad2(n: number) {
  return (n < 10 ? "0" : "") + n;
}

function nowParts() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
}

export function saveBirthData(data: UnseBirthData) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadBirthData(): UnseBirthData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UnseBirthData) : null;
  } catch {
    return null;
  }
}

export function clearBirthData() {
  sessionStorage.removeItem(STORAGE_KEY);
}

function formatDateLine(
  label: "양력" | "음력",
  y: number,
  m: number,
  d: number,
  h: number,
  min: number,
  leap?: boolean
) {
  return `${label} ${y}년 ${pad2(m)}월 ${pad2(d)}일 ${pad2(h)}시 ${pad2(min)}분${leap ? " (윤)" : ""}`;
}

/** 1페이지 — phone_choice 랜딩 (완성본 화면 기준) */
export function UnseLanding() {
  return (
    <div className="unse-shell">
      <div className="unse-landing">
        <p className="unse-intro">
          {`성지사주전문프로그램
"20년이상 사주전문가팀으로 구성된 사주분석"
믿고 운세를 보셔도 됩니다.

사주해석의 최고봉인 기문둔갑
-천·인·지- 입체적 원리로 분석한
핵심운세 60가지 엄선하였습니다.`}
        </p>

        <div className="unse-offer">
          <p className="unse-price">항목마다 1000원부터 시작되는</p>
          <h1 className="unse-headline">
            {`운세의 기운
지금 확인해 보세요.`}
          </h1>
        </div>

        <div className="unse-action">
          <Link to="/unse/birth" className="unse-btn unse-btn-landing">
            나의 운세 확인하기
          </Link>
          <p className="unse-sub">무료맛보기~패키지까지 다양</p>
        </div>

        <div className="unse-policy">
          <p className="unse-policy-title">환불규정</p>
          <p>
            결제완료 즉시 목적하는 내용이 화면에 표기되기에, 목적하는 바가
            이루어졌다고 판단되므로 환불은 불가능합니다.
          </p>
          <p>
            개인이 입력한 생년월일은 1회 휘발성이고, 저장자체가 안되게 되어
            있으니 안심하셔도 됩니다.
          </p>
        </div>

        <div className="unse-footer-brand">
          <div className="unse-mark">
            <img
              src="/images/logo_sungji_circle.png"
              width={56}
              height={56}
              alt="성지사주학회"
            />
          </div>
          <p className="unse-provided">성지사주학회제공</p>
        </div>

        <Link to="/" className="unse-home-link">
          ← 홈페이지로
        </Link>
      </div>
    </div>
  );
}

/** 2페이지 — phone_choice birth.html */
export function UnseBirth() {
  const navigate = useNavigate();
  const initial = nowParts();
  const years = useMemo(() => {
    const y = new Date().getFullYear();
    return Array.from({ length: y - 1920 + 1 }, (_, i) => y - i);
  }, []);

  const [gender, setGender] = useState<"남" | "여">("남");
  const [calendar, setCalendar] = useState<"solar" | "lunar">("solar");
  const [year, setYear] = useState(initial.year);
  const [month, setMonth] = useState(initial.month);
  const [day, setDay] = useState(initial.day);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);

  const daysInMonth = useMemo(() => {
    if (calendar === "lunar") return 30;
    return new Date(year, month, 0).getDate();
  }, [year, month, calendar]);

  const safeDay = Math.min(day, daysInMonth);

  // 양·음력 변환·만세력 엔진은 서버 전용. 프론트에는 입력값만 표시.
  const dateLines = useMemo(() => {
    const primary = formatDateLine(
      calendar === "solar" ? "양력" : "음력",
      year,
      month,
      safeDay,
      hour,
      minute
    );
    return {
      solar: calendar === "solar" ? primary : "양력 확정은 결제 후 서버에서 처리합니다.",
      lunar: calendar === "lunar" ? primary : "음력 확정은 결제 후 서버에서 처리합니다.",
    };
  }, [calendar, year, month, safeDay, hour, minute]);

  const handleReset = () => {
    clearBirthData();
    const n = nowParts();
    setGender("남");
    setCalendar("solar");
    setYear(n.year);
    setMonth(n.month);
    setDay(n.day);
    setHour(n.hour);
    setMinute(n.minute);
  };

  const handleConfirm = () => {
    const data: UnseBirthData = {
      gender,
      calendar,
      year,
      month,
      day: safeDay,
      hour,
      minute,
    };
    saveBirthData(data);
    navigate("/unse/preset");
  };

  return (
    <div className="unse-shell">
      <div className="unse-birth">
        <h2 className="birth-title">고객님의 생년월일을 정확히 입력해 주세요</h2>
        <p className="birth-hint">아래 박스를 터치해서 입력하세요</p>

        <div className="birth-radios birth-radios-gender">
          <label className={gender === "남" ? "is-on" : ""}>
            <input
              type="radio"
              name="gender"
              checked={gender === "남"}
              onChange={() => setGender("남")}
            />
            <span className="birth-radio-dot" aria-hidden="true" />
            남
          </label>
          <label className={gender === "여" ? "is-on" : ""}>
            <input
              type="radio"
              name="gender"
              checked={gender === "여"}
              onChange={() => setGender("여")}
            />
            <span className="birth-radio-dot" aria-hidden="true" />
            여
          </label>
        </div>

        <div className="birth-radios birth-radios-cal">
          <label className={calendar === "solar" ? "is-on" : ""}>
            <input
              type="radio"
              name="calendar"
              checked={calendar === "solar"}
              onChange={() => setCalendar("solar")}
            />
            <span className="birth-radio-dot" aria-hidden="true" />
            양력
          </label>
          <label className={calendar === "lunar" ? "is-on" : ""}>
            <input
              type="radio"
              name="calendar"
              checked={calendar === "lunar"}
              onChange={() => setCalendar("lunar")}
            />
            <span className="birth-radio-dot" aria-hidden="true" />
            음력
          </label>
        </div>

        <div className="birth-row">
          <label className="birth-cell birth-cell-year">
            <select
              className="birth-select"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              aria-label="년"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <span className="birth-unit">년</span>
          </label>
          <label className="birth-cell">
            <select
              className="birth-select"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              aria-label="월"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {pad2(m)}
                </option>
              ))}
            </select>
            <span className="birth-unit">월</span>
          </label>
          <label className="birth-cell">
            <select
              className="birth-select"
              value={safeDay}
              onChange={(e) => setDay(Number(e.target.value))}
              aria-label="일"
            >
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {pad2(d)}
                </option>
              ))}
            </select>
            <span className="birth-unit">일</span>
          </label>
          <label className="birth-cell">
            <select
              className="birth-select"
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              aria-label="시"
            >
              {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                <option key={h} value={h}>
                  {pad2(h)}
                </option>
              ))}
            </select>
            <span className="birth-unit">시</span>
          </label>
          <label className="birth-cell">
            <select
              className="birth-select"
              value={minute}
              onChange={(e) => setMinute(Number(e.target.value))}
              aria-label="분"
            >
              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                <option key={m} value={m}>
                  {pad2(m)}
                </option>
              ))}
            </select>
            <span className="birth-unit">분</span>
          </label>
        </div>

        <div className="birth-cal-block">
          <p className="birth-cal-display">{dateLines.solar}</p>
          <p className="birth-cal-display lunar">{dateLines.lunar}</p>
        </div>

        <button type="button" className="unse-btn unse-btn-landing" onClick={handleConfirm}>
          입력 확인 후 입장하기
        </button>

        <p className="birth-privacy">
          * 입력된 생년월일은 저장 안되니 안심하십시요. 걱정되시면 아래 신규입력
          버튼을 누르세요. 흔적이 전혀남지 않고 사라집니다. 감사합니다.
        </p>
        <button type="button" className="unse-btn-reset" onClick={handleReset}>
          신규입력
        </button>

        <Link to="/unse" className="unse-home-link">
          ← 이전
        </Link>
      </div>
    </div>
  );
}

/** 3페이지 — phone_choice 설문 전체 선택 */
export function UnsePreset() {
  const navigate = useNavigate();
  const birth = loadBirthData();
  const [selected, setSelected] = useState<string[]>(() => loadSelectedPresets());

  const allItems = useMemo(
    () => unsePresetCategories.flatMap((c) => c.items),
    []
  );

  const total = useMemo(() => {
    return selected.reduce((sum, id) => {
      const item = allItems.find((i) => i.id === id);
      return sum + (item?.price ?? 0);
    }, 0);
  }, [selected, allItems]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handlePay = () => {
    if (selected.length === 0) return;
    saveSelectedPresets(selected);
    // 4페이지·결과 엔진(phone_choice)은 아직 배포하지 않음
    navigate("/unse/coming-soon");
  };

  if (!birth) {
    return (
      <div className="unse-shell unse-shell-survey">
        <div className="unse-placeholder">
          <p>생년월일 입력이 필요합니다.</p>
          <Link to="/unse/birth" className="unse-btn">
            생년월일 입력하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="unse-shell unse-shell-survey">
      <div className="unse-survey">
        {unsePresetCategories.map((cat) => (
          <section key={cat.id} className="survey-category">
            <div className="survey-cat-head">
              <span className="survey-cat-emoji" aria-hidden="true">
                {cat.icon}
              </span>
              <h2 className="survey-cat-title">
                {cat.name}
                {cat.categoryNote ? (
                  <span className="survey-cat-note">{cat.categoryNote}</span>
                ) : null}
              </h2>
            </div>
            <p className="survey-cat-sub">
              {cat.subtitle}
              {cat.categoryNote ? ` · ${cat.categoryNote}` : ""}
            </p>

            <ul className="survey-list">
              {cat.items.map((item) => {
                const on = selected.includes(item.id);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`survey-item${on ? " is-selected" : ""}`}
                      onClick={() => toggle(item.id)}
                    >
                      <span className={`survey-radio${on ? " is-on" : ""}`} aria-hidden="true">
                        {on ? "●" : ""}
                      </span>
                      <span className="survey-item-title">{item.title}</span>
                      <span className={`survey-price${item.price === 0 ? " is-free" : ""}`}>
                        {item.price === 0 ? "무료" : `${item.price.toLocaleString()}원`}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <Link to="/unse/birth" className="unse-home-link survey-back">
          ← 이전
        </Link>
      </div>

      <div className="survey-footer">
        <div className="survey-total">선택 합계: {total.toLocaleString()}원</div>
        <p className="survey-notice">
          생년월일시분을 입력한 뒤 항목을 선택하고 결제하면 결과를 확인할 수 있습니다.
        </p>
        <button
          type="button"
          className="unse-btn unse-btn-landing"
          disabled={selected.length === 0}
          onClick={handlePay}
        >
          확인 후 결제하기
        </button>
      </div>
    </div>
  );
}

/** 4페이지 — 결과 엔진 연결 전 임시 안내 (엔진/완성본 미포함) */
export function UnseComingSoon() {
  return (
    <div className="unse-shell">
      <div className="unse-placeholder">
        <p className="unse-step-label">안내</p>
        <h2>결제·결과 서비스 준비 중</h2>
        <p className="unse-placeholder-desc">
          항목 선택까지는 이용하실 수 있습니다. 결제 및 운세 결과 안내는 곧
          제공될 예정입니다.
        </p>
        <Link to="/unse/preset" className="unse-btn">
          항목 선택으로
        </Link>
        <Link to="/" className="unse-home-link">
          ← 홈페이지로
        </Link>
      </div>
    </div>
  );
}
