import { useState, useEffect } from "react";

const PILLARS = [
  {
    id: "01",
    title: "Presisi",
    desc: "Setiap garis, sudut, dan dimensi dihitung dengan akurasi matematis. Tidak ada kompromi dalam detail.",
  },
  {
    id: "02",
    title: "Ketahanan",
    desc: "Material premium dipilih bukan hanya untuk keindahan, tetapi untuk bertahan lintas generasi.",
  },
  {
    id: "03",
    title: "Estetika",
    desc: "Keindahan yang fungsional. Setiap elemen memiliki tujuan yang melampaui penampilan semata.",
  },
  {
    id: "04",
    title: "Keberlanjutan",
    desc: "Desain yang menghormati lingkungan tanpa mengorbankan kemewahan dan kenyamanan.",
  },
];

export function PhilosophySection() {
  const [active, setActive] = useState("01");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="philosophy"
      className="gs-section"
      style={{
        padding: isMobile ? "60px 5vw" : "120px clamp(24px, 6vw, 80px)",
        maxWidth: "1440px",
        margin: "0 auto",
        borderTop: "1px solid rgba(77,70,58,0.12)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "5fr 7fr",
          gap: isMobile ? "40px" : "80px",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <span
            className="gs-fade"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gs-gold)",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Filosofi Kami
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
            }}
          >
            Dibangun di Atas
            <br />
            <em>Empat Pilar</em>
          </h2>
          <p
            className="gs-fade d2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--gs-on-surface-variant)",
              maxWidth: "400px",
            }}
          >
            Filosofi kami merupakan fondasi dari setiap keputusan desain dan konstruksi. Empat
            nilai inti ini memandu perjalanan kami dari konsep hingga penyerahan.
          </p>
        </div>

        {/* Right - Pillars accordion */}
        <div className="gs-fade d3" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {PILLARS.map((p) => (
            <div
              key={p.id}
              onClick={() => setActive(p.id)}
              style={{
                borderTop: "1px solid rgba(77,70,58,0.3)",
                padding: "24px 0",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      color: active === p.id ? "var(--gs-gold)" : "var(--gs-outline)",
                      transition: "color 0.3s",
                    }}
                  >
                    {p.id}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "22px",
                      fontWeight: 500,
                      color:
                        active === p.id ? "var(--gs-on-surface)" : "var(--gs-on-surface-variant)",
                      transition: "color 0.3s",
                    }}
                  >
                    {p.title}
                  </h3>
                </div>
                <span
                  style={{
                    color: "var(--gs-gold)",
                    fontSize: "20px",
                    transition: "transform 0.3s",
                    transform: active === p.id ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                    fontWeight: 300,
                  }}
                >
                  +
                </span>
              </div>
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: active === p.id ? "120px" : "0px",
                  transition: "max-height 0.4s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "var(--gs-on-surface-variant)",
                    paddingTop: "12px",
                    paddingLeft: "35px",
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(77,70,58,0.3)" }} />
        </div>
      </div>
    </section>
  );
}
