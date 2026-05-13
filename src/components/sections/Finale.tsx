import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CLAY_WALL_SEEDS, SOURCES } from "@/data/story";

type Tile = { id: string; text: string };

const STORAGE_KEY = "sridhar-vembu-clay-wall";

const sanitize = (value: string) => value.replace(/\s+/g, " ").trim().slice(0, 140);

export const Finale = () => {
  const reduce = useReducedMotion();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [tiles, setTiles] = useState<Tile[]>(() =>
    CLAY_WALL_SEEDS.map((text, index) => ({ id: `seed-${index}`, text })),
  );

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return;
      }
      const parsed = JSON.parse(stored) as Tile[];
      if (Array.isArray(parsed) && parsed.every((tile) => typeof tile.text === "string" && typeof tile.id === "string")) {
        setTiles(parsed);
      }
    } catch {
      // Local storage is optional.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tiles));
    } catch {
      // Ignore write failures and keep the in-memory wall.
    }
  }, [tiles]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = sanitize(message);

    if (!next) {
      setError("Write a short message before pressing the clay into the wall.");
      return;
    }

    setTiles((current) => [{ id: `${Date.now()}`, text: next }, ...current].slice(0, 18));
    setMessage("");
    setError("");
  };

  const wallTiles = useMemo(() => (tiles.length ? tiles : [{ id: "empty", text: "The wall is waiting for the first mark." }]), [tiles]);

  return (
    <section id="finale" data-tone="soil" className="relative overflow-hidden bg-grad-dawn py-24 md:py-32">
      <div className="container">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold/72">Section 11 · Clay Wall Finale</div>
          <h2 className="mt-4 font-display text-5xl leading-tight text-paper md:text-8xl">
            The signal from the soil
            <span className="block italic text-grad-gold">should feel touchable.</span>
          </h2>
          <p className="mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/74">
            The old star wall is replaced with a tactile wall of clay notes. This implementation uses local persistence
            as a graceful fallback, so the interaction still works even without a remote store.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-sm border border-gold/20 bg-soil-dark/45 p-6 reverse-shadow">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/78">Press a tile into the wall</div>
            <form onSubmit={submit} className="mt-5">
              <label htmlFor="clay-message" className="sr-only">
                Your message for the clay wall
              </label>
              <textarea
                id="clay-message"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value.slice(0, 200));
                  if (error) {
                    setError("");
                  }
                }}
                maxLength={200}
                rows={5}
                placeholder="What part of this reversal stays with you?"
                className="w-full rounded-sm border border-gold/25 bg-black/15 px-4 py-4 font-serif-body text-paper placeholder:text-paper/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
              <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/45">
                <span>{sanitize(message).length}/140 kept</span>
                <span>local fallback enabled</span>
              </div>
              {error && <p className="mt-3 text-sm text-[#f7b1a5]">{error}</p>}
              <button
                type="submit"
                className="mt-5 rounded-sm bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-soil-dark transition hover:bg-gold/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Press into wall
              </button>
            </form>

            <div className="mt-8 rounded-sm border border-paper/10 bg-black/15 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">Safety and behavior</div>
              <ul className="mt-3 space-y-2 font-serif-body text-sm leading-relaxed text-paper/68">
                <li>Input is length-limited and sanitized before display.</li>
                <li>Messages render as text only, so unsafe markup is not executed.</li>
                <li>If persistent storage fails, the wall still works for the session.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-sm border border-paper/10 bg-clay p-6 reverse-shadow">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">Growing wall</div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wallTiles.map((tile, index) => (
                <motion.article
                  key={tile.id}
                  initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: reduce ? 0 : 0.28, delay: reduce ? 0 : Math.min(index * 0.03, 0.18) }}
                  className="min-h-32 rounded-[1.2rem] border border-[#3b2416] bg-[#8d5b3d]/85 p-5 text-[#f7ecda] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_32px_rgba(0,0,0,0.28)]"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#f1d7b6]/72">clay mark</div>
                  <p className="mt-4 font-serif-body text-sm leading-relaxed">{tile.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-gold/20 pt-8 md:grid-cols-3">
          <div>
            <div className="font-display text-2xl italic text-grad-gold">Brokai Labs</div>
            <p className="mt-2 font-serif-body text-sm leading-relaxed text-paper/62">
              A tribute framed as an editorial argument about time horizons, sovereignty, and reversed ambition.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">Subject</div>
            <p className="mt-2 font-serif-body text-sm leading-relaxed text-paper/66">
              Sridhar Vembu, founder and chief scientist of Zoho Corporation.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">Source buckets</div>
            <ul className="mt-2 space-y-1 font-serif-body text-sm leading-relaxed text-paper/62">
              {SOURCES.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
