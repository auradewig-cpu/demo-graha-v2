import { useRef, useEffect, useCallback } from "react";

const TOTAL_FRAMES = 220;
const FRAME_PATH = (i) => {
  const n = String(i + 1).padStart(4, "0");
  return `/frames/hero-sequence-${n}.webp`;
};

export function useFrameSequence() {
  const canvasRef = useRef(null);
  const frames = useRef(new Array(TOTAL_FRAMES).fill(null));
  const loaded = useRef(new Array(TOTAL_FRAMES).fill(false));
  const rafId = useRef(null);
  const lastFrame = useRef(-1);

  const loadFrame = useCallback((index, onLoad) => {
    if (loaded.current[index]) { onLoad?.(); return; }
    const img = new Image();
    img.src = FRAME_PATH(index);
    img.onload = () => {
      frames.current[index] = img;
      loaded.current[index] = true;
      onLoad?.();
    };
    img.onerror = () => { loaded.current[index] = true; };
  }, []);

  const loadBatch = useCallback((start, end, delay = 0) => {
    setTimeout(() => {
      for (let i = start; i <= Math.min(end, TOTAL_FRAMES - 1); i++) {
        loadFrame(i);
      }
    }, delay);
  }, [loadFrame]);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = frames.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = width / height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (ir > cr) { sw = sh * cr; sx = (img.naturalWidth - sw) / 2; }
    else { sh = sw / cr; sy = (img.naturalHeight - sh) / 2; }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    canvas.getContext("2d").scale(dpr, dpr);
    if (lastFrame.current >= 0 && frames.current[lastFrame.current]) {
      drawFrame(lastFrame.current);
    }
  }, [drawFrame]);

  // RAF loop — baca container position langsung
  useEffect(() => {
    const container = document.getElementById("hero-scrub-container");
    if (!container) return;
    let running = true;

    function tick() {
      if (!running) return;
      rafId.current = requestAnimationFrame(tick);
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const target = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));

      // Adaptive preload: always load 20 frames ahead of current position
      for (let i = Math.max(0, target - 2); i <= Math.min(TOTAL_FRAMES - 1, target + 20); i++) {
        if (!loaded.current[i]) loadFrame(i);
      }

      if (target !== lastFrame.current && loaded.current[target]) {
        lastFrame.current = target;
        drawFrame(target);
      }

      window.dispatchEvent(new CustomEvent("hero-progress", { detail: progress }));
    }

    rafId.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafId.current); };
  }, [loadFrame, drawFrame]);

  // Preload strategy bertahap
  useEffect(() => {
    for (let i = 0; i < 30; i++) {
      loadFrame(i, () => {
        if (i === 0) { resizeCanvas(); drawFrame(0); }
      });
    }
    loadBatch(30, 99, 500);
    loadBatch(100, 219, 1200);
    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [loadFrame, loadBatch, drawFrame, resizeCanvas]);

  return { canvasRef };
}
