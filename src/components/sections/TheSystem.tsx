import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type Cluster =
  | "Sales"
  | "Finance"
  | "Support"
  | "HR"
  | "Collaboration"
  | "Developer"
  | "Marketing"
  | "Analytics";

type ProductNode = { name: string; cluster: Cluster; year?: number };

const seeded = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const CLUSTERS: Record<Cluster, { x: number; y: number; c: string }> = {
  Sales: { x: 28, y: 34, c: "hsl(var(--silicon-accent))" },
  Marketing: { x: 18, y: 52, c: "hsl(var(--gold))" },
  Finance: { x: 64, y: 28, c: "hsl(var(--gold))" },
  Analytics: { x: 76, y: 42, c: "hsl(var(--paper) / 0.85)" },
  Support: { x: 76, y: 58, c: "hsl(var(--silicon-accent))" },
  HR: { x: 52, y: 66, c: "hsl(var(--gold))" },
  Collaboration: { x: 30, y: 70, c: "hsl(var(--paper) / 0.85)" },
  Developer: { x: 50, y: 42, c: "hsl(var(--silicon-accent))" },
};

const PRODUCTS: ProductNode[] = [
  { name: "CRM", cluster: "Sales", year: 2005 },
  { name: "Bigin", cluster: "Sales" },
  { name: "SalesIQ", cluster: "Sales" },
  { name: "Bookings", cluster: "Sales" },
  { name: "Forms", cluster: "Sales" },

  { name: "Campaigns", cluster: "Marketing" },
  { name: "Social", cluster: "Marketing" },
  { name: "Survey", cluster: "Marketing" },
  { name: "Backstage", cluster: "Marketing" },

  { name: "Books", cluster: "Finance" },
  { name: "Invoice", cluster: "Finance" },
  { name: "Expense", cluster: "Finance" },
  { name: "Inventory", cluster: "Finance" },
  { name: "Subscriptions", cluster: "Finance" },

  { name: "Analytics", cluster: "Analytics" },
  { name: "Lens", cluster: "Analytics" },

  { name: "Desk", cluster: "Support" },
  { name: "Assist", cluster: "Support" },
  { name: "Vault", cluster: "Support" },
  { name: "Sign", cluster: "Support" },

  { name: "People", cluster: "HR" },
  { name: "Recruit", cluster: "HR" },
  { name: "Payroll", cluster: "HR" },

  { name: "Mail", cluster: "Collaboration" },
  { name: "Cliq", cluster: "Collaboration" },
  { name: "Meeting", cluster: "Collaboration" },
  { name: "Writer", cluster: "Collaboration", year: 2005 },
  { name: "Sheet", cluster: "Collaboration" },
  { name: "Show", cluster: "Collaboration" },
  { name: "WorkDrive", cluster: "Collaboration" },
  { name: "Projects", cluster: "Collaboration" },

  { name: "Creator", cluster: "Developer" },
  { name: "Flow", cluster: "Developer" },
  { name: "Catalyst", cluster: "Developer" },
  { name: "Sites", cluster: "Developer" },

  { name: "One", cluster: "Sales" },
  { name: "Workplace", cluster: "Collaboration" },
  { name: "Finance+", cluster: "Finance" },
  { name: "Marketing+", cluster: "Marketing" },
  { name: "CRM+", cluster: "Sales" },
];

export const TheSystem = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  const points = useMemo(() => {
    return PRODUCTS.map((p, i) => {
      const base = CLUSTERS[p.cluster];
      const spread = 10.5;
      const ox = (seeded(i) - 0.5) * spread;
      const oy = (seeded(i + 200) - 0.5) * spread;
      return {
        ...p,
        x: Math.min(92, Math.max(8, base.x + ox)),
        y: Math.min(88, Math.max(10, base.y + oy)),
        color: base.c,
        big: seeded(i + 900) > 0.86,
      };
    });
  }, []);

  return (
    <section id="system" data-tone="silicon" className="relative overflow-hidden bg-silicon-dark py-32">
      <div className="container relative">
        <div className="mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/70">SECTION 04 · THE SYSTEM</span>
          <h2 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-paper md:text-7xl">
            Build. <span className="italic text-grad-gold">Not buy.</span> Not borrow.
          </h2>
          <p className="mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/70">
            After the crash, the choice hardened into an operating system: build product-by-product, stack-by-stack,
            without acquisitions as shortcuts — and without investors as a clock you can’t control.
          </p>
        </div>

        <div className="relative h-[640px] overflow-hidden rounded-sm border border-border/40 bg-gradient-to-b from-silicon-dark via-background/60 to-background">
          {/* Starfield grain handled globally */}
          <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_35%_30%,hsl(var(--silicon-accent)/0.16),transparent_55%),radial-gradient(circle_at_70%_65%,hsl(var(--gold)/0.12),transparent_60%)]" />

          {/* Constellation lines (subtle, reactive) */}
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
            {points.map((p, i) => {
              const next = points[i + 1];
              if (!next) return null;
              const alpha = hovered ? (hovered === p.name || hovered === next.name ? 0.28 : 0.08) : 0.12;
              return (
                <line
                  key={`${p.name}-${next.name}`}
                  x1={p.x}
                  y1={p.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="hsl(var(--paper) / 0.55)"
                  strokeWidth="0.18"
                  opacity={alpha}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {points.map((p, i) => (
            <HoverCard key={p.name} openDelay={120} closeDelay={80}>
              <HoverCardTrigger asChild>
                <motion.button
                  type="button"
                  onMouseEnter={() => setHovered(p.name)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(p.name)}
                  onBlur={() => setHovered(null)}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: i * 0.015, duration: 0.5 }}
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
                  className="absolute flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={`${p.name} details`}
                >
                  <span
                    className={`block rounded-full ${p.big ? "h-2 w-2" : "h-1.5 w-1.5"} shadow-[0_0_28px_hsl(var(--gold)/0.18)]`}
                    style={{ background: p.color }}
                  />
                  <span className={`font-mono uppercase tracking-wider ${p.big ? "text-[11px]" : "text-[10px]"} text-paper/75`}>
                    {p.name}
                  </span>
                </motion.button>
              </HoverCardTrigger>
              <HoverCardContent className="border-border/40 bg-silicon-dark/95 text-paper shadow-[0_30px_80px_-20px_hsl(0_0%_0%/0.7)]">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/80">{p.cluster}</div>
                    <div className="mt-2 font-display text-2xl text-paper">{p.name}</div>
                    <div className="mt-2 font-serif-body text-sm italic text-paper/65">“Built here, not bought.”</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">Launch</div>
                    <div className="mt-2 font-mono text-sm text-paper/70">{p.year ?? "—"}</div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}

          {/* Center node */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="grid place-items-center rounded-full border border-gold/30 bg-soil-dark/30 px-5 py-5 shadow-[0_0_80px_hsl(var(--gold)/0.12)]">
              <div className="h-2 w-2 rounded-full bg-gold shadow-[0_0_30px_hsl(var(--gold))]" />
              <div className="mt-2 text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/85">Zoho OS</div>
                <div className="mt-1 font-serif-body text-xs italic text-paper/60">integrated by design</div>
              </div>
            </div>
          </div>

          {/* Footer line */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-6 border-t border-border/40 bg-background/40 px-6 py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">
              30 years · 50+ products · $0 raised
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45 md:block">
              hover a node
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-4">
          {[
            { k: "Products", v: "50+" },
            { k: "Users", v: "130M+" },
            { k: "Countries", v: "150+" },
            { k: "VC raised", v: "$0" },
          ].map((s) => (
            <div key={s.k} className="border-l-2 border-gold/50 pl-4">
              <div className="font-display text-4xl text-paper">{s.v}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">{s.k}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-sm border border-gold/25 bg-soil-mid/20 p-8">
          <p className="font-display text-2xl italic leading-snug text-paper md:text-3xl">
            If software is a craft, where do you find your <span className="text-grad-gold">apprentices</span>?
          </p>
        </div>
      </div>
    </section>
  );
};
