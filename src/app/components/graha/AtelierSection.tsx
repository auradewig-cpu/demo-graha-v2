const TEAM = [
  {
    id: 1,
    name: "Ahmad Rafi Graha",
    role: "Principal Architect",
    bio: "15 tahun pengalaman dalam arsitektur kontemporer. Alumni Harvard GSD.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBURmxfwvbyxzkOhKK5QS62WXs0yQn2djkfVlPjeWnPXMdPIqueNaIy836089dKRCEsNrWeoN2PrBV43DOdOvRHwZ-xtvp63RNLwBsPe-zOzcuXOvM3Rc07BwmigUWWSVTHyxll74O7bKMGSU6t62dzgIZY0giCqaIokn-M6LwGMEIWtmOB48PoZHnHiWyqGLtMCwVRKBTHAYcelpfl-8nrzS3Rm_7awxNXNqMuQtD6XmXDomh_bJQr",
  },
  {
    id: 2,
    name: "Sari Dewi Kusuma",
    role: "Interior Design Director",
    bio: "Spesialis interior premium dengan sentuhan seni Jawa kontemporer.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClynP11KE0JwKIBstzO1qzmS8lsLOUc9DPj8vMMZXx5xgnUH4KzStJqm4jkldGkoMNNgV39tYgJifeo0VOwVtPxRMAer0Ztlu-TwpdUikuakl1VD3BNrS3OFuX0K7XmdHOoglSq7Wm7Go0RDasQ3A_2-wKK0PiYDf-IDzV1CWyjof8rb9jWzcWgjFOwlm68tA60IO2orajwMkvYOt6LhSwWa7uBcZx4-CzRHKxFrfqTebQavUaCwTR",
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Head of Construction",
    bio: "Engineer berpengalaman dengan rekam jejak 200+ proyek tanpa cacat.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeVnR5mqZpkRYPtZzBHNeJNTOeohc927yaVUzgHCgPadB5Xmu6JWa4AsSlXShWcpfN3uYnygHq4WkAB8o8jqQJvsFa32tOoDKouYh2XqrsYxF0HR3mq7yy3Fr5tygumvFBMFJZS3Ntb8VS5XBzOF24Ss3QHqrGigtxD1x48Vq6K2qEaMzi1qIEuj4YtbBEQsdrZycWhnolVa_hnyDTWjS7V-uL_mTvFgdgE_7EAkCFToEIaqyTt0id",
  },
];

export function AtelierSection() {
  return (
    <section
      id="atelier"
      className="gs-section"
      style={{
        padding: "120px clamp(24px, 6vw, 80px)",
        maxWidth: "1440px",
        margin: "0 auto",
        borderTop: "1px solid rgba(77,70,58,0.12)",
      }}
    >
      <div style={{ marginBottom: "64px" }}>
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
          Tim Kami
        </span>
        <h2
          className="gs-fade d1"
          data-reveal="headline"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 500,
            color: "var(--gs-on-surface)",
            marginBottom: "16px",
          }}
        >
          Atelier
        </h2>
        <p
          className="gs-fade d2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "var(--gs-on-surface-variant)",
            maxWidth: "560px",
          }}
        >
          Dipimpin oleh para arsitek berpengalaman, studio kami menggabungkan keahlian teknis
          dengan sensibilitas artistik untuk menghasilkan karya monumental.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
        className="grid-cols-1 md:grid-cols-3"
      >
        {TEAM.map((member, i) => (
          <div
            key={member.id}
            data-reveal="scale-in"
            data-stagger
            className="gs-fade group"
            style={{
              transitionDelay: `${i * 120}ms`,
              position: "relative",
              cursor: "pointer",
            }}
          >
            {/* Image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                overflow: "hidden",
                border: "1px solid rgba(200,169,110,0.15)",
                position: "relative",
                marginBottom: "20px",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,110,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,110,0.15)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  opacity: 0.5,
                  filter: "grayscale(30%)",
                  transition: "transform 0.6s ease, opacity 0.4s",
                }}
                className="group-hover:scale-105 group-hover:opacity-70"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 50%)",
                }}
              />
            </div>

            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gs-gold)",
                display: "block",
                marginBottom: "6px",
              }}
            >
              {member.role}
            </span>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 500,
                color: "var(--gs-on-surface)",
                marginBottom: "8px",
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--gs-on-surface-variant)",
              }}
            >
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
