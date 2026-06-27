import { useState } from "react";
import { X, Send, MessageSquare } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", project: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Halo GRAHA Studio! Saya ${form.name} ingin berkonsultasi mengenai proyek ${form.project}.\n\n${form.message}\n\nTelepon: ${form.phone}`
    );
    window.open(`https://wa.me/6281234567890?text=${msg}`, "_blank");
    setSent(true);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.25s ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "var(--gs-surface-low)",
          border: "1px solid rgba(200,169,110,0.2)",
          padding: "48px",
          maxWidth: "560px",
          width: "100%",
          position: "relative",
          boxShadow: "0 0 80px rgba(200,169,110,0.1)",
          animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "var(--gs-on-surface-variant)",
            cursor: "pointer",
            padding: "4px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gs-gold)")}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--gs-on-surface-variant)")
          }
        >
          <X size={20} />
        </button>

        {!sent ? (
          <>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: 500,
                color: "var(--gs-on-surface)",
                marginBottom: "8px",
              }}
            >
              Mulai Konsultasi
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "var(--gs-on-surface-variant)",
                marginBottom: "32px",
              }}
            >
              Tim kami akan menghubungi Anda dalam 24 jam.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { key: "name", label: "Nama Lengkap", placeholder: "Ahmad Rafi" },
                { key: "phone", label: "Nomor WhatsApp", placeholder: "+62 812 3456 7890" },
                { key: "project", label: "Jenis Proyek", placeholder: "Villa, Rumah Tinggal, Komersial..." },
              ].map((field) => (
                <div key={field.key}>
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--gs-on-surface-variant)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    style={{
                      width: "100%",
                      background: "var(--gs-surface-container)",
                      border: "1px solid rgba(77,70,58,0.5)",
                      color: "var(--gs-on-surface)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      padding: "12px 16px",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor = "var(--gs-gold)")
                    }
                    onBlur={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor = "rgba(77,70,58,0.5)")
                    }
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gs-on-surface-variant)",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Ceritakan Visi Anda
                </label>
                <textarea
                  rows={3}
                  placeholder="Saya ingin membangun..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%",
                    background: "var(--gs-surface-container)",
                    border: "1px solid rgba(77,70,58,0.5)",
                    color: "var(--gs-on-surface)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    padding: "12px 16px",
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = "var(--gs-gold)")
                  }
                  onBlur={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = "rgba(77,70,58,0.5)")
                  }
                />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: "var(--gs-gold)",
                    border: "none",
                    color: "#0D0D0D",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "14px 24px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  <MessageSquare size={14} />
                  Via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: "14px 20px",
                    background: "transparent",
                    border: "1px solid rgba(200,169,110,0.3)",
                    color: "var(--gs-on-surface-variant)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--gs-gold)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gs-gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,110,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gs-on-surface-variant)";
                  }}
                >
                  Batal
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "2px solid var(--gs-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <Send size={24} color="var(--gs-gold)" />
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 500,
                color: "var(--gs-on-surface)",
                marginBottom: "12px",
              }}
            >
              Pesan Terkirim!
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "var(--gs-on-surface-variant)",
                marginBottom: "32px",
              }}
            >
              WhatsApp telah terbuka. Tim kami akan segera merespons.
            </p>
            <button
              onClick={() => { setSent(false); onClose(); }}
              style={{
                background: "var(--gs-gold)",
                border: "none",
                color: "#0D0D0D",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "14px 32px",
                cursor: "pointer",
              }}
            >
              Tutup
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
