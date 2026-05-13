import { useMemo, useState } from "react";
import { BELIEF_ENGINE } from "@/data/story";

type Choice = "agree" | "disagree" | "unsure";

export const Philosophy = () => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Choice>>({});
  const item = BELIEF_ENGINE[index];
  const answer = answers[index];

  const aligned = useMemo(
    () => Object.values(answers).filter((value) => value === "disagree").length,
    [answers],
  );

  const recordAnswer = (value: Choice) => {
    setAnswers((current) => ({ ...current, [index]: value }));
  };

  return (
    <section id="beliefs" data-tone="mixed" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold/70">
            Section 09 · The Disagreement Engine
          </div>
          <h2 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">
            Don&apos;t hover a quote.
            <span className="block italic text-grad-gold">Take a position.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/72">
            This is not a quiz and it is not a gotcha. It is a structured disagreement table. Pick a position, reveal
            the contrast, and notice how often your instincts line up with his worldview.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-sm border border-paper/10 bg-black/20 p-6 reverse-shadow">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">
                belief {index + 1} / {BELIEF_ENGINE.length}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">
                aligned so far {aligned} / {BELIEF_ENGINE.length}
              </div>
            </div>

            <div className="mt-8 rounded-sm border border-gold/20 bg-soil-dark/40 p-6">
              <p className="font-display text-3xl italic leading-snug text-paper md:text-4xl">{item.statement}</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { key: "agree", label: "Agree" },
                { key: "disagree", label: "Disagree" },
                { key: "unsure", label: "Unsure" },
              ].map((option) => {
                const active = answer === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => recordAnswer(option.key as Choice)}
                    className={`rounded-sm border px-4 py-4 font-mono text-[10px] uppercase tracking-[0.3em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      active
                        ? "border-gold bg-gold text-soil-dark"
                        : "border-paper/10 bg-black/15 text-paper/72 hover:border-gold/35"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIndex((current) => Math.max(0, current - 1))}
                disabled={index === 0}
                className="rounded-sm border border-paper/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/70 transition hover:border-gold/35 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setIndex((current) => Math.min(BELIEF_ENGINE.length - 1, current + 1))}
                disabled={index === BELIEF_ENGINE.length - 1}
                className="rounded-sm border border-paper/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/70 transition hover:border-gold/35 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>

          <div className="rounded-sm border border-gold/20 bg-soil-mid/20 p-6 reverse-shadow">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">Revealed after selection</div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-sm border border-gold/20 bg-soil-dark/45 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">Sridhar's view</div>
                <p className="mt-3 font-serif-body text-sm leading-relaxed text-paper/74">{item.sridharView}</p>
              </article>
              <article className="rounded-sm border border-paper/10 bg-black/15 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">Conventional view</div>
                <p className="mt-3 font-serif-body text-sm leading-relaxed text-paper/68">{item.conventionalView}</p>
              </article>
            </div>

            <div className="mt-6 rounded-sm border border-paper/10 bg-black/15 p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">Reading the alignment</div>
              <p className="mt-3 font-display text-2xl italic leading-snug text-paper/86">
                You agreed with Sridhar on {aligned} of {BELIEF_ENGINE.length} ideas.
              </p>
              <p className="mt-3 font-serif-body text-sm leading-relaxed text-paper/60">
                In this engine, a conventional answer is treated as the statement itself. Disagreeing with the statement
                means you moved closer to Sridhar&apos;s stated position.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
