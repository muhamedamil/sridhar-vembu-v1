import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import silicon from "@/assets/silicon-night.jpg";
import mudHouse from "@/assets/mud-house.jpg";

type Item = { id: string; label: string; caption: string; x: string; y: string; w: string };

const journeyPanels = [
  {
    img: silicon,
    label: "Silicon Valley",
    note: "Twenty years. Glass towers. Freeway rivers. The expected center of gravity.",
    tone: "cool" as const,
  },
  {
    img: mudHouse,
    label: "Mathalamparai",
    note: "Mud walls. Bicycle commute. California calls at dawn. Village teaching at noon.",
    tone: "warm" as const,
  },
];

export const TheReturn = () => {
  const shouldReduceMotion = useReducedMotion();

  const items: Item[] = useMemo(
    () => [
      {
        id: "coffee",
        label: "Filter coffee",
        caption: "Caffeine for a day that starts before the sun, not for jet lag.",
        x: "18%",
        y: "26%",
        w: "120px",
      },
      {
        id: "rice",
        label: "Fermented rice",
        caption: "Same breakfast as the farmhand next door. Different spreadsheet.",
        x: "56%",
        y: "34%",
        w: "190px",
      },
      {
        id: "veshti",
        label: "Veshti",
        caption: "Dress code: breathable cotton, not bespoke suits.",
        x: "26%",
        y: "66%",
        w: "170px",
      },
      {
        id: "phone",
        label: "4:00 AM sync",
        caption: "California before sunrise. Math class under a neem tree later.",
        x: "72%",
        y: "62%",
        w: "130px",
      },
      {
        id: "notebook",
        label: "Notebook",
        caption: "Scribbles, diagrams, Tamil notes. The craft is still unfinished.",
        x: "64%",
        y: "78%",
        w: "170px",
      },
    ],
    [],
  );

  const [focus, setFocus] = useState<string | null>(null);

  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ["start start", "end end"] });
  const stripX = useTransform(scrollYProgress, [0, 1], ["0%", "-52%"]);
  const bridgeOpacity = useTransform(scrollYProgress, [0.2, 0.48, 0.78], [0, 1, 0]);
  const firstDim = useTransform(scrollYProgress, [0, 0.7], [0.05, 0.32]);
  const secondGlow = useTransform(scrollYProgress, [0.38, 0.95], [0.08, 0.3]);
  const firstPanelOpacity = useTransform(firstDim, (value) => 1 - value);

  return (
    <section id="return" data-tone="soil" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/70">
          Section 08 · The Return
        </span>
        <h2 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-paper md:text-7xl">
          Breakfast in a <span className="italic text-grad-gold">mud house.</span>
        </h2>
        <p className="mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/70">
          A move that reads like an eccentric personal choice until you see the point: an experiment in building
          world-class software from rural India, without the billionaire theater.
        </p>
      </div>

      <div className="container">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-stretch">
          <div className="relative overflow-hidden rounded-sm border border-border/40 bg-soil-mid/20">
            <div className="absolute inset-0 opacity-80 [background:radial-gradient(circle_at_30%_30%,hsl(var(--gold)/0.16),transparent_55%),linear-gradient(135deg,hsl(var(--soil-dark)/0.7),hsl(var(--soil-warm)/0.25))]" />

            <div className="relative aspect-[16/10] p-6 md:p-8">
              <div className="absolute inset-0 opacity-70 [background:linear-gradient(90deg,hsl(var(--soil-dark)/0.55),transparent_55%),radial-gradient(circle_at_75%_45%,hsl(var(--paper)/0.06),transparent_60%)]" />
              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ x: "-35%", opacity: 0 }}
                  whileInView={{ x: "35%", opacity: 0.55 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.2, 1, 0.2, 1] }}
                  className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-dawn/25 to-transparent"
                />
              )}

              {items.map((it) => {
                const active = focus === it.id;
                return (
                  <motion.button
                    key={it.id}
                    type="button"
                    onClick={() => setFocus((value) => (value === it.id ? null : it.id))}
                    onMouseEnter={() => setFocus(it.id)}
                    onMouseLeave={() => setFocus((value) => (value === it.id ? null : value))}
                    className="absolute rounded-sm border border-border/40 bg-background/10 p-3 text-left shadow-[0_30px_80px_-20px_hsl(0_0%_0%/0.55)] backdrop-blur-[2px] transition hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    style={{ left: it.x, top: it.y, width: it.w, transform: "translate(-50%,-50%)" }}
                    initial={false}
                    animate={{ scale: active ? 1.02 : 1, opacity: active ? 1 : 0.92 }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/65">{it.label}</div>
                    <div className="mt-2 h-px bg-gold/25" />
                    <div className="mt-3 text-xs text-paper/70">
                      {it.id === "coffee" && (
                        <svg viewBox="0 0 64 38" className="h-10 w-10">
                          <path d="M10 10 h28 a8 8 0 0 1 0 16 H10 Z" fill="hsl(var(--paper) / 0.12)" stroke="hsl(var(--paper) / 0.35)" />
                          <path d="M38 12 h8 a6 6 0 0 1 0 12 h-8" fill="none" stroke="hsl(var(--gold) / 0.7)" strokeWidth="2" />
                          <path d="M20 6 c-3 -5 4 -7 2 -12" stroke="hsl(var(--paper) / 0.35)" strokeWidth="1.5" fill="none" />
                          <path d="M30 6 c-3 -5 4 -7 2 -12" stroke="hsl(var(--paper) / 0.25)" strokeWidth="1.5" fill="none" />
                        </svg>
                      )}
                      {it.id === "rice" && (
                        <svg viewBox="0 0 64 38" className="h-10 w-10">
                          <ellipse cx="32" cy="22" rx="22" ry="12" fill="hsl(var(--paper) / 0.10)" stroke="hsl(var(--paper) / 0.35)" />
                          <ellipse cx="32" cy="22" rx="14" ry="7" fill="hsl(var(--paper) / 0.12)" />
                          <circle cx="20" cy="18" r="1.2" fill="hsl(var(--gold) / 0.7)" />
                          <circle cx="44" cy="24" r="1.2" fill="hsl(var(--gold) / 0.6)" />
                        </svg>
                      )}
                      {it.id === "veshti" && (
                        <svg viewBox="0 0 64 38" className="h-10 w-10">
                          <path d="M12 10 h40 v22 h-40 Z" fill="hsl(var(--paper) / 0.09)" stroke="hsl(var(--paper) / 0.3)" />
                          <path d="M24 10 v22" stroke="hsl(var(--gold) / 0.6)" strokeWidth="1.2" />
                          <path d="M38 10 v22" stroke="hsl(var(--gold) / 0.35)" strokeWidth="1.2" />
                        </svg>
                      )}
                      {it.id === "phone" && (
                        <svg viewBox="0 0 64 38" className="h-10 w-10">
                          <rect x="18" y="6" width="28" height="26" rx="3" fill="hsl(var(--paper) / 0.10)" stroke="hsl(var(--paper) / 0.35)" />
                          <rect x="21" y="10" width="22" height="14" rx="2" fill="hsl(var(--gold) / 0.12)" />
                          <path d="M22 27 h20" stroke="hsl(var(--paper) / 0.35)" />
                        </svg>
                      )}
                      {it.id === "notebook" && (
                        <svg viewBox="0 0 64 38" className="h-10 w-10">
                          <rect x="14" y="7" width="36" height="24" rx="2" fill="hsl(var(--paper) / 0.10)" stroke="hsl(var(--paper) / 0.35)" />
                          <path d="M20 12 h24 M20 16 h24 M20 20 h18" stroke="hsl(var(--paper) / 0.3)" />
                          <path d="M16 7 v24" stroke="hsl(var(--gold) / 0.6)" />
                        </svg>
                      )}
                    </div>
                  </motion.button>
                );
              })}

              <div className="absolute bottom-5 left-5 right-5">
                <motion.div
                  initial={false}
                  animate={{ opacity: focus ? 1 : 0, y: focus ? 0 : 8 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                  className="rounded-sm border border-gold/25 bg-soil-dark/60 px-4 py-3 text-paper/80 shadow-[0_30px_80px_-20px_hsl(0_0%_0%/0.55)]"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/85">Micro-story</div>
                  <div className="mt-2 font-serif-body italic">{items.find((item) => item.id === focus)?.caption ?? ""}</div>
                </motion.div>
                {!focus && (
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/50">
                    Tap or hover objects to read.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-border/40 bg-card/25 p-6 md:p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-gold/70">What this signals</div>
            <p className="mt-4 font-serif-body text-base leading-relaxed text-paper/70">
              A reported multi-billion net worth and a deliberate refusal to perform it. A home built of mud brick. A
              bicycle commute through paddy fields. A life designed to make rural feel like a valid place to build the
              future, not a place to escape.
            </p>
            <div className="mt-8 grid gap-4 border-t border-border/40 pt-6">
              {[
                { k: "Wake", v: "04:00" },
                { k: "Calendar", v: "US sync + village class" },
                { k: "Commute", v: "Bicycle" },
              ].map((entry) => (
                <div key={entry.k} className="flex items-baseline justify-between gap-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/50">{entry.k}</div>
                  <div className="font-display text-xl text-paper">{entry.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={journeyRef} className="relative mt-20 h-[165vh] md:h-[180vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="container flex h-full flex-col py-8">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">Against the current</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">
                {shouldReduceMotion ? "Valley → Village" : "Scroll to reverse the center of gravity"}
              </div>
            </div>

            {shouldReduceMotion ? (
              <div className="grid gap-6 md:grid-cols-2">
                {journeyPanels.map((panel) => (
                  <div key={panel.label} className="overflow-hidden rounded-sm border border-border/40">
                    <div className="aspect-[16/11]">
                      <img src={panel.img} alt={panel.label} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">{panel.label}</div>
                      <p className="mt-2 font-serif-body text-sm leading-relaxed text-paper/72">{panel.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-[2rem] border border-paper/10 bg-black/15 p-3 md:p-4">
                <motion.div style={{ x: stripX }} className="flex h-full w-[210%] gap-4">
                  {journeyPanels.map((panel, index) => (
                    <motion.article
                      key={panel.label}
                      style={index === 0 ? { opacity: firstPanelOpacity } : undefined}
                      className="relative h-full min-w-0 flex-1 overflow-hidden rounded-[1.6rem] border border-paper/10"
                    >
                      <img src={panel.img} alt={panel.label} className="h-full w-full object-cover" loading="lazy" />
                      <motion.div
                        aria-hidden="true"
                        style={panel.tone === "warm" ? { opacity: secondGlow } : { opacity: firstDim }}
                        className={`absolute inset-0 ${
                          panel.tone === "warm"
                            ? "bg-[radial-gradient(circle_at_70%_20%,hsl(var(--gold)/0.22),transparent_34%),linear-gradient(180deg,hsl(var(--soil-dark)/0.12),hsl(var(--soil-dark)/0.38))]"
                            : "bg-[linear-gradient(180deg,hsl(var(--silicon-dark)/0.22),hsl(var(--silicon-dark)/0.58))]"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-10">
                        <div className="font-mono text-[10px] uppercase tracking-[0.45em] text-paper/70">{panel.label}</div>
                        <p className="mt-3 max-w-xl font-display text-2xl italic leading-snug text-paper md:text-4xl">
                          {panel.note}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>

                <motion.div
                  style={{ opacity: bridgeOpacity }}
                  className="pointer-events-none absolute inset-y-0 left-1/2 flex w-[28rem] max-w-[80vw] -translate-x-1/2 items-center justify-center"
                >
                  <div className="rounded-full border border-paper/15 bg-background/60 px-5 py-3 text-center backdrop-blur-md">
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">The reversal</div>
                    <div className="mt-2 font-display text-2xl italic text-paper">Not exit. Re-location.</div>
                  </div>
                </motion.div>
              </div>
            )}

            <div className="mt-6 border-t border-border/40 pt-5">
              <div className="font-display text-3xl italic text-paper/80 md:text-4xl">He did not retire. He re-routed.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
