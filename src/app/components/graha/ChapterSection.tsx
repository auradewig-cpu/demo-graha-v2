import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface ChapterSectionProps {
  id: string;
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
}

export function ChapterSection({
  id,
  number,
  title,
  description,
  imageUrl,
  imageAlt,
  reverse = false,
}: ChapterSectionProps) {
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
            imgRef.current.style.transform = `translateY(${center * 0.18}px) scale(1.12)`;
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
      id={id}
      className="gs-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px clamp(24px, 6vw, 80px)",
        maxWidth: "1440px",
        margin: "0 auto",
        borderTop: "1px solid rgba(77,70,58,0.12)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "32px",
          width: "100%",
          direction: reverse ? "rtl" : "ltr",
        }}
      >
        {/* Text col */}
        <div
          style={{
            gridColumn: "1 / 6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            direction: "ltr",
          }}
          className="col-span-12 lg:col-span-5"
        >
          <span
            className="gs-fade"
            data-reveal="fade-up"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 600,
              color: "var(--gs-gold)",
              opacity: 0.4,
              marginBottom: "16px",
              display: "block",
              lineHeight: 1,
            }}
          >
            {number}
          </span>
          <h2
            className="gs-fade d1"
            data-reveal="headline"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 500,
              color: "var(--gs-on-surface)",
              marginBottom: "24px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h2>
          <div
            className="gs-fade d2"
            data-reveal="line-draw"
            style={{
              width: "48px",
              height: "1px",
              background: "var(--gs-gold)",
              marginBottom: "24px",
            }}
          />
          <p
            className="gs-fade d3"
            data-reveal="fade-up"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--gs-on-surface-variant)",
              maxWidth: "420px",
            }}
          >
            {description}
          </p>
          <button
            className="gs-fade d4"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "40px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.gap = "16px";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.gap = "8px";
            }}
          >
            Konsultasikan Proyek <ArrowRight size={14} />
          </button>
        </div>

        {/* Image col */}
        <div
          style={{
            gridColumn: "6 / 13",
            direction: "ltr",
          }}
          className="col-span-12 lg:col-span-7 mt-12 lg:mt-0"
        >
          <div
            ref={containerRef}
            data-reveal={reverse ? "slide-right" : "slide-left"}
            style={{
              width: "100%",
              aspectRatio: "16/10",
              border: "1px solid rgba(200,169,110,0.2)",
              background: "transparent",
              position: "relative",
              overflow: "hidden",
              transition: "box-shadow 0.5s ease",
              cursor: "pointer",
            }}
            className="group gs-fade d4"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 60px rgba(200,169,110,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div
              ref={imgRef}
              style={{
                position: "absolute",
                inset: "-48px -48px -96px -48px",
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.92,
                transform: "scale(1.12)",
                transition: "opacity 0.5s ease",
              }}
              className="group-hover:opacity-100"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(13,13,13,0.1) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                zIndex: 10,
                opacity: 0,
                transform: "translateY(8px)",
                transition: "opacity 0.3s, transform 0.3s",
              }}
              className="group-hover:opacity-100 group-hover:translate-y-0"
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gs-gold)",
                }}
              >
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
