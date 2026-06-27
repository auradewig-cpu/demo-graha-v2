interface ChapterNavProps {
  activeChapter: string;
}

const CHAPTERS = [
  { id: "ch-01", label: "01 VISI" },
  { id: "ch-02", label: "02 PERENCANAAN" },
  { id: "ch-03", label: "03 KONSTRUKSI" },
  { id: "ch-04", label: "04 PENYERAHAN" },
];

export function ChapterNav({ activeChapter }: ChapterNavProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="hidden lg:block"
      style={{
        position: "sticky",
        top: "88px",
        zIndex: 30,
        padding: "0 80px",
        maxWidth: "1440px",
        margin: "0 auto 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "32px",
          borderBottom: "1px solid rgba(77,70,58,0.3)",
          paddingBottom: "16px",
        }}
      >
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            onClick={() => scrollTo(ch.id)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color:
                activeChapter === ch.id ? "var(--gs-gold)" : "var(--gs-on-surface-variant)",
              background: "none",
              border: "none",
              borderBottom:
                activeChapter === ch.id
                  ? "2px solid var(--gs-gold)"
                  : "2px solid transparent",
              paddingBottom: "16px",
              marginBottom: "-17px",
              cursor: "pointer",
              transition: "color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--gs-gold)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                activeChapter === ch.id ? "var(--gs-gold)" : "var(--gs-on-surface-variant)")
            }
          >
            {ch.label}
          </button>
        ))}
      </div>
    </div>
  );
}
