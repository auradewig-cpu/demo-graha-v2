import { useRef, useEffect } from "react";
import { Play } from "lucide-react";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBURmxfwvbyxzkOhKK5QS62WXs0yQn2djkfVlPjeWnPXMdPIqueNaIy836089dKRCEsNrWeoN2PrBV43DOdOvRHwZ-xtvp63RNLwBsPe-zOzcuXOvM3Rc07BwmigUWWSVTHyxll74O7bKMGSU6t62dzgIZY0giCqaIokn-M6LwGMEIWtmOB48PoZHnHiWyqGLtMCwVRKBTHAYcelpfl-8nrzS3Rm_7awxNXNqMuQtD6XmXDomh_bJQr";

interface HeroSectionProps {
  onCta: () => void;
}

export function HeroSection({ onCta }: HeroSectionProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (imgRef.current && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            imgRef.current.style.transform = `translateY(${center * 0.2}px) scale(1.15)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="gs-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "128px",
        paddingBottom: "80px",
        paddingLeft: "clamp(24px, 6vw, 80px)",
        paddingRight: "clamp(24px, 6vw, 80px)",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "32px",
          width: "100%",
        }}
        className="grid-cols-1 lg:grid-cols-12"
      >
        {/* Content */}
        <div
          style={{ gridColumn: "1 / 7", display: "flex", flexDirection: "column", justifyContent: "center" }}
          className="col-span-12 lg:col-span-6"
        >
          <span
            className="gs-fade"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              marginBottom: "24px",
              display: "block",
            }}
          >
            Arsitektur &amp; Konstruksi
          </span>

          <h1
            className="gs-fade d1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 600,
              color: "var(--gs-on-surface)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            Dari Pondasi
            <br />
            Hingga Sempurna
          </h1>

          <p
            className="gs-fade d2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--gs-on-surface-variant)",
              marginBottom: "48px",
              maxWidth: "480px",
            }}
          >
            Mewujudkan visi arsitektural dengan presisi tanpa kompromi. Kami adalah mitra
            konstruksi premium untuk ruang yang abadi.
          </p>

          <div className="gs-fade d3" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={onCta}
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
                padding: "16px 36px",
                cursor: "pointer",
                transition: "opacity 0.3s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = "0.88";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }}
            >
              Mulai Konsultasi
            </button>
            <button
              onClick={() => {
                document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                background: "transparent",
                border: "1px solid rgba(200,169,110,0.4)",
                padding: "16px 36px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--gs-gold)";
                el.style.background = "rgba(200,169,110,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(200,169,110,0.4)";
                el.style.background = "transparent";
              }}
            >
              Lihat Portfolio
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div
          className="gs-fade d4 col-span-12 lg:col-span-6"
          style={{ gridColumn: "7 / 13" }}
          ref={containerRef}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "3/4",
              border: "1px solid rgba(200,169,110,0.2)",
              boxShadow: "0 0 40px rgba(200,169,110,0.08)",
              position: "relative",
              overflow: "hidden",
              background: "var(--gs-surface-low)",
              cursor: "pointer",
            }}
            className="group"
            onClick={onCta}
          >
            <div
              ref={imgRef}
              style={{
                position: "absolute",
                inset: "-48px -48px -128px -48px",
                backgroundImage: `url(${HERO_IMAGE})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.75,
                transform: "scale(1.15)",
                transition: "opacity 0.5s ease",
              }}
            />
            {/* Overlay gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(13,13,13,0.6) 0%, transparent 60%)",
              }}
            />
            {/* Play button */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "opacity 0.3s",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  border: "1px solid rgba(200,169,110,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(13,13,13,0.4)",
                  backdropFilter: "blur(4px)",
                  transition: "all 0.3s",
                }}
                className="group-hover:scale-110 group-hover:border-[var(--gs-gold)]"
              >
                <Play size={24} color="var(--gs-gold)" fill="var(--gs-gold)" />
              </div>
            </div>
            {/* Bottom label */}
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                zIndex: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(200,169,110,0.7)",
                }}
              >
                Architectural Noir Est. Indonesia
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
