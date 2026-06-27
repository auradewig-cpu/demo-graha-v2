import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Villa Noir Bali",
    category: "Residential",
    year: "2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBURmxfwvbyxzkOhKK5QS62WXs0yQn2djkfVlPjeWnPXMdPIqueNaIy836089dKRCEsNrWeoN2PrBV43DOdOvRHwZ-xtvp63RNLwBsPe-zOzcuXOvM3Rc07BwmigUWWSVTHyxll74O7bKMGSU6t62dzgIZY0giCqaIokn-M6LwGMEIWtmOB48PoZHnHiWyqGLtMCwVRKBTHAYcelpfl-8nrzS3Rm_7awxNXNqMuQtD6XmXDomh_bJQr",
    size: "large",
  },
  {
    id: 2,
    title: "Maison Geometrique",
    category: "Commercial",
    year: "2023",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClynP11KE0JwKIBstzO1qzmS8lsLOUc9DPj8vMMZXx5xgnUH4KzStJqm4jkldGkoMNNgV39tYgJifeo0VOwVtPxRMAer0Ztlu-TwpdUikuakl1VD3BNrS3OFuX0K7XmdHOoglSq7Wm7Go0RDasQ3A_2-wKK0PiYDf-IDzV1CWyjof8rb9jWzcWgjFOwlm68tA60IO2orajwMkvYOt6LhSwWa7uBcZx4-CzRHKxFrfqTebQavUaCwTR",
    size: "small",
  },
  {
    id: 3,
    title: "Obsidian Tower Jakarta",
    category: "High-rise",
    year: "2023",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeVnR5mqZpkRYPtZzBHNeJNTOeohc927yaVUzgHCgPadB5Xmu6JWa4AsSlXShWcpfN3uYnygHq4WkAB8o8jqQJvsFa32tOoDKouYh2XqrsYxF0HR3mq7yy3Fr5tygumvFBMFJZS3Ntb8VS5XBzOF24Ss3QHqrGigtxD1x48Vq6K2qEaMzi1qIEuj4YtbBEQsdrZycWhnolVa_hnyDTWjS7V-uL_mTvFgdgE_7EAkCFToEIaqyTt0id",
    size: "small",
  },
  {
    id: 4,
    title: "Rumah Terasering",
    category: "Residential",
    year: "2022",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBURmxfwvbyxzkOhKK5QS62WXs0yQn2djkfVlPjeWnPXMdPIqueNaIy836089dKRCEsNrWeoN2PrBV43DOdOvRHwZ-xtvp63RNLwBsPe-zOzcuXOvM3Rc07BwmigUWWSVTHyxll74O7bKMGSU6t62dzgIZY0giCqaIokn-M6LwGMEIWtmOB48PoZHnHiWyqGLtMCwVRKBTHAYcelpfl-8nrzS3Rm_7awxNXNqMuQtD6XmXDomh_bJQr",
    size: "medium",
  },
  {
    id: 5,
    title: "Studio Kota",
    category: "Interior",
    year: "2022",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClynP11KE0JwKIBstzO1qzmS8lsLOUc9DPj8vMMZXx5xgnUH4KzStJqm4jkldGkoMNNgV39tYgJifeo0VOwVtPxRMAer0Ztlu-TwpdUikuakl1VD3BNrS3OFuX0K7XmdHOoglSq7Wm7Go0RDasQ3A_2-wKK0PiYDf-IDzV1CWyjof8rb9jWzcWgjFOwlm68tA60IO2orajwMkvYOt6LhSwWa7uBcZx4-CzRHKxFrfqTebQavUaCwTR",
    size: "medium",
  },
];

const FILTERS = ["All", "Residential", "Commercial", "High-rise", "Interior"];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="gs-section"
      style={{
        padding: "120px clamp(24px, 6vw, 80px)",
        maxWidth: "1440px",
        margin: "0 auto",
        borderTop: "1px solid rgba(77,70,58,0.12)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "48px",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
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
            Selected Works
          </span>
          <h2
            className="gs-fade d1"
            data-reveal="headline"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 500,
              color: "var(--gs-on-surface)",
            }}
          >
            Portfolio
          </h2>
        </div>

        {/* Filters */}
        <div className="gs-fade d2" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: activeFilter === f ? "#0D0D0D" : "var(--gs-on-surface-variant)",
                background: activeFilter === f ? "var(--gs-gold)" : "transparent",
                border: `1px solid ${activeFilter === f ? "var(--gs-gold)" : "rgba(200,169,110,0.25)"}`,
                padding: "8px 16px",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== f) {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--gs-gold)";
                  (e.currentTarget as HTMLElement).style.color = "var(--gs-gold)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== f) {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(200,169,110,0.25)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--gs-on-surface-variant)";
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        data-reveal="fade-up"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project, i) => (
          <div
            key={project.id}
            data-stagger
            className="gs-fade"
            style={{
              transitionDelay: `${i * 100}ms`,
              position: "relative",
              aspectRatio: project.size === "large" ? "4/5" : project.size === "medium" ? "4/3" : "1/1",
              overflow: "hidden",
              border: "1px solid rgba(200,169,110,0.15)",
              cursor: "pointer",
              gridColumn: project.size === "large" ? "span 1" : "span 1",
            }}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: hovered === project.id ? "scale(1.08)" : "scale(1.0)",
                transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s",
                opacity: 0.55,
              }}
            />
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  hovered === project.id
                    ? "linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.1) 60%)"
                    : "linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 60%)",
                transition: "background 0.4s ease",
              }}
            />
            {/* Info */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--gs-gold)",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {project.category} · {project.year}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "var(--gs-on-surface)",
                    }}
                  >
                    {project.title}
                  </h3>
                </div>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(200,169,110,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: hovered === project.id ? 1 : 0,
                    transform: hovered === project.id ? "scale(1)" : "scale(0.8)",
                    transition: "all 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  <ArrowUpRight size={14} color="var(--gs-gold)" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        className="gs-fade d3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "32px",
          marginTop: "80px",
          paddingTop: "48px",
          borderTop: "1px solid rgba(77,70,58,0.2)",
        }}
      >
        {[
          { num: "87+", label: "Proyek Selesai" },
          { num: "12", label: "Tahun Pengalaman" },
          { num: "34", label: "Penghargaan" },
          { num: "100%", label: "Kepuasan Klien" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 3vw, 48px)",
                fontWeight: 600,
                color: "var(--gs-gold)",
                marginBottom: "8px",
              }}
            >
              {stat.num}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gs-on-surface-variant)",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
