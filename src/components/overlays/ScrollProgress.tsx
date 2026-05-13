import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { STORY_CHAPTERS } from "@/data/story";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.24 });
  const [activeId, setActiveId] = useState<string>(STORY_CHAPTERS[0].id);

  useEffect(() => {
    const sections = STORY_CHAPTERS.map((chapter) => document.getElementById(chapter.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) {
      return;
    }

    const onScroll = () => {
      const midpoint = window.innerHeight * 0.45;
      let closest = sections[0];
      let best = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const box = section.getBoundingClientRect();
        const distance = Math.abs(box.top - midpoint);
        if (distance < best) {
          best = distance;
          closest = section;
        }
      });

      setActiveId(closest.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeChapter = useMemo(
    () => STORY_CHAPTERS.find((chapter) => chapter.id === activeId) ?? STORY_CHAPTERS[0],
    [activeId],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed bottom-4 right-3 top-4 z-50 hidden w-16 md:block">
      <div className="absolute inset-y-0 right-4 w-px bg-paper/12" />
      <motion.div
        className="absolute bottom-0 right-4 w-px origin-bottom bg-gradient-to-t from-gold via-paper/60 to-transparent shadow-[0_0_24px_hsl(var(--gold)/0.28)]"
        style={{ scaleY }}
      />
      <div className="absolute right-0 top-0 w-14 text-right">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/55">walking backward</div>
        <div className="mt-3 font-display text-3xl italic text-grad-gold">{activeChapter.year}</div>
        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-paper/50">{activeChapter.label}</div>
      </div>
    </div>
  );
};
