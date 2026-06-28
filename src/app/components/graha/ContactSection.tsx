import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

interface ContactSectionProps {
  onOpen: () => void;
}

export function ContactSection({ onOpen }: ContactSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="contact"
      className="gs-section"
      style={{
        padding: isMobile ? "80px 5vw" : "120px clamp(24px, 6vw, 80px)",
        background: "rgba(7,8,10,0.4)",
        borderTop: "1px solid rgba(77,70,58,0.2)",
        borderBottom: "1px solid rgba(77,70,58,0.2)",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="gs-fade"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "1px solid rgba(200,169,110,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontFamily: "'Material Symbols Outlined'",
              fontSize: "28px",
              color: "var(--gs-gold)",
            }}
          >
            architecture
          </span>
        </div>

        <h2
          className="gs-fade d1"
          data-reveal="headline"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(28px, 4vw, 56px)",
            fontWeight: 500,
            color: "var(--gs-on-surface)",
            marginBottom: "24px",
            lineHeight: 1.2,
          }}
        >
          Wujudkan Ruang Anda
        </h2>

        <p
          className="gs-fade d2"
          data-reveal="fade-up"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "18px",
            lineHeight: 1.6,
            color: "var(--gs-on-surface-variant)",
            marginBottom: "48px",
            maxWidth: "560px",
          }}
        >
          Konsultasikan visi arsitektural Anda dengan tim ahli kami. Kami siap menerjemahkan
          ide menjadi struktur monumental.
        </p>

        <div
          className="gs-fade d3"
          data-reveal="fade-up"
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <button
            onClick={onOpen}
            className="gs-pulse"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#0D0D0D",
              background: "var(--gs-gold)",
              border: "none",
              padding: "18px 44px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "opacity 0.3s, transform 0.2s",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? 320 : "none",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "0.88";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }}
          >
            <MessageSquare size={15} />
            Hubungi Kami via WhatsApp
          </button>

          <a
            href="mailto:studio@grahaarchitect.id"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              background: "transparent",
              border: "1px solid rgba(200,169,110,0.4)",
              padding: "18px 36px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? 320 : "none",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(200,169,110,0.08)";
              el.style.borderColor = "var(--gs-gold)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(200,169,110,0.4)";
            }}
          >
            Email Studio
          </a>
        </div>

        {/* Contact details */}
        <div
          className="gs-fade d4"
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "64px",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingTop: "48px",
            borderTop: "1px solid rgba(77,70,58,0.2)",
            width: "100%",
          }}
        >
          {[
            { label: "Telepon", value: "+62 812 3456 7890" },
            { label: "Email", value: "studio@grahaarchitect.id" },
            { label: "Studio", value: "Jakarta Selatan, Indonesia" },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gs-gold)",
                  marginBottom: "6px",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "var(--gs-on-surface-variant)",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
