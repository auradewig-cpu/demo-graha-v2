import { useRef, useEffect, useCallback } from "react";

const TOTAL_FRAMES = 220;
const FRAME_PATH = (i) => {
  const n = String(i + 1).padStart(4, "0");
  return `/frames/hero-sequence-${n}.webp`;
};

const USE_BITMAP = typeof createImageBitmap === "function";

export function useFrameSequence({ onReady, onProgress } = {}) {
  const canvasRef = useRef(null);
  const frames = useRef(new Array(TOTAL_FRAMES).fill(null));
  const loaded = useRef(new Array(TOTAL_FRAMES).fill(false));
  const rafId = useRef(null);
  const lastFrame = useRef(-1);

  // Keep callbacks current without triggering effect re-runs
  const onReadyRef = useRef(onReady);
  const onProgressRef = useRef(onProgress);
  onReadyRef.current = onReady;
  onProgressRef.current = onProgress;

  // Fix 3: createImageBitmap pre-decodes in worker thread — no main-thread jank
  const loadFrame = useCallback((index, onLoad) => {
    if (loaded.current[index]) { onLoad?.(); return; }

    if (USE_BITMAP) {
      fetch(FRAME_PATH(index))
        .then((r) => r.blob())
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => {
          frames.current[index] = bitmap;
          loaded.current[index] = true;
          onLoad?.();
        })
        .catch(() => { loaded.current[index] = true; });
    } else {
      const img = new Image();
      img.src = FRAME_PATH(index);
      img.onload = () => {
        frames.current[index] = img;
        loaded.current[index] = true;
        onLoad?.();
      };
      img.onerror = () => { loaded.current[index] = true; };
    }
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
    const frame = frames.current[index];
    if (!canvas || !frame) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    // ImageBitmap uses .width/.height; HTMLImageElement uses .naturalWidth/.naturalHeight
    const fw = frame.naturalWidth ?? frame.width;
    const fh = frame.naturalHeight ?? frame.height;
    const ir = fw / fh;
    const cr = width / height;
    let sx = 0, sy = 0, sw = fw, sh = fh;
    if (ir > cr) { sw = sh * cr; sx = (fw - sw) / 2; }
    else { sh = sw / cr; sy = (fh - sh) / 2; }
    ctx.drawImage(frame, sx, sy, sw, sh, 0, 0, width, height);
  }, []);

  // Mobile optimization: cap at 720p on mobile/tablet, no ctx.scale needed
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = window.innerWidth < 1024;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    const maxW = isMobile ? 720 : window.innerWidth;
    const scale = Math.min(1, maxW / window.innerWidth);
    canvas.width = Math.round(window.innerWidth * dpr * scale);
    canvas.height = Math.round(window.innerHeight * dpr * scale);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    if (lastFrame.current >= 0 && frames.current[lastFrame.current]) {
      drawFrame(lastFrame.current);
    }
  }, [drawFrame]);

  // RAF loop — reads container position directly, no scroll listener
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

      // Adaptive preload: 20 frames ahead
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

  // Preload strategy: first 30 → call onReady, then batch the rest
  useEffect(() => {
    let doneCount = 0;
    for (let i = 0; i < 30; i++) {
      loadFrame(i, () => {
        if (i === 0) { resizeCanvas(); drawFrame(0); }
        doneCount++;
        onProgressRef.current?.(Math.round((doneCount / 30) * 100));
        if (doneCount === 30) onReadyRef.current?.();
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
