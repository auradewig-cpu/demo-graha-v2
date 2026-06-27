import { ArrowRight } from "lucide-react";

const POSTS = [
  {
    id: 1,
    date: "Juni 2024",
    category: "Insight",
    title: "Arsitektur Noir: Estetika Kegelapan dalam Desain Modern",
    excerpt:
      "Eksplorasi mendalam tentang penggunaan kontras cahaya-gelap sebagai bahasa visual dalam arsitektur kontemporer Indonesia.",
  },
  {
    id: 2,
    date: "Mei 2024",
    category: "Material",
    title: "Beton Ekspos & Baja Hitam: Duet Material Premium",
    excerpt:
      "Panduan komprehensif memilih dan mengombinasikan beton arsitektur dengan elemen baja untuk hasil estetika maksimal.",
  },
  {
    id: 3,
    date: "April 2024",
    category: "Project",
    title: "Villa Noir Bali: Dari Sketsa ke Kenyataan",
    excerpt:
      "Perjalanan 18 bulan membangun hunian mewah di tepi tebing Bali — tantangan, solusi, dan pelajaran berharga.",
  },
];

export function JournalSection() {
  return (
    <section
      id="journal"
      className="gs-section"
      style={{
        padding: "120px clamp(24px, 6vw, 80px)",
        maxWidth: "1440px",
        margin: "0 auto",
        borderTop: "1px solid rgba(77,70,58,0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "48px",
          flexWrap: "wrap",
          gap: "16px",
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
            Catatan Studio
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
            Journal
          </h2>
        </div>
        <button
          className="gs-fade d2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--gs-gold)",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "gap 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = "16px")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = "8px")}
        >
          Semua Artikel <ArrowRight size={14} />
        </button>
      </div>

      <div
        data-reveal="fade-up"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}
        className="grid-cols-1 lg:grid-cols-3"
      >
        {POSTS.map((post, i) => (
          <article
            key={post.id}
            data-stagger
            className="gs-fade group"
            style={{
              transitionDelay: `${i * 100}ms`,
              padding: "32px",
              background: "var(--gs-surface-low)",
              cursor: "pointer",
              transition: "background 0.3s",
              borderLeft: i === 0 ? "none" : "1px solid rgba(77,70,58,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--gs-surface-container)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--gs-surface-low)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gs-gold)",
                  border: "1px solid rgba(200,169,110,0.3)",
                  padding: "4px 10px",
                }}
              >
                {post.category}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  color: "var(--gs-outline)",
                }}
              >
                {post.date}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px",
                fontWeight: 500,
                color: "var(--gs-on-surface)",
                lineHeight: 1.35,
                marginBottom: "16px",
                transition: "color 0.3s",
              }}
              className="group-hover:text-[var(--gs-gold)]"
            >
              {post.title}
            </h3>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--gs-on-surface-variant)",
                marginBottom: "24px",
              }}
            >
              {post.excerpt}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                transition: "gap 0.2s",
              }}
              className="group-hover:gap-4"
            >
              Baca Selengkapnya <ArrowRight size={12} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
