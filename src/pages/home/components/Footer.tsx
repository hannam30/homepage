interface FooterProps {
  onNavigate?: (section: string) => void;
}

const businessInfo = [
  { label: "상호명", value: "좋은하루" },
  { label: "대표자명", value: "최성수" },
  { label: "사업자번호", value: "778-73-00223" },
  { label: "통신판매신고", value: "지금 진행중" },
  { label: "주소", value: "서울시 은평구 연서로 20길 5" },
  { label: "유선번호", value: "02-356-5583", href: "tel:023565583" },
] as const;

export default function Footer(_props: FooterProps) {
  return (
    <footer className="shrink-0 border-t border-primary-200/60 bg-background-100/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-3.5 md:py-4">
        <dl className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] md:text-xs leading-relaxed text-primary-700/80">
          {businessInfo.map((item) => (
            <div key={item.label} className="inline-flex items-baseline gap-1.5">
              <dt className="text-primary-500 font-medium whitespace-nowrap">{item.label}</dt>
              <dd className="m-0 text-primary-800/90">
                {"href" in item && item.href ? (
                  <a href={item.href} className="hover:text-accent-700 transition-colors">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-1.5 text-center text-[10px] md:text-[11px] text-primary-500/70 tracking-wide">
          © 2026 사주성지학회 · 좋은하루
        </p>
      </div>
    </footer>
  );
}
