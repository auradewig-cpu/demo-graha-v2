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
  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [progress, setProgress] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h, { passive: true });
    return () => window.removeEventListener("resize", h);
  }, []);

  const { canvasRef } = useFrameSequence({
    onReady: () => setReady(true),
    onProgress: (pct) => setLoadPct(pct),
  });

  // hero-progress custom event from RAF loop
  useEffect(() => {
    const handler = (e) => setProgress(e.detail);
    window.addEventListener("hero-progress", handler, { passive: true });
    return () => window.removeEventListener("hero-progress", handler);
  }, []);

  // Fix 1: lock body scroll until first 30 frames are decoded
  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [ready]);

  // Fix 2: track container visibility to hide/show fixed canvas
  useEffect(() => {
    const container = document.getElementById("hero-scrub-container");
    if (!container) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Fix 1: Loading screen — blocks scroll until frames decoded */}
      {!ready && (
        <div style={{
          position: "fixed", inset: 0, background: "#07080A",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          zIndex: 9999,
        }}>
          <p style={{
            color: "#C8A96E", fontSize: 12,
            letterSpacing: "0.2em", marginBottom: 20,
            fontFamily: "sans-serif", textTransform: "uppercase",
          }}>
            MEMUAT PENGALAMAN
          </p>
          <div style={{ width: 200, height: 1, background: "#1a1a1a" }}>
            <div style={{
              height: "100%", background: "#C8A96E",
              width: loadPct + "%", transition: "width 0.1s linear",
            }} />
          </div>
          <p style={{ color: "#444", fontSize: 11, marginTop: 12, fontFamily: "sans-serif" }}>
            {loadPct}%
          </p>
        </div>
      )}

      {/* Fix 2: Canvas is position:fixed — no layout thrash on scroll */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: heroVisible ? 0 : -1,
          opacity: heroVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />

      {/* Scroll driver: 600vh tall (400vh mobile), drives the RAF scrubbing */}
      <div
        id="hero-scrub-container"
        style={{ height: isMobile ? "400vh" : "600vh", position: "relative", zIndex: 2 }}
      >
        {/* Dark overlay — sticky, above canvas */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            background: isMobile
              ? "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)"
              : "linear-gradient(to right, rgba(0,0,0,0.25) 30%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 3,
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
                justifyContent: isMobile ? "center" : "flex-start",
                padding: isMobile ? "0 5vw 10vh" : "0 6vw 12vh",
                opacity,
                transform: `translateY(${translateY}px)`,
                transition: "opacity 0.4s ease, transform 0.4s ease",
                pointerEvents: opacity > 0.5 ? "auto" : "none",
                zIndex: 4,
              }}
            >
              <div style={{ maxWidth: isMobile ? "100%" : 560 }}>
                <p style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C8A96E",
                  marginBottom: 16,
                  fontFamily: "sans-serif",
                  textAlign: isMobile ? "center" : "left",
                }}>
                  {ch.eyebrow}
                </p>
                <h2 style={{
                  fontSize: isMobile ? "clamp(28px, 8vw, 36px)" : "clamp(36px, 5vw, 64px)",
                  fontFamily: "Georgia, serif",
                  color: "#F5F0E8",
                  lineHeight: 1.1,
                  fontWeight: 700,
                  marginBottom: 20,
                  whiteSpace: "pre-line",
                  textAlign: isMobile ? "center" : "left",
                }}>
                  {ch.headline}
                </h2>
                {(!isMobile || i === 0 || i === 4) && (
                  <p style={{
                    fontSize: 16,
                    color: "#8C8078",
                    lineHeight: 1.7,
                    marginBottom: ch.cta ? 28 : 0,
                    maxWidth: 400,
                    textAlign: isMobile ? "center" : "left",
                  }}>
                    {ch.sub}
                  </p>
                )}
                {ch.cta && (
                  <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
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
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#C8A96E";
                        e.currentTarget.style.color = "#000";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#C8A96E";
                      }}
                    >
                      {ch.cta.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Chapter indicator — top right (desktop only) */}
        {!isMobile && (
          <div style={{
            position: "sticky",
            top: "24px",
            height: 0,
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "24px",
            zIndex: 5,
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
        )}
      </div>

      {/* Scroll progress bar — horizontal bottom on mobile, vertical left on desktop */}
      {isMobile ? (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: 2,
          background: "rgba(200,169,110,0.15)",
          zIndex: 50,
          pointerEvents: "none",
          opacity: heroVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}>
          <div style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: "#C8A96E",
            transition: "width 0.05s linear",
          }} />
        </div>
      ) : (
        <div style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 2,
          height: "100vh",
          background: "rgba(200,169,110,0.15)",
          zIndex: 50,
          pointerEvents: "none",
          opacity: heroVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}>
          <div style={{
            width: "100%",
            height: `${progress * 100}%`,
            background: "#C8A96E",
            transition: "height 0.05s linear",
          }} />
        </div>
      )}
    </>
  );
}
