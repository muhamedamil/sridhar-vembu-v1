import { useEffect, useMemo, useRef, useState } from "react";

type Tone = "soil" | "silicon" | "mixed";

const TONE_VARS: Record<Tone, { grain: number; scanlines: number; aura: string; auraAlpha: number }> = {
  soil: { grain: 0.085, scanlines: 0, aura: "var(--gold)", auraAlpha: 0.16 },
  silicon: { grain: 0.028, scanlines: 0.28, aura: "var(--silicon-accent)", auraAlpha: 0.14 },
  mixed: { grain: 0.055, scanlines: 0.12, aura: "var(--gold)", auraAlpha: 0.15 },
};

function setRootVar(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}

export const AmbientLayers = () => {
  const [tone, setTone] = useState<Tone>("mixed");
  const raf = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });

  const vars = useMemo(() => TONE_VARS[tone], [tone]);

  useEffect(() => {
    setRootVar("--grain-opacity", String(vars.grain));
    setRootVar("--scanline-opacity", String(vars.scanlines));
    setRootVar("--aura", vars.aura);
    setRootVar("--aura-alpha", String(vars.auraAlpha));
  }, [vars]);

  useEffect(() => {
    const isCoarse = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches;
    if (isCoarse) return;

    const onMove = (e: MouseEvent) => {
      last.current = { x: e.clientX, y: e.clientY };
      if (raf.current != null) return;
      raf.current = window.requestAnimationFrame(() => {
        raf.current = null;
        setRootVar("--cursor-x", `${last.current.x}px`);
        setRootVar("--cursor-y", `${last.current.y}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current != null) window.cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-tone]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!inView) return;
        const next = (inView.target as HTMLElement).dataset.tone as Tone | undefined;
        if (!next) return;
        setTone(next);
      },
      { root: null, rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5, 0.75, 0.99] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
      <div className="ambient-grain" />
      <div className="ambient-scanlines" />
      <div className="ambient-aura" />
    </div>
  );
};

