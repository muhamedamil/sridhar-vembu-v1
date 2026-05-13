import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";

const seeded = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

type Candidate = { id: string; tag: string; hasDegree: boolean };

export const QuietPolicyHacker = () => {
  const shouldReduceMotion = useReducedMotion();
  const [degreeRequired, setDegreeRequired] = useState(true);
  const DEGREE_LINE = "Bachelor’s degree in Computer Science or equivalent";
  const SKILL_LINE = "Strong problem-solving skills, portfolio, willingness to learn";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (degreeRequired) {
      setTyped("");
      return;
    }
    if (shouldReduceMotion) {
      setTyped(SKILL_LINE);
      return;
    }
    setTyped("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(SKILL_LINE.slice(0, i));
      if (i >= SKILL_LINE.length) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [degreeRequired, shouldReduceMotion]);

  const candidates: Candidate[] = useMemo(
    () =>
      Array.from({ length: 54 }).map((_, i) => ({
        id: `c${i}`,
        hasDegree: seeded(i) > 0.58,
        tag:
          seeded(i + 10) > 0.9
            ? "Built 3 apps"
            : seeded(i + 11) > 0.84
              ? "Portfolio first"
              : seeded(i + 12) > 0.78
                ? "Zoho Schools — Tirunelveli"
                : seeded(i + 13) > 0.72
                  ? "Self-taught — Thanjavur"
                  : "Problem solver",
      })),
    [],
  );

  const visible = candidates.filter((c) => (degreeRequired ? c.hasDegree : true));

  return (
    <section id="policy" data-tone="silicon" className="relative overflow-hidden bg-silicon-dark py-32">
      <div className="container relative">
        <div className="mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/70">
            SECTION 07 · THE QUIET POLICY HACKER
          </span>
          <h2 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-paper md:text-7xl">
            Degrees <span className="italic text-grad-gold">not required.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/70">
            A tiny internal rule changes who gets to play. If a manager tries to sneak “degree required” into a job
            description, HR asks them to remove it. The filter isn’t paper — it’s proof of skill and the willingness to
            learn.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* JD editor */}
          <div className="rounded-sm border border-border/40 bg-background/25 p-6 md:p-8">
            <div className="flex items-center justify-between gap-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">Job description</div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">
                  Keep degree filter?
                </span>
                <Switch checked={degreeRequired} onCheckedChange={setDegreeRequired} />
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-sm border border-border/40 bg-silicon-dark/60 p-5 font-mono text-[12px] leading-relaxed text-paper/75">
              <div className="opacity-70">role: Product Engineer</div>
              <div className="opacity-70">location: Remote / Rural campus</div>
              <div className="opacity-70">stack: TypeScript · Systems thinking</div>
              <div className="mt-4">
                <span className="opacity-70">requirements:</span>{" "}
                <motion.span
                  initial={false}
                  animate={{ opacity: degreeRequired ? 1 : 0.45 }}
                  className="relative inline-block text-paper"
                >
                  {DEGREE_LINE}
                  {!degreeRequired && (
                    <motion.span
                      aria-hidden="true"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.35, ease: [0.2, 1, 0.2, 1] }}
                      className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-destructive/70"
                    />
                  )}
                </motion.span>

                {!degreeRequired && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                    <span className="opacity-70">→</span>{" "}
                    <span className="text-paper" aria-live="polite">
                      {typed}
                    </span>
                  </motion.div>
                )}
              </div>

              {!degreeRequired && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-sm border border-gold/25 bg-soil-mid/25 p-3"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/80">HR</div>
                  <div className="mt-1 font-serif-body text-sm italic text-paper/70">
                    “Please remove the degree requirement.”
                  </div>
                </motion.div>
              )}
            </div>

            <p className="mt-6 font-serif-body text-sm italic text-paper/60">
              Toggle it. Watch who becomes visible.
            </p>
          </div>

          {/* Candidate pool */}
          <div className="rounded-sm border border-border/40 bg-background/25 p-6 md:p-8">
            <div className="flex items-center justify-between gap-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">Candidate pool</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">
                showing <span className="text-gold">{visible.length}</span> / {candidates.length}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-6 gap-3">
              {candidates.map((c, i) => {
                const isVisible = degreeRequired ? c.hasDegree : true;
                const hue = c.hasDegree ? "bg-paper/25" : "bg-gold/75";
                return (
                  <motion.div
                    key={c.id}
                    initial={false}
                    animate={{
                      opacity: isVisible ? 1 : 0.15,
                      scale: isVisible ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.25, delay: Math.min(i * 0.01, 0.3) }}
                    className="group relative"
                  >
                    <div
                      className={`h-10 w-10 rounded-full border border-border/50 ${hue} ${
                        !degreeRequired && !c.hasDegree ? "shadow-[0_0_30px_hsl(var(--gold)/0.18)]" : ""
                      }`}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-12 w-max -translate-x-1/2 whitespace-nowrap rounded-sm border border-border/40 bg-silicon-dark/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.35em] text-paper/70 opacity-0 transition group-hover:opacity-100">
                      {c.tag}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 rounded-sm border border-gold/20 bg-silicon-dark/40 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">What changes</div>
              <p className="mt-2 font-serif-body text-sm leading-relaxed text-paper/70">
                When paper is the filter, the pool is narrower — and predictable. When skill is the filter, the pool
                gets weird in the best way: village, city, dropout, diploma, self-taught — all competing in the same
                arena.
              </p>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          className="mt-16 max-w-3xl font-display text-3xl italic leading-snug text-paper/80 md:text-4xl"
        >
          A policy so quiet it barely looks like ideology — until you see who it lets in.
        </motion.p>
      </div>
    </section>
  );
};
