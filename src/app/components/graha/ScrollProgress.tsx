import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="hidden lg:block"
      style={{
        position: "fixed",
        right: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        height: "280px",
        width: "1px",
        background: "rgba(255,255,255,0.08)",
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: "1px",
          background: "var(--gs-gold)",
          height: `${progress}%`,
          transition: "height 0.1s ease-out",
        }}
      />
      {/* Dot indicator */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${progress}%`,
          transform: "translate(-50%, -50%)",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--gs-gold)",
          transition: "top 0.1s ease-out",
          boxShadow: "0 0 8px var(--gs-gold)",
        }}
      />
    </div>
  );
}
