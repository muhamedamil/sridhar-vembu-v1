import { motion } from "framer-motion";

const ACHIEVEMENTS = [
  { title: "Bootstrapped compounding", body: "A multi‑billion‑dollar SaaS suite built over decades — no VC clock, no IPO theater, no acquisition shortcut." },
  { title: "Rural-first employment", body: "Proving you can ship world-class software from non‑metro India — and hire locally at scale." },
  { title: "Zoho Schools impact", body: "A paid learn‑and‑work pipeline that strips marks and degrees as gatekeepers — evaluating people by proof." },
  { title: "Sovereignty posture", body: "Full‑stack ownership as a craft choice and a control choice: code, data, and long time horizons." },
];

const CRITIQUES = [
  {
    title: "Political alignment",
    body: "Public appearances at RSS/BJP-linked events and alignment with nationalist economic ideas have drawn critique from parts of the tech community.",
    src: "Public reporting",
  },
  {
    title: "Internal dissent",
    body: "A former employee resigned after alleging a hostile response to criticism of RSS on internal forums, raising questions about ideological comfort inside the company.",
    src: "Public reporting",
  },
  {
    title: "Divorce proceedings (ongoing)",
    body: "In a high-stakes California divorce case, his estranged wife alleged large transfers of Zoho shareholding to relatives in India without her knowledge; a court ordered a bond of about $1.7B while the case proceeds.",
    src: "Court filings, public reporting",
  },
];

export const Tension = () => {
  return (
    <section id="tension" data-tone="soil" className="relative overflow-hidden bg-paper py-32 text-soil-dark">
      <div className="container relative max-w-5xl">
        <div className="border-y-4 border-double border-soil-dark py-6 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em]">SECTION 10 · TENSION / CONTRADICTION</div>
          <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">The Complicated Man</h2>
          <div className="mt-3 font-serif-body italic">No celebration. No condemnation. Just the record.</div>
        </div>

        <div className="relative mt-12 grid gap-10 md:grid-cols-2">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: [0.2, 1, 0.2, 1] }}
          >
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] opacity-70">Achievements &amp; ambitions</div>
            <div className="space-y-6">
              {ACHIEVEMENTS.map((a) => (
                <article key={a.title} className="border-l-2 border-soil-dark/50 pl-5">
                  <h3 className="font-display text-2xl font-bold">{a.title}</h3>
                  <p className="mt-2 font-serif-body text-base leading-relaxed opacity-90">{a.body}</p>
                </article>
              ))}
            </div>
          </motion.div>

          {/* Critiques */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: [0.2, 1, 0.2, 1] }}
          >
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] opacity-70">Critiques &amp; cases</div>
            <div className="space-y-6">
              {CRITIQUES.map((t) => (
                <article key={t.title} className="border-l-2 border-soil-dark/50 pl-5">
                  <h3 className="font-display text-2xl font-bold">{t.title}</h3>
                  <p className="mt-2 font-serif-body text-base leading-relaxed opacity-90">{t.body}</p>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">Source · {t.src}</div>
                </article>
              ))}
            </div>
          </motion.div>

          {/* Paper texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background:radial-gradient(circle_at_30%_30%,black,transparent_55%),radial-gradient(circle_at_70%_70%,black,transparent_55%)]" />
        </div>

        <p className="mt-14 border-t border-soil-dark/40 pt-6 text-center font-serif-body text-sm italic opacity-70">
          We present this not to diminish, but because complexity is part of every real story.
        </p>
      </div>
    </section>
  );
};
