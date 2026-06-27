import { useEffect } from "react";

export function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".gs-fade").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".gs-section");
    sections.forEach((s) => observer.observe(s));

    // Trigger for already visible sections
    setTimeout(() => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          section.querySelectorAll(".gs-fade").forEach((el) => el.classList.add("visible"));
        }
      });
    }, 50);

    return () => observer.disconnect();
  }, []);
}
