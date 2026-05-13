import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  brokenWord?: string;
  brokenChar?: string;
};

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

export const BrokenTypewriter = ({
  text,
  className,
  brokenWord = "no",
  brokenChar = "n",
}: Props) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? text : "");
  const started = useRef(false);

  const lower = useMemo(() => text.toLowerCase(), [text]);
  const brokenAt = useMemo(() => lower.indexOf(brokenWord.toLowerCase()), [lower, brokenWord]);

  useEffect(() => {
    if (reduce) return;
    if (started.current) return;
    started.current = true;

    const run = async () => {
      const baseDelay = 18;

      for (let i = 0; i < text.length; i++) {
        // Inject a human "wrongness": double-tap the broken key once on the target word.
        if (brokenAt !== -1 && i === brokenAt) {
          setShown(text.slice(0, i + 1)); // first char of word (usually "n")
          await wait(180);
          setShown(text.slice(0, i) + brokenChar + text[i]); // accidental double key
          await wait(240);
          setShown(text.slice(0, i + 1));
          await wait(140);
        }

        setShown(text.slice(0, i + 1));
        await wait(baseDelay + Math.min(22, i * 0.4));
      }
    };

    void run();
  }, [brokenAt, brokenChar, brokenWord, reduce, text]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
      {!reduce && <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-px bg-paper/35 align-[-0.12em] animate-pulse" />}
    </span>
  );
};

