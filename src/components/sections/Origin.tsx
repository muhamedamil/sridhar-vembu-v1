import { motion, useReducedMotion } from "framer-motion";
import { INVERTED_MAP } from "@/data/story";

export const Origin = () => {
  const reduce = useReducedMotion();

  return (
    <section id="origin" data-tone="soil" className="relative overflow-hidden bg-soil-dark py-24 md:py-32">
      <div className="container">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold/70">
            Section 02 · The Inverted Career Map
          </div>
          <h2 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">
            Most ambition leaves.
            <span className="block italic text-grad-gold">His turned back.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/72">
            This is the same origin story, reframed as a contrast map. One side shows the standard direction of talent.
            The other shows a path that passes through the same elite gates and then reverses its center of gravity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-sm border border-border/40 bg-black/20 p-6 reverse-shadow">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/48">Where talent usually goes</div>
            <div className="mt-6 rounded-sm border border-paper/10 bg-silicon-dark/55 p-5">
              <div className="relative min-h-[24rem] overflow-hidden rounded-sm bg-ledger">
                <div className="absolute left-[16%] top-[48%] h-16 w-16 rounded-full border border-gold/40 bg-soil-mid/70 text-center">
                  <div className="pt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/80">Tamil Nadu</div>
                </div>
                {INVERTED_MAP.usualDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : index * 0.07 }}
                    className="absolute rounded-sm border border-paper/10 bg-silicon-mid/60 px-4 py-3"
                    style={{ left: `${53 + (index % 2) * 10}%`, top: `${14 + index * 14}%` }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper/72">{destination.label}</div>
                    <div className="mt-2 max-w-[12rem] font-serif-body text-sm text-paper/60">{destination.note}</div>
                    <div className="absolute -left-12 top-1/2 h-px w-12 bg-gradient-to-r from-gold/70 to-transparent" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-gold/25 bg-soil-mid/20 p-6 reverse-shadow">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">Where Sridhar went</div>
            <div className="mt-6 space-y-4">
              {INVERTED_MAP.sridharPath.map((step, index) => (
                <motion.article
                  key={`${step.year}-${step.place}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : index * 0.06 }}
                  className="relative rounded-sm border border-gold/20 bg-soil-dark/45 p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div className="font-display text-2xl italic text-paper md:text-3xl">{step.place}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.34em] text-gold/70">{step.year}</div>
                  </div>
                  <p className="mt-3 max-w-2xl font-serif-body text-sm leading-relaxed text-paper/72">{step.note}</p>
                  {index < INVERTED_MAP.sridharPath.length - 1 && (
                    <div className="absolute bottom-[-1.15rem] left-8 h-5 w-px bg-gradient-to-b from-gold/80 to-transparent" />
                  )}
                </motion.article>
              ))}
            </div>
            <p className="mt-6 border-l border-gold/45 pl-4 font-display text-2xl italic leading-snug text-paper/82">
              The achievement path stayed conventional for a while. The destination did not.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
