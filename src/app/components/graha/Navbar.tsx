import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Atelier", href: "#atelier" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
          background: scrolled ? "rgba(28,27,27,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "16px 24px" : "24px 80px",
        }}
        className="px-6 lg:px-20 py-6"
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 3vw, 40px)",
            fontWeight: 600,
            color: "var(--gs-gold)",
            letterSpacing: "-0.02em",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          GRAHA STUDIO
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:
                  activeSection === link.href.slice(1)
                    ? "var(--gs-gold)"
                    : "var(--gs-on-surface-variant)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.3s",
                padding: "4px 0",
                borderBottom:
                  activeSection === link.href.slice(1)
                    ? "1px solid var(--gs-gold)"
                    : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--gs-gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  activeSection === link.href.slice(1)
                    ? "var(--gs-gold)"
                    : "var(--gs-on-surface-variant)";
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Inquire button */}
        <button
          onClick={() => handleNav("#contact")}
          className="hidden md:inline-flex"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gs-gold)",
            background: "transparent",
            border: "1px solid var(--gs-gold)",
            padding: "10px 24px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(200,169,110,0.1)";
            el.style.boxShadow = "0 0 20px rgba(200,169,110,0.15)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.boxShadow = "none";
          }}
        >
          Inquire
        </button>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--gs-gold)",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 49,
          background: "rgba(13,13,13,0.97)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-20px)",
          pointerEvents: mobileOpen ? "all" : "none",
        }}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "32px",
              fontWeight: 500,
              color: "var(--gs-on-surface)",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gs-gold)")}
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--gs-on-surface)")
            }
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => handleNav("#contact")}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#0D0D0D",
            background: "var(--gs-gold)",
            border: "none",
            padding: "14px 40px",
            cursor: "pointer",
            marginTop: "16px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Inquire
        </button>
      </div>
    </>
  );
}
