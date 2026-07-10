import { useState } from "react";
import { navItems } from "@/mocks/home";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hrefToSection = (href: string) => {
    const id = href.replace("#", "");
    if (id === "youtube") return "fortune";
    return id;
  };

  const handleNavigate = (href: string) => {
    onNavigate(hrefToSection(href));
    setMobileOpen(false);
  };

  return (
    <header className="bg-background-50 border-b border-background-200/70">
      <nav className="px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            onClick={(e) => { e.preventDefault(); onNavigate("hero"); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="https://public.readdy.ai/ai/img_res/8969decb-4f99-4f86-ba1d-b9357b232ce8.png"
              alt="사주성지학회"
              className="h-11 w-11 object-contain flex-shrink-0"
            />
            <div className="flex flex-col items-center leading-tight">
              <span className="font-heading text-base md:text-lg font-semibold text-primary-950">사주성지학회</span>
              <span className="text-[10px] tracking-[0.25em] text-primary-700">四柱成志學會</span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => {
              const sectionId = hrefToSection(item.href);
              const isActive = activeSection === sectionId;
              return (
                <li key={item.href}>
                  <a
                    onClick={(e) => { e.preventDefault(); handleNavigate(item.href); }}
                    className={`text-sm tracking-wide cursor-pointer transition-colors duration-300 whitespace-nowrap ${
                      isActive
                        ? "text-accent-600 font-medium"
                        : "hover:text-accent-600 text-primary-800"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              onClick={(e) => { e.preventDefault(); onNavigate("signup"); }}
              className="px-5 py-2.5 rounded-full bg-primary-700 text-background-50 text-sm font-medium tracking-wide whitespace-nowrap cursor-pointer hover:bg-primary-800 transition-colors duration-300 flex items-center gap-2"
            >
              회원 가입
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md cursor-pointer text-primary-900"
            aria-label="menu"
          >
            <i className={mobileOpen ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"}></i>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-background-200/60 bg-background-50/98 backdrop-blur">
            <ul className="flex flex-col gap-1 pt-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    onClick={() => handleNavigate(item.href)}
                    className="block px-2 py-3 text-primary-800 text-sm cursor-pointer hover:bg-background-100 rounded"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  onClick={() => { onNavigate("signup"); setMobileOpen(false); }}
                  className="block text-center px-5 py-3 rounded-full bg-primary-700 text-background-50 text-sm cursor-pointer"
                >
                  회원 가입 →
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}