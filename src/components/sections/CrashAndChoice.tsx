import { motion } from "framer-motion";
import { useState } from "react";

const VC_OUTCOMES = [
  "Series A. Board seats traded for survival.",
  "Hire to plan, not to need.",
  "Pressure to chase telecom rebound that never comes.",
  "Year 5: forced exit at a discount. Founders diluted.",
];
const BUILD_OUTCOMES = [
  "Refuse capital. Cut nothing essential.",
  "2002 — pivot to ManageEngine.",
  "2005 — launch Zoho.com cloud SaaS.",
  "2022 — cross $1B revenue. Still no investors. Still not for sale.",
];

export const CrashAndChoice = () => {
  const [choice, setChoice] = useState<"vc" | "build" | null>(null);

  return (
    <section data-tone="mixed" className="relative overflow-hidden bg-background py-32">
      <div className="container">
        <div className="mb-12 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/70">04 · The Crash & The Choice</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/40">2001</span>
        </div>

        <h2 className="max-w-3xl font-display text-5xl leading-tight text-paper md:text-7xl">
          Business <span className="italic text-destructive">dried up.</span>
        </h2>
        <p className="mt-6 max-w-2xl font-serif-body text-lg text-paper/70">
          On track for $10M revenue. Then the dot-com bust took the entire telecom market with it. The VCs were calling. Sridhar said no.
        </p>

        {/* Revenue graph */}
        <div className="mt-12 rounded-sm border border-border/40 bg-card/40 p-6">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">
            <span>AdventNet revenue · 1998 — 2002</span>
            <span className="text-destructive">— 100%</span>
          </div>
          <svg viewBox="0 0 400 120" className="h-32 w-full">
            <motion.path
              d="M 10 90 L 80 70 L 150 50 L 220 30 L 280 95 L 340 110 L 390 112"
              fill="none" stroke="hsl(var(--destructive))" strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            <line x1="10" y1="115" x2="390" y2="115" stroke="hsl(var(--border))" strokeWidth="0.5" />
            {["1998","1999","2000","2001","2002"].map((y, i) => (
              <text key={y} x={10 + i * 95} y="120" fill="hsl(var(--paper) / 0.5)" fontSize="6" fontFamily="IBM Plex Mono">{y}</text>
            ))}
          </svg>
          <p className="mt-3 max-w-xl font-serif-body italic text-paper/60">
            "The philosophy of taking somebody's money and promising them what they want looks like a gamble to me. So, like a good man, I said no."
          </p>
        </div>

        {/* Choice */}
        <div className="mt-16">
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/70">Choose his next move ↓</div>
          <div className="grid gap-6 md:grid-cols-2">
            <button
              onClick={() => setChoice("vc")}
              className={`group rounded-sm border p-8 text-left transition ${choice === "vc" ? "border-silicon-accent bg-silicon-mid/40" : "border-border/40 bg-card/30 hover:border-silicon-accent/60"}`}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silicon-accent">Series A</div>
              <div className="mt-3 font-display text-3xl text-paper">Take the money.</div>
              <div className="mt-2 font-serif-body text-paper/60">Survive on someone else's terms.</div>
              {choice === "vc" && (
                <ul className="mt-6 space-y-2 font-serif-body text-paper/80">
                  {VC_OUTCOMES.map((t, i) => (
                    <motion.li key={t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="border-l-2 border-silicon-accent/60 pl-3 text-sm">
                      {t}
                    </motion.li>
                  ))}
                </ul>
              )}
            </button>

            <button
              onClick={() => setChoice("build")}
              className={`group rounded-sm border p-8 text-left transition ${choice === "build" ? "border-gold bg-soil-mid/40 glow-gold" : "border-border/40 bg-card/30 hover:border-gold/60"}`}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Rebuild</div>
              <div className="mt-3 font-display text-3xl text-paper">Build your way out.</div>
              <div className="mt-2 font-serif-body text-paper/60">Slower. Quieter. Yours.</div>
              {choice === "build" && (
                <ul className="mt-6 space-y-2 font-serif-body text-paper/80">
                  {BUILD_OUTCOMES.map((t, i) => (
                    <motion.li key={t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="border-l-2 border-gold/60 pl-3 text-sm">
                      {t}
                    </motion.li>
                  ))}
                </ul>
              )}
            </button>
          </div>
          {choice === "build" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 font-hand text-3xl text-gold">
              That's the path he chose.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};
