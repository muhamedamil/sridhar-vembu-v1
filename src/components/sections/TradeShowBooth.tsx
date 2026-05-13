import { motion } from "framer-motion";

export const TradeShowBooth = () => {
  return (
    <section data-tone="silicon" className="relative overflow-hidden bg-silicon-dark py-32">
      <div className="container relative">
        <div className="mb-12 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/70">03 · First Risk</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/40">Atlanta · 1996</span>
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <h2 className="font-display text-5xl leading-tight text-paper md:text-6xl">
              The PhD <br />
              <span className="italic text-grad-gold">at the booth.</span>
            </h2>
            <p className="mt-6 font-serif-body text-lg leading-relaxed text-paper/70">
              Tony Thomas needed someone to sell SNMP network management software at a trade show. Sridhar — fresh from Princeton, fresh from Qualcomm — said yes. AdventNet was funded by personal savings. No VC. No angels. A handshake between brothers and friends.
            </p>
            <div className="mt-10 border-l-2 border-gold/60 pl-6">
              <p className="font-display text-2xl italic leading-snug text-paper md:text-3xl">
                "Why does India produce so much talent for export but cannot build a home-grown technology powerhouse?"
              </p>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">— The founding question</div>
            </div>
          </div>

          {/* Booth illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative aspect-square rounded-sm border border-gold/30 bg-silicon-mid/30 p-8"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              {/* Booth backdrop */}
              <rect x="20" y="30" width="160" height="90" fill="none" stroke="hsl(var(--gold))" strokeWidth="0.6" />
              <text x="100" y="65" textAnchor="middle" fill="hsl(var(--gold))" fontSize="9" fontFamily="Playfair Display" fontStyle="italic">AdventNet</text>
              <text x="100" y="82" textAnchor="middle" fill="hsl(var(--paper))" fontSize="4" fontFamily="IBM Plex Mono" letterSpacing="2">SNMP · NETWORK MGMT</text>
              <line x1="20" y1="120" x2="180" y2="120" stroke="hsl(var(--gold))" strokeWidth="0.4" />
              {/* Table */}
              <rect x="40" y="125" width="120" height="6" fill="hsl(var(--gold) / 0.4)" />
              {/* Brochures */}
              <rect x="55" y="120" width="14" height="5" fill="hsl(var(--paper))" opacity="0.7" />
              <rect x="75" y="120" width="14" height="5" fill="hsl(var(--paper))" opacity="0.5" />
              <rect x="95" y="120" width="14" height="5" fill="hsl(var(--paper))" opacity="0.7" />
              {/* Lone figure */}
              <circle cx="100" cy="142" r="4" fill="hsl(var(--paper))" />
              <rect x="96" y="146" width="8" height="14" fill="hsl(var(--paper))" />
              {/* Floor light */}
              <ellipse cx="100" cy="170" rx="50" ry="4" fill="hsl(var(--gold) / 0.2)" />
              {/* Spotlights */}
              <line x1="40" y1="20" x2="60" y2="50" stroke="hsl(var(--gold) / 0.3)" strokeWidth="0.5" />
              <line x1="160" y1="20" x2="140" y2="50" stroke="hsl(var(--gold) / 0.3)" strokeWidth="0.5" />
              <text x="100" y="190" textAnchor="middle" fill="hsl(var(--paper) / 0.5)" fontSize="3.5" fontFamily="IBM Plex Mono" letterSpacing="3">A PRINCETON PHD · ALONE · SELLING</text>
            </svg>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-6 border-t border-border/40 pt-10 sm:grid-cols-3">
          {[
            { k: "Founded", v: "1996" },
            { k: "Capital raised", v: "$0" },
            { k: "Co-founders", v: "5 (siblings + friends)" },
          ].map((s) => (
            <div key={s.k}>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">{s.k}</div>
              <div className="mt-2 font-display text-3xl text-paper">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
