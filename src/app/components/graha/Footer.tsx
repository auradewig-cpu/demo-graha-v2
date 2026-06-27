import { Instagram, Linkedin, ArrowUp } from "lucide-react";

const LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
];

export function Footer() {
  return (
    <footer
      className="gs-section"
      style={{
        background: "var(--gs-bg)",
        borderTop: "1px solid rgba(77,70,58,0.2)",
        padding: "48px clamp(24px, 6vw, 80px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(20px, 2.5vw, 32px)",
            fontWeight: 600,
            color: "var(--gs-gold)",
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "-0.02em",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          GRAHA STUDIO
        </button>

        {/* Links */}
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gs-outline)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--gs-gold)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--gs-outline)")
              }
            >
              {l.label}
            </a>
          ))}
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gs-outline)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--gs-gold)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--gs-outline)")
              }
            >
              <Icon size={13} />
              {label}
            </a>
          ))}
        </div>

        {/* Scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            width: "40px",
            height: "40px",
            border: "1px solid rgba(200,169,110,0.25)",
            background: "transparent",
            color: "var(--gs-gold)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--gs-gold)";
            (e.currentTarget as HTMLElement).style.color = "#0D0D0D";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--gs-gold)";
          }}
          title="Kembali ke atas"
        >
          <ArrowUp size={16} />
        </button>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(77,70,58,0.15)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "var(--gs-outline)",
          }}
        >
          © 2024 GRAHA STUDIO. ALL RIGHTS RESERVED.
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "rgba(153,143,129,0.5)",
          }}
        >
          ARCHITECTURAL NOIR EST. INDONESIA
        </span>
      </div>
    </footer>
  );
}
