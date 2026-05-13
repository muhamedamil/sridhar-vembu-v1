import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRESSURE_EMAILS, REBUILD_SEQUENCE } from "@/data/story";

export const FirstRiskAndCliff = () => {
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useState<string[]>([]);
  const remaining = useMemo(
    () => PRESSURE_EMAILS.filter((email) => !dismissed.includes(email.id)),
    [dismissed],
  );
  const cleared = remaining.length === 0;

  const rejectEmail = (id: string) => {
    setDismissed((current) => (current.includes(id) ? current : [...current, id]));
  };

  const resetRoom = () => {
    setDismissed([]);
  };

  return (
    <section id="pressure-room" data-tone="silicon" className="relative overflow-hidden bg-silicon-dark py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--destructive)/0.12),transparent_26%),radial-gradient(circle_at_85%_30%,hsl(var(--silicon-accent)/0.12),transparent_30%)]" />
      <div className="container relative">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold/70">
            Section 03 · The 2001 Pressure Room
          </div>
          <h2 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">
            The market crashed.
            <span className="block italic text-grad-gold">The inbox filled up.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/72">
            Instead of asking the user to pick a tidy moral answer, this section asks them to clear the pressure itself.
            Dismiss the offers, the rescue language, the warnings, and the urgency. Then the rebuild sequence can begin.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-sm border border-paper/10 bg-black/30 p-5 reverse-shadow">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">2001 inbox</div>
                <div className="mt-2 font-display text-3xl italic text-paper md:text-4xl">Pressure does not arrive as philosophy.</div>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">
                remaining {remaining.length}/{PRESSURE_EMAILS.length}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <AnimatePresence initial={false}>
                {remaining.map((email, index) => (
                  <motion.article
                    key={email.id}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 120, rotate: 5, transition: { duration: reduce ? 0 : 0.22 } }}
                    transition={{ duration: reduce ? 0 : 0.28, delay: reduce ? 0 : index * 0.04 }}
                    className="rounded-sm border border-destructive/25 bg-[#111827]/85 p-4 md:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.34em] text-destructive/80">{email.from}</div>
                        <h3 className="mt-2 font-display text-2xl text-paper">{email.subject}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => rejectEmail(email.id)}
                        className="rounded-sm border border-gold/35 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-soil-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                        aria-label={`Reject ${email.subject}`}
                      >
                        Reject
                      </button>
                    </div>
                    <p className="mt-4 max-w-2xl font-serif-body text-sm leading-relaxed text-paper/72">{email.body}</p>
                  </motion.article>
                ))}
              </AnimatePresence>

              {cleared && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-sm border border-gold/25 bg-soil-dark/55 p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/80">After the pressure cleared</div>
                  <p className="mt-3 font-display text-3xl italic text-paper md:text-4xl">He said no to all of them.</p>
                </motion.div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {!cleared && (
                <button
                  type="button"
                  onClick={() => setDismissed(PRESSURE_EMAILS.map((email) => email.id))}
                  className="rounded-sm border border-paper/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/70 transition hover:border-gold/40 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Reject all
                </button>
              )}
              {cleared && (
                <button
                  type="button"
                  onClick={resetRoom}
                  className="rounded-sm border border-paper/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/70 transition hover:border-gold/40 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Replay the room
                </button>
              )}
            </div>
          </div>

          <div className="rounded-sm border border-gold/20 bg-soil-dark/35 p-6 reverse-shadow">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">Rebuild sequence</div>
            <div className="mt-6 space-y-4">
              {REBUILD_SEQUENCE.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: reduce ? 0 : 0.32, delay: reduce ? 0 : index * 0.05 }}
                  className={`rounded-sm border p-5 ${
                    cleared ? "border-gold/25 bg-soil-mid/25" : "border-paper/10 bg-black/15"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-display text-2xl italic text-paper">{step.label}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.34em] text-paper/52">{step.year}</div>
                  </div>
                  <p className="mt-3 font-serif-body text-sm leading-relaxed text-paper/70">{step.detail}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-6 border-l border-gold/45 pl-4 font-display text-2xl italic leading-snug text-paper/82">
              Refusal was not passivity. It was a different operating logic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
