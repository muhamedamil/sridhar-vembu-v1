import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";

const seeded = (i: number) => {
  const x = Math.sin(i * 91.123) * 10000;
  return x - Math.floor(x);
};

export const SchoolWithNoMarks = () => {
  const [v, setV] = useState<number[]>([55]); // 0 = Filter, 100 = Context
  const context = v[0] / 100;

  const crowd = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        x: seeded(i) * 96 + 2,
        y: seeded(i + 50) * 66 + 22,
        s: 0.7 + seeded(i + 100) * 0.6,
      })),
    [],
  );

  const cutoff = 0.28 + (1 - context) * 0.42; // higher cutoff = stricter filter

  return (
    <section id="school" data-tone="mixed" className="relative overflow-hidden bg-background py-32">
      <div className="container relative">
        <div className="mb-12 max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/70">
            SECTION 05 · THE SCHOOL WITH NO MARKS
          </span>
          <h2 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">
            Contextual knowledge. <span className="italic text-grad-gold">Not cut-offs.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/70">
            Zoho Schools isn’t a hiring funnel disguised as education. It’s an argument: marks and degrees are blunt,
            decontextualized filters. Real systems don’t care about your CGPA. They care if you can build, debug, and
            keep going.
          </p>
        </div>

        <div className="rounded-sm border border-border/40 bg-card/25 p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/50">
                Move from Marks as Filter → Context as Feedback
              </div>
              <div className="mt-2 font-display text-3xl text-paper">
                {context < 0.5 ? "Filter" : "Context"}
                <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.35em] text-paper/45">
                  {Math.round(context * 100)}%
                </span>
              </div>
            </div>
            <div className="w-full md:w-[380px]">
              <Slider
                value={v}
                onValueChange={setV}
                min={0}
                max={100}
                step={1}
                className="py-2"
                aria-label="Filter vs Context slider"
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">
                <span>Marks</span>
                <span>Context</span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {/* Left: filter gate */}
            <div className="relative overflow-hidden rounded-sm border border-border/40 bg-silicon-dark/40 p-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">Degree cut-off</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-destructive/80">CGPA</div>
              </div>

              <div className="relative mt-6 h-[340px] rounded-sm bg-silicon-dark/60">
                {/* crowd */}
                {crowd.map((c, i) => {
                  const allowed = c.y / 100 < cutoff;
                  const opacity = allowed ? 0.18 + (1 - context) * 0.45 : 0.06;
                  return (
                    <span
                      key={i}
                      className="absolute rounded-full bg-paper"
                      style={{
                        left: `${c.x}%`,
                        top: `${c.y}%`,
                        width: `${6 * c.s}px`,
                        height: `${6 * c.s}px`,
                        opacity,
                        transform: "translate(-50%,-50%)",
                        transition: "opacity 220ms ease",
                      }}
                    />
                  );
                })}

                {/* gate */}
                <div className="absolute inset-x-0 bottom-0">
                  <div
                    className="mx-auto w-[72%] rounded-sm border border-paper/20 bg-gradient-to-b from-paper/10 to-transparent"
                    style={{ height: `${90 + (1 - context) * 140}px`, transition: "height 260ms ease" }}
                  />
                  <div className="mt-3 flex items-center justify-between px-8 font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">
                    <span>75%+</span>
                    <span className="opacity-60">only paper</span>
                  </div>
                </div>

                {/* cutoff line */}
                <div
                  className="absolute inset-x-0 border-t border-destructive/60"
                  style={{ top: `${cutoff * 100}%`, transition: "top 260ms ease" }}
                />
              </div>
            </div>

            {/* Right: context workshop */}
            <div className="relative overflow-hidden rounded-sm border border-border/40 bg-soil-mid/30 p-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">Workshop</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/80">Feedback loops</div>
              </div>

              <div className="relative mt-6 h-[340px] rounded-sm bg-soil-dark/50">
                <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_30%_20%,hsl(var(--gold)/0.18),transparent_60%),radial-gradient(circle_at_70%_70%,hsl(var(--field-bright)/0.18),transparent_55%)]" />

                {crowd.slice(0, 70).map((c, i) => {
                  const show = i / 70 < context;
                  return (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.7 }}
                      transition={{ duration: 0.25 }}
                      className="absolute"
                      style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%,-50%)" }}
                    >
                      <div className="h-3 w-3 rounded-full bg-gold/85 shadow-[0_0_20px_hsl(var(--gold)/0.25)]" />
                    </motion.div>
                  );
                })}

                {/* tags */}
                <div className="absolute inset-x-4 bottom-4 grid gap-2">
                  {["Built 3 internal tools", "Fixes production bugs", "Learns by shipping", "Asks better questions"].map(
                    (t, i) => {
                      const show = context > 0.35 + i * 0.12;
                      return (
                        <motion.div
                          key={t}
                          initial={false}
                          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
                          transition={{ duration: 0.25, delay: i * 0.02 }}
                          className="inline-flex w-fit items-center gap-2 rounded-sm border border-gold/25 bg-soil-dark/55 px-3 py-2"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/70">{t}</span>
                        </motion.div>
                      );
                    },
                  )}
                </div>
              </div>

              <motion.p
                initial={false}
                animate={{ opacity: context > 0.75 ? 1 : 0 }}
                className="mt-5 max-w-xl font-serif-body italic text-paper/70"
              >
                “Formal education only takes you so far; contextual knowledge comes from actually doing something.”
              </motion.p>
            </div>
          </div>

          <div className="mt-10 border-t border-border/40 pt-8">
            <div className="inline-flex items-center gap-3 rounded-sm border border-gold/20 bg-background/30 px-4 py-3">
              <span className="font-hand text-2xl text-gold">Contextual · Relevant · Experiential</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">
                a school that pays you to learn
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
