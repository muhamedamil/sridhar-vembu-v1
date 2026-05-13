import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const MIN_MS = 1350;
const TAMIL_PROMPT = "எந்த திசையில் நடக்கிறாய்?";
const ENGLISH_PROMPT = "Which direction are you walking?";

export const PreDawnLoader = ({ onComplete }: { onComplete: () => void }) => {
  const reduce = useReducedMotion();
  const startedAt = useRef<number>(typeof performance !== "undefined" ? performance.now() : Date.now());

  useEffect(() => {
    let cancelled = false;

    const finish = () => {
      const elapsed = (typeof performance !== "undefined" ? performance.now() : Date.now()) - startedAt.current;
      const remaining = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => {
        if (!cancelled) {
          onComplete();
        }
      }, remaining);
    };

    const waitForPage = async () => {
      try {
        if ("fonts" in document) {
          await document.fonts.ready;
        }
      } catch {
        // Font readiness is optional.
      }

      if (document.readyState === "complete") {
        finish();
      } else {
        window.addEventListener("load", finish, { once: true });
      }
    };

    void waitForPage();
    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <motion.div
      aria-label="Loading"
      className="fixed inset-0 z-[60] overflow-hidden bg-soil-dark"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
    >
      <div className="absolute inset-0 bg-grad-dawn opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,hsl(var(--gold)/0.16),transparent_42%)]" />
      <div className="absolute inset-0 grain" />

      <div className="relative flex h-full flex-col justify-between px-6 py-10 md:px-10 md:py-12">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">
          <span>First lesson</span>
          <span>Reverse walk</span>
        </div>

        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.65 }}
            className="font-tamil text-3xl leading-relaxed text-paper md:text-5xl"
          >
            {TAMIL_PROMPT}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.12, duration: reduce ? 0 : 0.65 }}
            className="mt-5 font-display text-2xl italic text-grad-gold md:text-4xl"
          >
            {ENGLISH_PROMPT}
          </motion.p>

          <div className="mx-auto mt-10 max-w-xl">
            <div className="h-px overflow-hidden rounded-full bg-paper/10">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-gold to-paper/70"
                initial={{ width: "14%" }}
                animate={reduce ? { width: "92%" } : { width: ["14%", "38%", "64%", "92%"] }}
                transition={{ duration: reduce ? 0 : 1.35, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">
          <span>soil before silicon</span>
          <span>silicon before soil</span>
        </div>
      </div>
    </motion.div>
  );
};
