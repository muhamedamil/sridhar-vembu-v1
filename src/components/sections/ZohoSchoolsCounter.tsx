import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { SCHOOL_MIRROR } from "@/data/story";

const START_YEAR = 2005;
const END_YEAR = 2026;
const DEFAULT_YEAR = 2012;

const clampYear = (value: number) => Math.min(END_YEAR, Math.max(START_YEAR, Math.round(value)));

const describeMirror = (value: number) => {
  if (value <= START_YEAR + 1) {
    return `By ${value}, Zoho Schools had just opened the door. The experiment was still intimate, but the thesis was already visible: aptitude could be trained outside the degree-first conveyor belt.`;
  }

  const gap = value - START_YEAR;
  if (gap <= 6) {
    return `By the time you reached ${value}, Zoho Schools was already operating as a live counterexample. Small cohorts were being taught through paid work, not prestige filtering.`;
  }

  if (gap <= 13) {
    return `By ${value}, multiple cohorts had already moved through Zoho Schools. Rural students without conventional college trajectories were already entering production software environments.`;
  }

  return `If ${value} is your reference year, Zoho Schools had already spent years proving the model could compound: learn locally, build seriously, and bypass the prestige script without bypassing rigor.`;
};

const describeWindow = (value: number) => {
  if (value <= 2008) {
    return "Founding years. The signal is fragile but unmistakable.";
  }
  if (value <= 2014) {
    return "The apprenticeship model is no longer theoretical. It is staffing real work.";
  }
  if (value <= 2020) {
    return "The pipeline is compounding quietly while the rest of the market still argues about credentials.";
  }
  return "The model is mature enough to be undeniable, even if it remains culturally unconventional.";
};

export const ZohoSchoolsCounter = () => {
  const reduce = useReducedMotion();
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);

  const progress = useMemo(
    () => ((selectedYear - START_YEAR) / (END_YEAR - START_YEAR)) * 100,
    [selectedYear],
  );

  const story = useMemo(() => describeMirror(selectedYear), [selectedYear]);
  const windowNote = useMemo(() => describeWindow(selectedYear), [selectedYear]);
  const outputMode = selectedYear <= 2010 ? "early proof" : selectedYear <= 2018 ? "working system" : "compounded alternative";

  const handleYearChange = (value: number[]) => {
    setSelectedYear(clampYear(value[0] ?? DEFAULT_YEAR));
  };

  const nudgeYear = (direction: -1 | 1) => {
    setSelectedYear((current) => clampYear(current + direction));
  };

  return (
    <section id="schools" data-tone="soil" className="relative overflow-hidden bg-soil-mid py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,hsl(var(--gold)/0.12),transparent_28%),radial-gradient(circle_at_84%_78%,hsl(var(--field-bright)/0.12),transparent_26%)]" />
      <div className="container relative">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold/70">
            Section 06 · Where Were You In 2005?
          </div>
          <h2 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">
            A year scrubber,
            <span className="block italic text-grad-gold">not a dead input.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/76">
            {SCHOOL_MIRROR.helper}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-sm border border-gold/20 bg-soil-dark/45 p-6 reverse-shadow">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <label htmlFor="graduation-year-slider" className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/78">
                  {SCHOOL_MIRROR.prompt}
                </label>
                <div className="mt-4 flex items-end gap-3">
                  <motion.div
                    key={selectedYear}
                    initial={reduce ? false : { opacity: 0.55, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-6xl italic leading-none text-paper md:text-7xl"
                  >
                    {selectedYear}
                  </motion.div>
                  <div className="pb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-paper/48">selected year</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => nudgeYear(-1)}
                  disabled={selectedYear <= START_YEAR}
                  className="rounded-full border border-paper/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.32em] text-paper/72 transition hover:border-gold/40 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Earlier
                </button>
                <button
                  type="button"
                  onClick={() => nudgeYear(1)}
                  disabled={selectedYear >= END_YEAR}
                  className="rounded-full border border-paper/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.32em] text-paper/72 transition hover:border-gold/40 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Later
                </button>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-paper/10 bg-black/15 p-5">
              <Slider
                value={[selectedYear]}
                onValueChange={handleYearChange}
                min={START_YEAR}
                max={END_YEAR}
                step={1}
                id="graduation-year-slider"
                className="py-4"
                aria-label="Graduation year timeline"
                aria-valuemin={START_YEAR}
                aria-valuemax={END_YEAR}
                aria-valuenow={selectedYear}
              />
              <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.32em] text-paper/45">
                <span>{START_YEAR}</span>
                <span>{END_YEAR}</span>
              </div>
              <p className="mt-4 font-serif-body text-sm leading-relaxed text-paper/62">
                Drag on desktop, swipe on mobile, or use keyboard arrow keys once the thumb is focused.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-paper/10 bg-black/15 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">Mode</div>
                <div className="mt-3 font-display text-2xl italic text-paper">{outputMode}</div>
              </div>
              <div className="rounded-sm border border-paper/10 bg-black/15 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">Context window</div>
                <div className="mt-3 font-serif-body text-sm leading-relaxed text-paper/72">{windowNote}</div>
              </div>
            </div>

            <div className="mt-8 rounded-sm border border-gold/20 bg-soil-mid/20 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">Known fact</div>
              <p className="mt-3 font-serif-body text-sm leading-relaxed text-paper/72">
                Zoho Schools began in 2005, designed around paid practical training rather than degree filtering.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-paper/10 bg-black/20 p-6 reverse-shadow">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">Timeline mirror</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">Your year: {selectedYear}</div>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-paper/10 bg-ledger px-6 py-8">
              <div className="absolute inset-x-6 top-[38%] h-px bg-paper/18" />
              <div className="absolute inset-x-6 top-[38%] h-px bg-gradient-to-r from-gold/65 via-gold to-paper/20" style={{ width: `${progress}%` }} />

              <motion.div
                initial={false}
                animate={{ left: `calc(1.5rem + (100% - 3rem) * ${progress / 100})` }}
                transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[38%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/70 bg-gold shadow-[0_0_32px_hsl(var(--gold)/0.25)]"
              />

              <div className="flex items-start justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75">{START_YEAR}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/48">{END_YEAR}</div>
              </div>

              <div className="mt-16 grid gap-4 md:grid-cols-3">
                <div className="rounded-sm border border-paper/10 bg-black/15 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper/45">Anchor</div>
                  <div className="mt-3 font-display text-2xl italic text-paper">2005</div>
                  <p className="mt-2 font-serif-body text-sm leading-relaxed text-paper/68">Zoho Schools starts.</p>
                </div>
                <div className="rounded-sm border border-gold/20 bg-gold/8 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold/75">Selected marker</div>
                  <div className="mt-3 font-display text-2xl italic text-paper">{selectedYear}</div>
                  <p className="mt-2 font-serif-body text-sm leading-relaxed text-paper/72">
                    {selectedYear - START_YEAR} years after the first cohort.
                  </p>
                </div>
                <div className="rounded-sm border border-paper/10 bg-black/15 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper/45">Distance</div>
                  <div className="mt-3 font-display text-2xl italic text-paper">{Math.round(progress)}%</div>
                  <p className="mt-2 font-serif-body text-sm leading-relaxed text-paper/68">
                    How far the apprenticeship model had already traveled by then.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-sm border border-gold/20 bg-soil-mid/20 p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/78">Contextualized output</div>
              <motion.p
                key={selectedYear}
                initial={reduce ? false : { opacity: 0.55, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.24 }}
                className="mt-3 font-display text-2xl italic leading-snug text-paper md:text-3xl"
              >
                {story}
              </motion.p>
            </div>

            <p className="mt-5 font-serif-body text-sm leading-relaxed text-paper/58">
              This is a narrative comparison, not a cohort-size claim about a specific graduating class. The timeline is
              grounded in the known 2005 launch year and updates instantly as you scrub.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
