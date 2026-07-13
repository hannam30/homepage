import { blogs, BLOG_URL } from "@/mocks/home";

const sideImages = [
  "https://readdy.ai/api/search-image?query=Oriental%20calligraphy%20brush%20strokes%20painted%20on%20cream%20parchment%20paper%20with%20chinese%20zodiac%20symbols%2C%20warm%20amber%20studio%20lighting%2C%20editorial%20still%20life%20photography%2C%20muted%20earthy%20brown%20tones%2C%20refined%20academic%20composition%2C%20minimal%20zen%20aesthetic&width=600&height=600&seq=saju-blog-side-1-2026&orientation=squarish",
  "https://readdy.ai/api/search-image?query=Antique%20wooden%20abacus%20and%20chinese%20brush%20pen%20arranged%20on%20cream%20linen%20cloth%2C%20warm%20window%20light%2C%20editorial%20still%20life%20photography%2C%20muted%20earthy%20brown%20palette%2C%20refined%20academic%20mood%2C%20minimal%20zen%20composition&width=600&height=600&seq=saju-blog-side-2-2026&orientation=squarish",
  "https://readdy.ai/api/search-image?query=Open%20old%20chinese%20classic%20book%20with%20handwritten%20bazi%20chart%20pillars%20in%20black%20ink%20on%20cream%20parchment%20page%2C%20warm%20amber%20studio%20light%2C%20editorial%20still%20life%20photography%2C%20muted%20brown%20tones%2C%20refined%20academic%20atmosphere&width=600&height=600&seq=saju-blog-side-3-2026&orientation=squarish",
];

export default function Blog() {
  return (
    <section id="blog" className="relative bg-background-100 py-10 md:py-14 lg:py-16 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 text-accent-900 text-xs tracking-wider mb-6">
              <i className="ri-book-line"></i>
              Academic Journal
            </div>
            <h2 className="font-heading text-foreground-950 text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-light max-w-3xl">
              학회 연구진의<br />
              <span className="italic font-medium">블로그</span>
            </h2>
          </div>
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-foreground-800 text-sm cursor-pointer hover:text-primary-700 transition-colors whitespace-nowrap group"
          >
            네이버 블로그 전체 보기
            <span className="w-9 h-9 flex items-center justify-center rounded-full border border-background-300 group-hover:border-primary-700 group-hover:bg-primary-700 group-hover:text-background-50 transition-all">
              <i className="ri-arrow-right-up-line"></i>
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-7 group bg-background-50 rounded-lg overflow-hidden cursor-pointer block"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Old%20chinese%20classics%20books%20stacked%20on%20wooden%20desk%20with%20open%20page%20showing%20handwritten%20bazi%20pillars%20and%20brush%20ink%20notes%2C%20cream%20parchment%20pages%2C%20warm%20window%20light%2C%20editorial%20still%20life%20photography%2C%20moody%20earthy%20tones%2C%20refined%20academic%20atmosphere%2C%20muted%20brown%20palette&width=1400&height=875&seq=saju-blog-feat-2026&orientation=landscape"
                alt={blogs[0].title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4 text-xs text-secondary-700 tracking-[0.25em] uppercase mb-5">
                <span>{blogs[0].category}</span>
                <span className="w-1 h-1 rounded-full bg-background-300"></span>
                <span>{blogs[0].date}</span>
                <span className="w-1 h-1 rounded-full bg-background-300"></span>
                <span>{blogs[0].readTime} 읽기</span>
              </div>
              <h3 className="font-heading text-foreground-950 text-2xl md:text-3xl lg:text-4xl font-light leading-snug group-hover:text-primary-700 transition-colors">
                {blogs[0].title}
              </h3>
              <p className="mt-5 text-foreground-700 text-base leading-[1.85] font-light">
                {blogs[0].excerpt}
              </p>
              <div className="mt-8 pt-6 border-t border-background-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-700 text-background-50 font-heading">
                    {blogs[0].author[0]}
                  </div>
                  <div>
                    <div className="text-foreground-950 text-sm font-medium">{blogs[0].author}</div>
                    <div className="text-foreground-500 text-xs">학회 연구위원</div>
                  </div>
                </div>
                <span className="text-sm text-foreground-800 group-hover:text-primary-700 flex items-center gap-2 transition-colors">
                  블로그에서 보기 <i className="ri-arrow-right-up-line"></i>
                </span>
              </div>
            </div>
          </a>

          <div className="lg:col-span-5 flex flex-col gap-6">
            {blogs.slice(1).map((b, idx) => (
              <a
                key={b.title}
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-5 bg-background-50 rounded-lg p-5 cursor-pointer hover:bg-accent-50 transition-colors duration-500"
              >
                <div className="w-32 h-32 md:w-36 md:h-36 shrink-0 rounded-md overflow-hidden bg-background-200">
                  <img
                    src={sideImages[idx % sideImages.length]}
                    alt={b.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] text-secondary-700 tracking-[0.25em] uppercase mb-2">
                    <span>{b.category}</span>
                    <span className="w-1 h-1 rounded-full bg-background-300"></span>
                    <span>{b.readTime}</span>
                  </div>
                  <h3 className="font-heading text-foreground-950 text-base md:text-lg font-medium leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {b.title}
                  </h3>
                  <p className="hidden md:block mt-2 text-foreground-600 text-xs leading-relaxed font-light line-clamp-2">
                    {b.excerpt}
                  </p>
                  <div className="mt-3 text-foreground-500 text-xs">
                    by {b.author} · {b.date}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
