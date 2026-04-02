import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import FullPageScroll from "@/components/FullPageScroll";
import SpaceBackground from "@/components/SpaceBackground";

export default function Home() {
  const sections = [
    <Hero key="hero" />,
    <About key="about" />,
    <Skills key="skills" />,
    <Projects key="projects" />,
    <Experience key="experience" />,
    <Contact key="contact" />,
  ];

  return (
    <main className="bg-transparent min-h-screen relative">
      <SpaceBackground />
      <FullPageScroll sections={sections} />
    </main>
  );
}
