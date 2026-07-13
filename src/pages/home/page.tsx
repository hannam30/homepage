import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";
import FortuneAndYoutube from "./components/FortuneAndYoutube";
import Blog from "./components/Blog";
import Signup from "./components/Signup";
import Footer from "./components/Footer";

const sections = [
  { id: "hero", label: "홈", Component: Hero },
  { id: "about", label: "학회 소개", Component: About },
  { id: "programs", label: "프로그램", Component: Programs },
  { id: "fortune", label: "운세 상담", Component: FortuneAndYoutube },
  { id: "blog", label: "학술 블로그", Component: Blog },
  { id: "signup", label: "회원 가입", Component: Signup },
] as const;

type SectionId = (typeof sections)[number]["id"];

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const navigate = (section: string) => {
    setActiveSection(section as SectionId);
  };

  return (
    <main className="h-screen flex flex-col overflow-hidden bg-background-50 text-foreground-900 font-body">
      <div className="shrink-0 z-50">
        <Navbar activeSection={activeSection} onNavigate={navigate} />
      </div>

      <div className="flex-1 relative overflow-hidden">
        {sections.map(({ id, Component }) => {
          const isActive = activeSection === id;
          return (
            <div
              key={id}
              className={`absolute inset-0 overflow-y-auto transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 translate-y-0 z-10"
                  : "opacity-0 translate-y-8 z-0 pointer-events-none"
              }`}
            >
              <div className="min-h-full flex flex-col">
                <Component onNavigate={navigate} />
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </main>
  );
}