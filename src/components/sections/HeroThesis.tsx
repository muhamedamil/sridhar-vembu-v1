import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HERO_COPY, STORY_CHAPTERS } from "@/data/story";

export const HeroThesis = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const soilY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const panelX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section id="hero" ref={ref} data-tone="mixed" className="relative min-h-[165vh] overflow-hidden">
      <div className="sticky top-0 flex min-h-screen items-stretch overflow-hidden">
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { y: skyY }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,hsl(var(--silicon-accent)/0.18),transparent_34%),linear-gradient(180deg,hsl(var(--silicon-dark)),hsl(var(--silicon-mid))_38%,hsl(var(--soil-dark))_100%)]"
        />
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { y: soilY }}
          className="absolute inset-x-0 bottom-0 h-[58%] bg-[radial-gradient(circle_at_70%_20%,hsl(var(--gold)/0.16),transparent_28%),linear-gradient(180deg,transparent,hsl(var(--soil-warm)/0.28),hsl(var(--soil-dark)))]"
        />

        <div className="container relative z-10 flex min-h-screen flex-col justify-between py-6 md:py-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">{HERO_COPY.eyebrow}</div>
              <div className="mt-3 font-tamil text-xl text-paper/82 md:text-2xl">{HERO_COPY.tamilPrompt}</div>
              <div className="mt-2 font-display text-lg italic text-gold md:text-2xl">{HERO_COPY.englishPrompt}</div>
            </div>
            <div className="hidden text-right md:block">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">reverse chronology</div>
              <div className="mt-3 font-display text-3xl italic text-paper">{STORY_CHAPTERS[0].year}</div>
            </div>
          </div>

          <div className="grid gap-12 pb-12 pt-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <motion.h1
                style={reduce ? undefined : { x: panelX }}
                className="max-w-4xl font-display text-[clamp(3.1rem,9vw,8.6rem)] leading-[0.92] text-paper"
              >
                {HERO_COPY.title}
                <span className="block italic text-grad-gold">{HERO_COPY.subtitle}</span>
              </motion.h1>
              <p className="mt-8 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/76 md:text-xl">
                {HERO_COPY.body}
              </p>
              <p className="mt-8 max-w-2xl border-l border-gold/45 pl-4 font-display text-2xl italic leading-snug text-paper/84 md:text-4xl">
                {HERO_COPY.thesis}
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-sm border border-paper/10 bg-black/20 p-5 reverse-shadow backdrop-blur-sm">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">the expected map</div>
                <ul className="mt-4 space-y-3 font-serif-body text-sm leading-relaxed text-paper/72">
                  <li>Tamil Nadu to IIT to Princeton to Qualcomm to Silicon Valley.</li>
                  <li>Raise capital when the market breaks.</li>
                  <li>Take the IPO or acquisition when scale arrives.</li>
                </ul>
              </div>
              <div className="rounded-sm border border-gold/25 bg-soil-dark/45 p-5 reverse-shadow">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/78">the walked path</div>
                <ul className="mt-4 space-y-3 font-serif-body text-sm leading-relaxed text-paper/78">
                  <li>No VC during the crash.</li>
                  <li>Build ManageEngine and then Zoho product by product.</li>
                  <li>Return the center of gravity toward Mathalamparai and Tenkasi.</li>
                </ul>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">
                Scroll down. The years will keep trying to move backward.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
