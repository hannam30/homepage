export type UnsePresetItem = {
  id: string;
  title: string;
  price: number;
};

export type UnsePresetCategory = {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  categoryNote?: string;
  items: UnsePresetItem[];
};

/** phone_choice haedan_data.js — 설문 전체 (무료·패키지·전문해석) */
export const unsePresetCategories: UnsePresetCategory[] = [
  {
    id: "free_trial",
    name: "무료 맛보기",
    subtitle: "지금 바로, 무료로 시작",
    icon: "🎁",
    items: [
      {
        id: "noble_person",
        title: "나에게 행운을 가져다 주는 귀인은 어떤 사람인가요?",
        price: 0,
      },
      {
        id: "current_direction",
        title: "지금 이 시기에 좋은 방향",
        price: 0,
      },
    ],
  },
  {
    id: "age_packages",
    name: "연령별 맞춤 패키지",
    subtitle: "내 나이에 꼭 필요한 운세 모음",
    icon: "📚",
    items: [
      {
        id: "pkg_teens",
        title: "10대 패키지 — 학업, 적성, 문과·이과, 친구관계, 진로 탐색",
        price: 5500,
      },
      {
        id: "pkg_20s",
        title: "20대 패키지 — 직업적성, 진로결정, 연애운",
        price: 4500,
      },
      {
        id: "pkg_30s",
        title: "30대 패키지 — 재물, 이직·승진, 사업, 연애, 결혼",
        price: 5500,
      },
      {
        id: "pkg_40s",
        title: "40대 패키지 — 진로변경, 이직·사업, 재정 재정비, 건강",
        price: 5500,
      },
      {
        id: "pkg_50s",
        title: "50대 패키지 — 재산관리, 퇴직, 건강, 자녀, 부부관계",
        price: 5500,
      },
      {
        id: "pkg_60s",
        title: "60대 패키지 — 건강, 재물, 여행, 새로운도전",
        price: 5500,
      },
    ],
  },
  {
    id: "life",
    name: "인생라이프",
    subtitle: "나의 운명과 흐름",
    icon: "🌱",
    items: [
      { id: "lifetime", title: "평생운 분석하기", price: 3000 },
      {
        id: "personality",
        title: "나는 어떤 사람? 내 성향 완벽 분석하기",
        price: 1500,
      },
      {
        id: "great_fortune",
        title: "대운의 흐름: 지금 나는 인생의 어느 구간에 있나요?",
        price: 1500,
      },
      {
        id: "golden_age",
        title: "인생에서 가장 황금기는 언제일까요?",
        price: 1000,
      },
      {
        id: "life_graph",
        title: "인생에서 좋지 않은 시기는 언제일까요?",
        price: 1000,
      },
      {
        id: "year_fortune",
        title: "올해 나의 운, 한 해 흐름은 어떤가요?",
        price: 1500,
      },
      {
        id: "lottery",
        title: "이번 달 나의 운, 행운의 기운이 있을까요?",
        price: 1500,
      },
      {
        id: "next_year_fortune",
        title: "신년운세: 다가오는 한 해의 흐름은?",
        price: 3000,
      },
    ],
  },
  {
    id: "job",
    name: "직업",
    subtitle: "나에게 맞는 일·진로",
    icon: "💼",
    items: [
      { id: "career_aptitude", title: "나에게 맞는 직업성향은?", price: 2000 },
      {
        id: "career_match",
        title: "나에게 딱맞는 직업을 추천한다면",
        price: 2000,
      },
    ],
  },
  {
    id: "career",
    name: "직장과 사업",
    subtitle: "성공의 타이밍",
    icon: "🏢",
    items: [
      {
        id: "business",
        title: "사업·창업하고 싶은데, 잘 될까요?",
        price: 2000,
      },
      { id: "exam_verdict", title: "사안별 합격 불합격 판정", price: 2000 },
      {
        id: "job_change",
        title: "(이직·승진·스카웃), 움직여도 좋을까요?",
        price: 2000,
      },
      {
        id: "overseas",
        title: "해외 진출이나 먼 거리 이동, 나에게 맞을까요?",
        price: 1500,
      },
      {
        id: "workplace_relation",
        title: "직장 인간관계운: 상사·동료와의 궁합은 어떤가요?",
        price: 1500,
      },
      {
        id: "retirement",
        title: "퇴직·은퇴 타이밍: 지금 나가야 할까요, 더 버텨야 할까요?",
        price: 2000,
      },
    ],
  },
  {
    id: "wealth",
    name: "재물과 투자",
    subtitle: "부자 되는 길",
    icon: "💰",
    items: [
      {
        id: "wealth_bowl",
        title: "재복(財福): 타고난 재물 그릇은?",
        price: 1500,
      },
      {
        id: "investment",
        title: "투자운: 투자하고 싶은데요. 적성은 맞을까요?",
        price: 1500,
      },
      {
        id: "realty",
        title: "부동산 팔릴까요? 언제쯤 매도 될까요?",
        price: 2000,
      },
      {
        id: "funding",
        title: "돈을 빌려야 하는데, 자금조달이 가능할까요?",
        price: 2000,
      },
      { id: "partnership", title: "동업: 동업해도 괜찮은가요?", price: 1500 },
    ],
  },
  {
    id: "love",
    name: "사랑과 인연",
    subtitle: "인연의 실타래",
    icon: "💕",
    items: [
      { id: "couple_fortune", title: "우리 부부 금술은 어때요?", price: 1500 },
      {
        id: "compatibility",
        title: "명품 궁합 진단: 거부할 수 없는 인연인가요?",
        price: 2000,
      },
      {
        id: "marriage",
        title: "결혼운은 언제쯤 올까요? 결혼에 가장 좋은 시기는?",
        price: 1500,
      },
      {
        id: "lover",
        title: "애인은 언제쯤 생길까요? 나의 인연은?",
        price: 1500,
      },
      {
        id: "heart_reading",
        title: "상대의 마음 읽기: 그 사람은 나를 어떻게 생각할까요?",
        price: 1500,
      },
      {
        id: "reunion",
        title: "재회운: 헤어진 인연, 다시 만날 수 있을까요?",
        price: 1500,
      },
      {
        id: "remarriage",
        title: "재혼운은 언제쯤 올까요? 재혼에 좋은 시기는?",
        price: 1500,
      },
      {
        id: "breakup_timing",
        title: "이별 시기 점검: 지금 인연을 정리해야 할 때인가요?",
        price: 1500,
      },
      {
        id: "divorce_lifetime_timing",
        title: "이혼운 시기: 알 수 있을까요?",
        price: 1500,
      },
      {
        id: "divorce_timing",
        title: "이혼·별거 시기: 지금 관계를 정리해야 할 때인가요?",
        price: 2000,
      },
      {
        id: "spouse_affair",
        title: "배우자 이성운·외도 가능성 점검",
        price: 2000,
      },
    ],
  },
  {
    id: "child",
    name: "자녀와 학업",
    subtitle: "우리 아이의 길",
    icon: "🧒",
    categoryNote: "부모 사주에서 자녀 기운을 봅니다",
    items: [
      {
        id: "child_personality",
        title: "우리 아이 성격과 성향은 어때요?",
        price: 2500,
      },
      {
        id: "child_talent",
        title: "우리 아이 재능은 무엇인가요?",
        price: 2500,
      },
      {
        id: "child_major",
        title: "우리 아이 문과·이과 어디가 맞나요?",
        price: 2500,
      },
      { id: "child_grade", title: "우리 아이 성적은 어때요?", price: 2500 },
      {
        id: "child_career",
        title: "우리 아이의 진로와 직업 적성",
        price: 2500,
      },
      {
        id: "parent_child_match",
        title: "부모와 자녀의 궁합: 우리 아이와 나는 잘 맞나요?",
        price: 2000,
      },
      {
        id: "child_marriage",
        title: "자녀의 결혼·인연 시기",
        price: 2000,
      },
    ],
  },
  {
    id: "family",
    name: "가족과 가정",
    subtitle: "가정의 화목",
    icon: "🏠",
    items: [
      {
        id: "parent_sibling",
        title: "부모·형제와의 관계운",
        price: 1500,
      },
      { id: "in_laws", title: "시댁·처가와의 인연", price: 1500 },
      {
        id: "family_fortune",
        title: "집안의 가풍·가운(家運)",
        price: 1000,
      },
    ],
  },
  {
    id: "relation",
    name: "인간관계와 귀인",
    subtitle: "사람이 운을 만든다",
    icon: "🤝",
    items: [
      { id: "friend_relation", title: "친구·동료 관계운", price: 1000 },
      {
        id: "difficult_person",
        title: "나를 힘들게 하는 사람과의 관계 풀이",
        price: 1500,
      },
      {
        id: "noble_person_relation",
        title: "나에게 행운을 가져다 주는 귀인은 어떤 사람인가요?",
        price: 1000,
      },
    ],
  },
  {
    id: "crisis",
    name: "건강과 위기관리",
    subtitle: "안전한 삶",
    icon: "🛡️",
    items: [
      {
        id: "health",
        title: "나의 체질적 건강 상태는 어때요?",
        price: 1000,
      },
      {
        id: "samjae",
        title: "올해 조심해야 할 시기(액운·삼재)",
        price: 1500,
      },
      { id: "accident_risk", title: "사고·구설수 위험 점검", price: 2000 },
      {
        id: "lawsuit",
        title: "소송 중인데 나에게 유리할까요?",
        price: 3000,
      },
    ],
  },
  {
    id: "fortune_boost",
    name: "외모·개명과 행운의 색·물건",
    subtitle: "운을 끌어당기는 법",
    icon: "✨",
    items: [
      {
        id: "rename_surgery",
        title: "외모를 바꾸거나 이름을 개명하면 내 운이 바뀔까요?",
        price: 2500,
      },
      {
        id: "lucky_items",
        title: "행운을 부르는 색·숫자·물건",
        price: 1500,
      },
    ],
  },
  {
    id: "lucky_direction_folder",
    name: "행운의 방향",
    subtitle: "평생과 현재, 나에게 맞는 방위",
    icon: "🧭",
    items: [
      {
        id: "lifetime_direction",
        title: "나에게 항상 좋은 기운을 주는 행운의 방향",
        price: 1000,
      },
    ],
  },
  {
    id: "taekil",
    name: "택일",
    subtitle: "중요한 날, 길(吉)한 날 고르기",
    icon: "📅",
    items: [
      {
        id: "lucky_direction",
        title: "이사·개업·혼인에 가장 좋은 길(吉)일 선택",
        price: 1500,
      },
    ],
  },
];

export const PRESET_STORAGE_KEY = "unse-preset-ids";

export function saveSelectedPresets(ids: string[]) {
  sessionStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(ids));
}

export function loadSelectedPresets(): string[] {
  try {
    const raw = sessionStorage.getItem(PRESET_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}
