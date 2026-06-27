import { useState, useEffect } from "react";
import { Navbar } from "./components/graha/Navbar";
import { ScrollProgress } from "./components/graha/ScrollProgress";
import { HeroScrub } from "./components/graha/HeroScrub";
import { ChapterNav } from "./components/graha/ChapterNav";
import { ChapterSection } from "./components/graha/ChapterSection";
import { PortfolioSection } from "./components/graha/PortfolioSection";
import { PhilosophySection } from "./components/graha/PhilosophySection";
import { AtelierSection } from "./components/graha/AtelierSection";
import { JournalSection } from "./components/graha/JournalSection";
import { ContactSection } from "./components/graha/ContactSection";
import { ContactModal } from "./components/graha/ContactModal";
import { Footer } from "./components/graha/Footer";
import { useScrollAnimations } from "./components/graha/useScrollAnimations";
import { useScrollReveal } from "../hooks/useScrollReveal";

const CHAPTERS = [
  {
    id: "ch-01",
    number: "01",
    title: "Visi & Konsep",
    description:
      "Setiap mahakarya dimulai dari dialog yang mendalam. Kami menerjemahkan aspirasi Anda menjadi konsep spasial yang berkarakter, menggabungkan estetika desain kontemporer dengan fungsionalitas absolut.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClynP11KE0JwKIBstzO1qzmS8lsLOUc9DPj8vMMZXx5xgnUH4KzStJqm4jkldGkoMNNgV39tYgJifeo0VOwVtPxRMAer0Ztlu-TwpdUikuakl1VD3BNrS3OFuX0K7XmdHOoglSq7Wm7Go0RDasQ3A_2-wKK0PiYDf-IDzV1CWyjof8rb9jWzcWgjFOwlm68tA60IO2orajwMkvYOt6LhSwWa7uBcZx4-CzRHKxFrfqTebQavUaCwTR",
    imageAlt: "Architectural sketch on drafting table with blueprints",
  },
  {
    id: "ch-02",
    number: "02",
    title: "Perencanaan Teknis",
    description:
      "Keunggulan berada pada detail. Fase perencanaan teknis kami memastikan setiap inci material dan struktur dihitung dengan presisi matematis, menjamin durabilitas dan eksekusi tanpa cela.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeVnR5mqZpkRYPtZzBHNeJNTOeohc927yaVUzgHCgPadB5Xmu6JWa4AsSlXShWcpfN3uYnygHq4WkAB8o8jqQJvsFa32tOoDKouYh2XqrsYxF0HR3mq7yy3Fr5tygumvFBMFJZS3Ntb8VS5XBzOF24Ss3QHqrGigtxD1x48Vq6K2qEaMzi1qIEuj4YtbBEQsdrZycWhnolVa_hnyDTWjS7V-uL_mTvFgdgE_7EAkCFToEIaqyTt0id",
    imageAlt: "Premium building materials: slate, concrete, brass",
    reverse: true,
  },
  {
    id: "ch-03",
    number: "03",
    title: "Konstruksi",
    description:
      "Eksekusi tanpa kompromi. Tim master builder kami membangun dengan standar presisi tertinggi, mengawasi setiap tahap konstruksi untuk memastikan kualitas yang melampaui ekspektasi Anda.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBURmxfwvbyxzkOhKK5QS62WXs0yQn2djkfVlPjeWnPXMdPIqueNaIy836089dKRCEsNrWeoN2PrBV43DOdOvRHwZ-xtvp63RNLwBsPe-zOzcuXOvM3Rc07BwmigUWWSVTHyxll74O7bKMGSU6t62dzgIZY0giCqaIokn-M6LwGMEIWtmOB48PoZHnHiWyqGLtMCwVRKBTHAYcelpfl-8nrzS3Rm_7awxNXNqMuQtD6XmXDomh_bJQr",
    imageAlt: "Modern villa construction under dramatic lighting",
  },
  {
    id: "ch-04",
    number: "04",
    title: "Penyerahan",
    description:
      "Momen yang paling berharga. Kami menyerahkan ruang impian Anda dengan penyelesaian sempurna — setiap sentuhan akhir dikerjakan dengan dedikasi untuk memastikan kepuasan mutlak.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClynP11KE0JwKIBstzO1qzmS8lsLOUc9DPj8vMMZXx5xgnUH4KzStJqm4jkldGkoMNNgV39tYgJifeo0VOwVtPxRMAer0Ztlu-TwpdUikuakl1VD3BNrS3OFuX0K7XmdHOoglSq7Wm7Go0RDasQ3A_2-wKK0PiYDf-IDzV1CWyjof8rb9jWzcWgjFOwlm68tA60IO2orajwMkvYOt6LhSwWa7uBcZx4-CzRHKxFrfqTebQavUaCwTR",
    imageAlt: "Finished luxury interior handover",
    reverse: true,
  },
];

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [activeChapter, setActiveChapter] = useState("");

  useScrollAnimations();
  useScrollReveal();

  // Track active section for navbar highlight
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            if (id.startsWith("ch-")) setActiveChapter(id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <div
      className="graha-root"
      style={{ minHeight: "100vh", background: "transparent", color: "var(--gs-on-surface)" }}
    >
      <Navbar activeSection={activeSection} />
      <ScrollProgress />

      <main>
        <HeroScrub />

        <ChapterNav activeChapter={activeChapter} />

        {CHAPTERS.map((ch) => (
          <ChapterSection
            key={ch.id}
            id={ch.id}
            number={ch.number}
            title={ch.title}
            description={ch.description}
            imageUrl={ch.imageUrl}
            imageAlt={ch.imageAlt}
            reverse={ch.reverse}
          />
        ))}

        <PortfolioSection />
        <PhilosophySection />
        <AtelierSection />
        <JournalSection />
        <ContactSection onOpen={() => setModalOpen(true)} />
      </main>

      <Footer />

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
