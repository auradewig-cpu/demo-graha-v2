import { useState, useEffect } from "react";
import { useFrameSequence } from "../../../hooks/useFrameSequence";

const CHAPTERS = [
  {
    range: [-0.02, 0.18],
    eyebrow: "ARSITEKTUR & KONSTRUKSI · YOGYAKARTA",
    headline: "Dari Pondasi\nHingga Sempurna.",
    sub: "Mewujudkan visi arsitektural dengan presisi tanpa kompromi.",
    cta: { label: "Lihat Karya Kami ↓", href: "#portfolio" },
  },
  {
    range: [0.20, 0.38],
    eyebrow: "TAHAP 01 · PERENCANAAN",
    headline: "Dari Lahan\nKosong, Kami Mulai.",
    sub: "Setiap proyek dimulai dari visi. Kami wujudkan dari titik nol.",
  },
  {
    range: [0.40, 0.58],
    eyebrow: "TAHAP 02 · STRUKTUR",
    headline: "Fondasi yang\nTak Tergoyahkan.",
    sub: "Presisi perhitungan struktural untuk bangunan yang berdiri teguh.",
  },
  {
    range: [0.60, 0.78],
    eyebrow: "TAHAP 03 · FINISHING",
    headline: "Detail yang\nBerbicara Sendiri.",
    sub: "Setiap sudut, setiap material dipilih dengan cermat.",
  },
  {
    range: [0.82, 1.00],
    eyebrow: "GRAHA STUDIO · SIAP MEMBANGUN IMPIANMU",
    headline: "Mulai Perjalanan\nBersama Kami.",
    sub: "Konsultasi gratis, tanpa komitmen.",
    cta: { label: "WhatsApp Sekarang →", href: "https://wa.me/6289502284633" },
  },
];

function getOpacity(progress, range) {
  const [start, end] = range;
  const fadeIn = 0.03;
  const fadeOut = 0.03;
  if (progress < start) return 0;
  if (progress < start + fadeIn) return (progress - start) / fadeIn;
  if (progress > end - fadeOut) return Math.max(0, (end - progress) / fadeOut);
  if (progress > end) return 0;
  return 1;
}

export function HeroScrub() {
  const { canvasRef } = useFrameSequence();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = (e) => setProgress(e.detail);
    window.addEventListener("hero-progress", handler, { passive: true });
    return () => window.removeEventListener("hero-progress", handler);
  }, []);

  return (
    <div
      id="hero-scrub-container"
      style={{ height: "600vh", position: "relative" }}
    >
      {/* Canvas background — sticky fullscreen */}
      <canvas
        ref={canvasRef}
        style={{
          position: "sticky",
          top: 0,
          display: "block",
          width: "100vw",
          height: "100vh",
          willChange: "transform",
        }}
      />

      {/* Dark overlay gradient bawah untuk readability text */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          marginTop: "-100vh",
          background: "linear-gradient(to right, rgba(0,0,0,0.65) 40%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Chapter text overlays */}
      {CHAPTERS.map((ch, i) => {
        const opacity = getOpacity(progress, ch.range);
        const translateY = opacity < 0.1 ? 20 : 0;
        return (
          <div
            key={i}
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              marginTop: "-100vh",
              display: "flex",
              alignItems: "flex-end",
              padding: "0 6vw 12vh",
              opacity,
              transform: `translateY(${translateY}px)`,
              transition: "opacity 0.4s ease, transform 0.4s ease",
              pointerEvents: opacity > 0.5 ? "auto" : "none",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <p style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C8A96E",
                marginBottom: 16,
                fontFamily: "sans-serif",
              }}>
                {ch.eyebrow}
              </p>
              <h2 style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontFamily: "Georgia, serif",
                color: "#F5F0E8",
                lineHeight: 1.1,
                fontWeight: 700,
                marginBottom: 20,
                whiteSpace: "pre-line",
              }}>
                {ch.headline}
              </h2>
              <p style={{
                fontSize: 16,
                color: "#8C8078",
                lineHeight: 1.7,
                marginBottom: ch.cta ? 28 : 0,
                maxWidth: 400,
              }}>
                {ch.sub}
              </p>
              {ch.cta && (
                <a
                  href={ch.cta.href}
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    border: "1px solid #C8A96E",
                    color: "#C8A96E",
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    fontFamily: "sans-serif",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = "#C8A96E";
                    e.target.style.color = "#000";
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#C8A96E";
                  }}
                >
                  {ch.cta.label}
                </a>
              )}
            </div>
          </div>
        );
      })}

      {/* Scroll progress bar — sisi kiri */}
      <div style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 2,
        height: "100vh",
        background: "rgba(200,169,110,0.15)",
        zIndex: 50,
        pointerEvents: "none",
      }}>
        <div style={{
          width: "100%",
          height: `${progress * 100}%`,
          background: "#C8A96E",
          transition: "height 0.05s linear",
        }} />
      </div>

      {/* Chapter indicator kanan atas */}
      <div style={{
        position: "sticky",
        top: "24px",
        height: 0,
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: "24px",
        zIndex: 40,
      }}>
        {CHAPTERS.map((ch, i) => {
          const op = getOpacity(progress, ch.range);
          return op > 0.5 ? (
            <span key={i} style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#C8A96E",
              fontFamily: "sans-serif",
            }}>
              0{i + 1} / 05
            </span>
          ) : null;
        })}
      </div>
    </div>
  );
}
