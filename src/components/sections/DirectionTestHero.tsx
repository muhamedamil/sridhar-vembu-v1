import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";

type DirectionIntent = "valley" | "neutral" | "soil";
type CommittedDirection = "valley" | "soil" | null;
type ReversalPhase = "idle" | "exploring" | "committed" | "expected-path" | "pause" | "reversal" | "thesis";

type HeroContent = {
  status: string;
  eyebrow: string;
  title: string;
  body: string;
  prompt: string;
  pathTitle: string;
  pathBody: string;
  pathSteps: string[];
  afterTitle: string;
  afterHeadline: string;
  afterBody: string;
};

const TAMIL_PROMPT = "எந்த திசையில் ambition நகர வேண்டும்?";
const ENGLISH_PROMPT = "Which direction does ambition move?";
const RIGHT_PATH = ["Village", "City", "IIT", "Princeton", "Silicon Valley", "IPO"];
const LEFT_PATH = ["Silicon Valley", "Tamil Nadu", "Tenkasi", "Mathalamparai"];
const RIGHT_CONSEQUENCES = ["Capital", "Velocity", "Visibility", "Exit logic"];
const LEFT_CONSEQUENCES = ["Autonomy", "Locality", "Apprenticeship", "Permanence"];
const RIGHT_WORLD_LABELS = ["VC", "Scale fast", "Prestige", "IPO", "Exit"];
const LEFT_WORLD_LABELS = ["Soil", "Schools", "Patience", "Build forever", "Locality"];
const RIGHT_COMMIT_THRESHOLD = 0.56;
const LEFT_COMMIT_THRESHOLD = -0.56;
const RIGHT_INTENT_THRESHOLD = 0.18;
const LEFT_INTENT_THRESHOLD = -0.18;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const deriveIntent = (value: number): DirectionIntent => {
  if (value >= RIGHT_INTENT_THRESHOLD) {
    return "valley";
  }

  if (value <= LEFT_INTENT_THRESHOLD) {
    return "soil";
  }

  return "neutral";
};

const applyResistance = (value: number) => {
  if (value >= 0) {
    const eased = value < 0.5 ? value * 0.92 : 0.46 + (value - 0.5) * 0.48;
    return clamp(eased, 0, 0.94);
  }

  const magnitude = Math.abs(value);
  const eased = magnitude < 0.38 ? magnitude * 0.68 : 0.2584 + (magnitude - 0.38) * 1.08;
  return -clamp(eased, 0, 0.94);
};

const toPercent = (value: number) => `${((value + 1) / 2) * 100}%`;

const HERO_COPY = {
  neutral: {
    status: "Unresolved.",
    eyebrow: "Every system has a default path.",
    title: "Your hand is choosing before your mind explains it.",
    body: "The valley promises scale. The soil asks what ambition is for.",
    prompt: "Lean either way. The world, language, and stakes should shift with you.",
    pathTitle: "Path under your hands",
    pathBody: "Waiting for direction.",
    pathSteps: ["Waiting for direction"],
    afterTitle: "After the turn",
    afterHeadline: "The story has not chosen its shape yet.",
    afterBody: "A conventional ascent and a rooted return are both still in play.",
  },
  valley: {
    status: "Expected ascent.",
    eyebrow: "This is the direction ambition is trained to move.",
    title: "Capital. Visibility. Scale. Exit.",
    body: "Village becomes city. City becomes prestige. Prestige becomes the script.",
    prompt: "It feels efficient because the system was designed to make it feel inevitable.",
    pathTitle: "Path under your hands",
    pathBody: "Village → City → IIT → Princeton → Silicon Valley → IPO",
    pathSteps: RIGHT_PATH,
    afterTitle: "What this path optimizes",
    afterHeadline: "Attractive. Fast. Slightly unstable.",
    afterBody: "Capital, velocity, and prestige rise quickly, but the work bends toward exit logic.",
  },
  soil: {
    status: "Rooted instinct.",
    eyebrow: "This direction is slower.",
    title: "But it keeps ownership of the work.",
    body: "Silicon Valley gives way to Tamil Nadu, then to Tenkasi, then to the village itself.",
    prompt: "Not retreat. A choice to move ambition closer to apprenticeship, schools, and soil.",
    pathTitle: "Path under your hands",
    pathBody: "Silicon Valley → Tamil Nadu → Tenkasi → Mathalamparai",
    pathSteps: LEFT_PATH,
    afterTitle: "What this path protects",
    afterHeadline: "Slower. Stronger. More owned.",
    afterBody: "Autonomy, locality, and permanence become the point instead of the byproduct.",
  },
  valleyCommitted: {
    status: "Expected path chosen.",
    eyebrow: "That was the expected path.",
    title: "The default script still makes sense from inside itself.",
    body: "You were not wrong to feel its pull. That attraction is part of the lesson.",
    prompt: "Watch what happens when success is not allowed to end in exit.",
    pathTitle: "Path under your hands",
    pathBody: "That was the expected path.",
    pathSteps: RIGHT_PATH,
    afterTitle: "After the turn",
    afterHeadline: "The system will not be punished. It will be answered.",
    afterBody: "The reversal is not anti-success. It is a different definition of where success should settle.",
  },
  soilCommitted: {
    status: "Counter-script chosen.",
    eyebrow: "You moved against the default script.",
    title: "That was his direction too.",
    body: "The left path does not need a dramatic correction because it already rejects the usual metric.",
    prompt: "Stay with it long enough and the meaning of ambition changes shape.",
    pathTitle: "Path under your hands",
    pathBody: "You moved against the default script.",
    pathSteps: LEFT_PATH,
    afterTitle: "After the turn",
    afterHeadline: "That was not retreat.",
    afterBody: "It was the first clue that ambition could become local, durable, and shared.",
  },
  thesis: {
    status: "Thesis.",
    eyebrow: "He went the other way.",
    title: "Not after success. As the point of it.",
    body: "Sridhar Vembu. Founder of Zoho. $6B. No VC. No IPO. No exit.",
    prompt: "He moved from Silicon Valley to a Tamil village because the work itself belonged there.",
    pathTitle: "Path under your hands",
    pathBody: "Silicon Valley → Tamil Nadu → Tenkasi → Mathalamparai",
    pathSteps: LEFT_PATH,
    afterTitle: "After the turn",
    afterHeadline: "He went the other way.",
    afterBody:
      "Sridhar Vembu. Founder of Zoho. $6B. No VC. No IPO. No exit. He moved from Silicon Valley to a Tamil village, not after success, but as the point of it.",
  },
} satisfies Record<string, HeroContent>;

const getHeroContent = (
  directionIntent: DirectionIntent,
  committedDirection: CommittedDirection,
  reversalPhase: ReversalPhase,
  narrativeBeat: number,
): HeroContent => {
  if (reversalPhase === "thesis") {
    return HERO_COPY.thesis;
  }

  if (committedDirection === "valley") {
    if (reversalPhase === "expected-path") {
      return {
        ...HERO_COPY.valleyCommitted,
        title: "That was the expected path.",
        body: "The polished route to prestige is fully visible now: capital, legitimacy, and scale on rails.",
        afterHeadline: "That was the expected path.",
        afterBody: "It attracts for good reasons. The site is showing you those reasons before it overturns them.",
      };
    }

    if (reversalPhase === "pause") {
      return {
        ...HERO_COPY.valleyCommitted,
        title: "He refused it.",
        body: "The familiar route freezes. The copy cools. The certainty starts to wobble.",
        afterHeadline: "He refused it.",
        afterBody: "He did not reject ambition. He rejected the idea that ambition had to terminate in capital markets.",
      };
    }

    if (reversalPhase === "reversal") {
      return {
        ...HERO_COPY.valleyCommitted,
        status: "Reversing.",
        eyebrow: "The expected system is destabilizing.",
        title: "He reversed it.",
        body: "The center of gravity moves back toward soil, schools, and ownership of the work.",
        prompt: "The lesson is happening in front of you now: success can turn away from the valley instead of ending there.",
        afterHeadline: "He reversed it.",
        afterBody: "He built without asking permission, then moved the work toward locality and permanence.",
      };
    }

    return HERO_COPY.valleyCommitted;
  }

  if (committedDirection === "soil") {
    if (reversalPhase === "pause" && narrativeBeat <= 1) {
      return {
        ...HERO_COPY.soilCommitted,
        title: "That was his direction too.",
        body: "You moved toward the rooted path early, before the system could make the default feel final.",
        afterHeadline: "That was his direction too.",
        afterBody: "The village is not a backdrop here. It becomes part of the operating thesis.",
      };
    }

    if (reversalPhase === "pause" && narrativeBeat >= 2) {
      return {
        ...HERO_COPY.soilCommitted,
        title: "Not retreat. A different definition of ambition.",
        body: "The left path settles instead of breaking. Warmth replaces spectacle. Ownership replaces exit logic.",
        afterHeadline: "A different definition of ambition.",
        afterBody: "The work gets slower in tempo and stronger in consequences: local talent, schools, and durable independence.",
      };
    }

    return HERO_COPY.soilCommitted;
  }

  if (directionIntent === "valley") {
    return HERO_COPY.valley;
  }

  if (directionIntent === "soil") {
    return HERO_COPY.soil;
  }

  return HERO_COPY.neutral;
};

export const DirectionTestHero = () => {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceIdRef = useRef(0);
  const mountedRef = useRef(true);
  const [directionIntent, setDirectionIntent] = useState<DirectionIntent>("neutral");
  const [committedDirection, setCommittedDirection] = useState<CommittedDirection>(null);
  const [reversalPhase, setReversalPhase] = useState<ReversalPhase>("idle");
  const [narrativeBeat, setNarrativeBeat] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dragProgressState, setDragProgressState] = useState(0);

  const rawProgress = useMotionValue(0);
  const dragProgress = useSpring(rawProgress, {
    stiffness: shouldReduceMotion ? 420 : 180,
    damping: shouldReduceMotion ? 44 : 24,
    mass: shouldReduceMotion ? 0.3 : 0.7,
  });

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      sequenceIdRef.current += 1;
    };
  }, []);

  useMotionValueEvent(dragProgress, "change", (value) => {
    const next = clamp(value, -1, 1);
    setDragProgressState(next);

    if (committedDirection) {
      return;
    }

    const nextIntent = deriveIntent(next);
    setDirectionIntent(nextIntent);

    if (dragging || nextIntent !== "neutral") {
      setReversalPhase(nextIntent === "neutral" ? "idle" : "exploring");
    } else {
      setReversalPhase("idle");
    }
  });

  useEffect(() => {
    if (shouldReduceMotion || dragging || committedDirection || reversalPhase === "thesis") {
      setShowHint(false);
      return;
    }

    const timer = window.setTimeout(() => setShowHint(true), 2600);
    return () => window.clearTimeout(timer);
  }, [committedDirection, dragging, reversalPhase, shouldReduceMotion]);

  const valleyIntensity = clamp(dragProgressState / 0.84, 0, 1);
  const soilIntensity = clamp(-dragProgressState / 0.84, 0, 1);
  const unresolvedIntensity = 1 - Math.max(valleyIntensity, soilIntensity);
  const rightOvercommit = clamp((dragProgressState - 0.62) / 0.26, 0, 1);
  const leftSettling = clamp((-dragProgressState - 0.48) / 0.36, 0, 1);
  const content = getHeroContent(directionIntent, committedDirection, reversalPhase, narrativeBeat);
  const activePathSteps = content.pathSteps;
  const currentThumbPosition = toPercent(dragProgressState);

  const stopInteractiveSequence = () => {
    sequenceIdRef.current += 1;
  };

  const animateProgress = async (target: number, duration: number, ease: number[]) => {
    await animate(rawProgress, target, {
      duration: shouldReduceMotion ? 0.01 : duration,
      ease,
    }).finished;
  };

  const updateProgressFromClientX = (clientX: number) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const rect = track.getBoundingClientRect();
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const normalized = ratio * 2 - 1;
    rawProgress.set(applyResistance(normalized));
  };

  const resetInteraction = async () => {
    stopInteractiveSequence();
    setDragging(false);
    setShowHint(false);
    setNarrativeBeat(0);
    setCommittedDirection(null);
    setDirectionIntent("neutral");
    setReversalPhase("idle");
    await animateProgress(0, 0.42, [0.22, 1, 0.36, 1]);
  };

  const commitDirection = async (direction: Exclude<CommittedDirection, null>) => {
    const runId = sequenceIdRef.current + 1;
    sequenceIdRef.current = runId;
    setDragging(false);
    setShowHint(false);
    setCommittedDirection(direction);
    setDirectionIntent(direction);
    setNarrativeBeat(0);
    setReversalPhase("committed");

    if (direction === "valley") {
      await animateProgress(0.82, 0.5, [0.22, 1, 0.36, 1]);
      if (!mountedRef.current || sequenceIdRef.current !== runId) {
        return;
      }

      setReversalPhase("expected-path");
      setNarrativeBeat(1);
      await sleep(shouldReduceMotion ? 40 : 650);
      if (!mountedRef.current || sequenceIdRef.current !== runId) {
        return;
      }

      setReversalPhase("pause");
      setNarrativeBeat(2);
      await sleep(shouldReduceMotion ? 40 : 700);
      if (!mountedRef.current || sequenceIdRef.current !== runId) {
        return;
      }

      setReversalPhase("reversal");
      setNarrativeBeat(3);
      await animateProgress(0.9, 0.18, [0.2, 1, 0.3, 1]);
      if (!mountedRef.current || sequenceIdRef.current !== runId) {
        return;
      }

      await animateProgress(-0.84, 1.2, [0.76, 0, 0.24, 1]);
      if (!mountedRef.current || sequenceIdRef.current !== runId) {
        return;
      }

      setReversalPhase("thesis");
      setNarrativeBeat(4);
      await animateProgress(-0.58, 0.5, [0.22, 1, 0.36, 1]);
      return;
    }

    await animateProgress(-0.78, 0.56, [0.22, 1, 0.36, 1]);
    if (!mountedRef.current || sequenceIdRef.current !== runId) {
      return;
    }

    setReversalPhase("pause");
    setNarrativeBeat(1);
    await sleep(shouldReduceMotion ? 40 : 620);
    if (!mountedRef.current || sequenceIdRef.current !== runId) {
      return;
    }

    setNarrativeBeat(2);
    await sleep(shouldReduceMotion ? 40 : 620);
    if (!mountedRef.current || sequenceIdRef.current !== runId) {
      return;
    }

    setReversalPhase("thesis");
    setNarrativeBeat(3);
    await animateProgress(-0.56, 0.48, [0.22, 1, 0.36, 1]);
  };

  const maybeCommitFromProgress = async (value: number) => {
    if (value >= RIGHT_COMMIT_THRESHOLD) {
      await commitDirection("valley");
      return;
    }

    if (value <= LEFT_COMMIT_THRESHOLD) {
      await commitDirection("soil");
      return;
    }

    setDirectionIntent("neutral");
    setReversalPhase("idle");
    await animateProgress(0, 0.48, [0.22, 1, 0.36, 1]);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (committedDirection || reversalPhase === "thesis") {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    setIsKeyboardMode(false);
    updateProgressFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging || committedDirection || reversalPhase === "thesis") {
      return;
    }

    updateProgressFromClientX(event.clientX);
  };

  const handlePointerUp = async (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!dragging || committedDirection || reversalPhase === "thesis") {
      setDragging(false);
      return;
    }

    setDragging(false);
    await maybeCommitFromProgress(rawProgress.get());
  };

  const handleTrackClick = async (event: MouseEvent<HTMLDivElement>) => {
    if (dragging || committedDirection || reversalPhase === "thesis") {
      return;
    }

    updateProgressFromClientX(event.clientX);
    await maybeCommitFromProgress(rawProgress.get());
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLButtonElement>) => {
    setIsKeyboardMode(true);

    if (event.key === "Escape") {
      event.preventDefault();
      await resetInteraction();
      return;
    }

    if (committedDirection || reversalPhase === "thesis") {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      rawProgress.set(clamp(rawProgress.get() + 0.18, -1, 1));
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      rawProgress.set(clamp(rawProgress.get() - 0.18, -1, 1));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const currentIntent = deriveIntent(rawProgress.get());
      if (currentIntent === "valley") {
        await commitDirection("valley");
        return;
      }

      if (currentIntent === "soil") {
        await commitDirection("soil");
        return;
      }

      await animateProgress(rawProgress.get() >= 0 ? 0.44 : -0.44, 0.24, [0.22, 1, 0.36, 1]);
    }
  };

  const handleNudge = async (direction: "left" | "right") => {
    if (committedDirection || reversalPhase === "thesis") {
      return;
    }

    setIsKeyboardMode(false);
    const nextValue = clamp(rawProgress.get() + (direction === "right" ? 0.26 : -0.26), -1, 1);
    rawProgress.set(nextValue);

    if (shouldReduceMotion) {
      await maybeCommitFromProgress(nextValue);
    }
  };

  const interactivePrompt = useMemo(() => {
    if (shouldReduceMotion && !committedDirection && reversalPhase !== "thesis") {
      return "Reduced motion: choose a path below to reveal the branch without drag choreography.";
    }

    if (reversalPhase === "expected-path") {
      return "Beat 1: the expected path freezes in place.";
    }

    if (reversalPhase === "pause" && committedDirection === "valley") {
      return "Beat 2: the system destabilizes because he refused it.";
    }

    if (reversalPhase === "reversal") {
      return "Beat 3: the path turns back toward soil.";
    }

    if (reversalPhase === "pause" && committedDirection === "soil") {
      return narrativeBeat >= 2
        ? "The rooted path settles into a different definition of ambition."
        : "You chose the counter-script before the system could correct you.";
    }

    if (reversalPhase === "thesis") {
      return "The thesis lands only after the branch resolves.";
    }

    return isKeyboardMode ? "Arrow keys to lean. Enter or Space to commit. Escape resets." : content.prompt;
  }, [committedDirection, content.prompt, isKeyboardMode, narrativeBeat, reversalPhase, shouldReduceMotion]);

  return (
    <section id="hero" data-tone="mixed" className="relative overflow-hidden border-b border-paper/10 bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(120deg, rgba(8,14,28,${0.78 + valleyIntensity * 0.14}) 0%, rgba(18,29,52,${0.52 + valleyIntensity * 0.18}) 38%, rgba(54,37,20,${0.34 + soilIntensity * 0.24}) 62%, rgba(24,16,10,0.95) 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: 0.28 + unresolvedIntensity * 0.16,
          backgroundImage:
            "radial-gradient(circle at 18% 20%, hsl(var(--silicon-accent) / 0.18), transparent 24%), radial-gradient(circle at 84% 78%, hsl(var(--gold) / 0.16), transparent 30%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={
          reversalPhase === "expected-path" || reversalPhase === "reversal"
            ? { x: [0, -6, 7, -4, 4, 0] }
            : { x: 0 }
        }
        transition={
          reversalPhase === "expected-path" || reversalPhase === "reversal"
            ? { duration: 0.45, repeat: shouldReduceMotion ? 0 : Infinity, repeatType: "mirror" }
            : { duration: 0.2 }
        }
        style={{
          opacity: 0.14 + valleyIntensity * 0.42,
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,${0.06 + valleyIntensity * 0.12}) 1px, transparent 1px), linear-gradient(180deg, rgba(149,190,255,${0.06 + valleyIntensity * 0.1}) 1px, transparent 1px)`,
          backgroundSize: `${88 - valleyIntensity * 24}px ${88 - valleyIntensity * 24}px`,
          maskImage: "linear-gradient(90deg, black 0%, black 56%, transparent 84%)",
          transform: `translateX(${dragProgressState * 18}px) skewX(${rightOvercommit * 4}deg)`,
          filter: `blur(${rightOvercommit * 1.1}px) saturate(${1 + valleyIntensity * 0.18})`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: 0.15 + soilIntensity * 0.54,
          backgroundImage:
            "repeating-linear-gradient(142deg, rgba(151,173,80,0.22) 0 2px, transparent 2px 36px), repeating-linear-gradient(44deg, rgba(100,72,37,0.16) 0 1px, transparent 1px 34px), linear-gradient(140deg, rgba(228,190,94,0.18), transparent 32%)",
          maskImage: "linear-gradient(90deg, transparent 18%, black 48%, black 100%)",
          transform: `translateX(${dragProgressState * 10}px) scale(${1 - soilIntensity * 0.02})`,
          filter: `saturate(${1 + soilIntensity * 0.32}) blur(${(1 - leftSettling) * 0.8}px)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
        style={{
          background: `linear-gradient(180deg, transparent, rgba(228,190,94,${0.18 + Math.max(valleyIntensity, soilIntensity) * 0.32}), transparent)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: 0.12 + leftSettling * 0.3,
          background:
            "radial-gradient(circle at 66% 58%, hsl(var(--gold) / 0.24), transparent 18%), radial-gradient(circle at 74% 74%, hsl(var(--field-bright) / 0.14), transparent 20%)",
        }}
      />
      <div className="absolute inset-0 grain" />

      <div className="container relative z-10 flex min-h-screen flex-col justify-between py-6 md:py-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-4xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.38em] text-paper/55">Section 01 · The Direction Test</div>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
              className="mt-5 font-tamil text-2xl leading-relaxed text-paper md:text-5xl"
            >
              {TAMIL_PROMPT}
            </motion.p>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.12 }}
              className="mt-3 font-display text-2xl italic text-grad-gold md:text-4xl"
            >
              {ENGLISH_PROMPT}
            </motion.p>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 max-w-3xl"
              aria-live="polite"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/52">{content.eyebrow}</div>
              <h2 className="mt-3 font-display text-[clamp(2.8rem,7vw,5.8rem)] italic leading-[0.96] text-paper">
                {content.title}
              </h2>
              <p className="mt-5 max-w-2xl font-serif-body text-base leading-relaxed text-paper/78 md:text-lg">
                {content.body}
              </p>
            </motion.div>
          </div>

          <div className="max-w-[18rem] text-left md:text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/42">direction of ambition</div>
            <div className="mt-3 font-display text-3xl italic text-paper md:text-4xl">{content.status}</div>
            <p className="mt-4 font-serif-body text-sm leading-relaxed text-paper/62">{interactivePrompt}</p>
          </div>
        </div>

        <div className="grid gap-8 pb-10 pt-10 lg:grid-cols-[0.92fr_1.2fr_0.92fr] lg:items-end">
          <motion.div
            className="space-y-4"
            animate={{ y: shouldReduceMotion ? 0 : soilIntensity * -8, opacity: 0.66 + soilIntensity * 0.34 }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">Consequence card · rooted path</div>
            <div className="rounded-[1.3rem] border border-gold/20 bg-soil-dark/50 p-5 reverse-shadow backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-3xl italic text-paper md:text-4xl">What this path protects</div>
                  <p className="mt-3 max-w-sm font-serif-body text-sm leading-relaxed text-paper/70">
                    Slower to enter. Harder to market. Stronger once it settles.
                  </p>
                </div>
                <div className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/90">
                  {Math.round(soilIntensity * 100)}%
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {LEFT_CONSEQUENCES.map((label, index) => {
                  const active = soilIntensity > index * 0.16 || committedDirection === "soil" || reversalPhase === "thesis";
                  return (
                    <div
                      key={label}
                      className={`rounded-2xl border px-3 py-3 font-mono text-[10px] uppercase tracking-[0.25em] transition ${
                        active ? "border-gold/28 bg-gold/14 text-gold" : "border-paper/10 bg-paper/5 text-paper/48"
                      }`}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="rounded-[2rem] border border-paper/10 bg-black/20 p-4 shadow-[0_30px_90px_-30px_hsl(0_0%_0%/0.8)] backdrop-blur-md md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/52">
                  {shouldReduceMotion ? "Step-based direction choice" : "Drag or swipe and the world reacts before release"}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/72">
                  {isKeyboardMode ? "Keyboard active" : "Desktop drag · Mobile swipe"}
                </div>
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-paper/10 bg-background/35 p-4 md:p-5">
                <div className="relative overflow-hidden rounded-[1.4rem] border border-paper/10 px-4 py-5 md:px-6">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, rgba(38,87,173,${0.1 + valleyIntensity * 0.32}) 0%, rgba(20,24,41,0.08) 44%, rgba(172,124,63,${0.08 + soilIntensity * 0.34}) 100%)`,
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.32em] text-paper/42">
                      <span>Soil</span>
                      <span>Valley</span>
                    </div>

                    <div ref={trackRef} onClick={handleTrackClick} className="relative mt-5 h-24 cursor-pointer touch-pan-y">
                      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-paper/16" />
                      <div
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold/50"
                        style={{ transform: `translateY(-50%) translateX(calc(${toPercent(-0.56)} - 0.25rem))` }}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-silicon-accent/70"
                        style={{ left: toPercent(0.56), transform: "translate(-50%, -50%)" }}
                      />

                      <motion.div
                        aria-hidden="true"
                        className="absolute top-1/2 h-1.5 rounded-full bg-gradient-to-r from-gold via-paper to-silicon-accent"
                        style={{
                          left: dragProgressState >= 0 ? "50%" : currentThumbPosition,
                          right: dragProgressState >= 0 ? `${50 - dragProgressState * 50}%` : "50%",
                          opacity: 0.45 + Math.max(valleyIntensity, soilIntensity) * 0.55,
                        }}
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-y-4 left-[20%] hidden w-px bg-paper/10 md:block"
                        style={{ opacity: 0.3 + soilIntensity * 0.4 }}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-4 right-[20%] hidden w-px bg-paper/10 md:block"
                        style={{ opacity: 0.3 + valleyIntensity * 0.4 }}
                      />

                      <motion.button
                        type="button"
                        aria-label="Choose the direction ambition should move"
                        aria-describedby="hero-direction-help"
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        onKeyDown={handleKeyDown}
                        className="absolute top-1/2 z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/55 bg-soil-dark/90 text-paper shadow-[0_0_45px_hsl(var(--gold)/0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        style={{ left: currentThumbPosition, touchAction: "none" }}
                        animate={{
                          rotate: reversalPhase === "reversal" ? -168 : dragProgressState > 0 ? 14 + valleyIntensity * 10 : -14 - soilIntensity * 12,
                          scale: dragging ? 1.08 : committedDirection ? 1.02 : 1,
                          boxShadow:
                            committedDirection === "soil" || reversalPhase === "thesis"
                              ? "0 0 55px hsl(var(--gold) / 0.28)"
                              : committedDirection === "valley"
                                ? "0 0 48px hsl(var(--silicon-accent) / 0.18)"
                                : "0 0 40px hsl(var(--gold) / 0.15)",
                        }}
                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      >
                        <span className="sr-only">Direction handle</span>
                        <svg viewBox="0 0 64 64" className="mx-auto h-8 w-8" aria-hidden="true">
                          <path
                            d="M18 38h30c4 0 7-3 7-7s-3-7-7-7h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />
                          <circle cx="22" cy="42" r="6.5" fill="none" stroke="currentColor" strokeWidth="3.2" />
                          <circle cx="46" cy="42" r="6.5" fill="none" stroke="currentColor" strokeWidth="3.2" />
                          <path
                            d="M27 23h10l5 8H29z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.button>

                      <div className="pointer-events-none absolute inset-0">
                        {RIGHT_WORLD_LABELS.map((label, index) => (
                          <div
                            key={label}
                            className="absolute rounded-full border border-paper/10 bg-silicon-dark/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/78 backdrop-blur-sm"
                            style={{
                              opacity: clamp(valleyIntensity - index * 0.12, 0, 1),
                              top: `${14 + index * 14}%`,
                              left: `${58 + index * 6}%`,
                              transform: `translateX(${valleyIntensity * (8 + index * 2)}px) scale(${0.9 + valleyIntensity * 0.1})`,
                            }}
                          >
                            {label}
                          </div>
                        ))}
                        {LEFT_WORLD_LABELS.map((label, index) => (
                          <div
                            key={label}
                            className="absolute rounded-full border border-gold/18 bg-soil-dark/72 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-gold/92 backdrop-blur-sm"
                            style={{
                              opacity: clamp(soilIntensity - index * 0.12, 0, 1),
                              top: `${14 + index * 14}%`,
                              left: `${2 + index * 6}%`,
                              transform: `translateX(${soilIntensity * -(8 + index * 2)}px) scale(${0.9 + soilIntensity * 0.1})`,
                            }}
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div id="hero-direction-help" className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/48">{interactivePrompt}</div>
                      <div className="flex gap-2 md:hidden">
                        <button
                          type="button"
                          onClick={() => void handleNudge("left")}
                          className="rounded-full border border-gold/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                        >
                          Lean soil
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleNudge("right")}
                          className="rounded-full border border-paper/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                        >
                          Lean valley
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {showHint && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl border border-gold/20 bg-soil-dark/45 px-4 py-3 font-serif-body text-sm text-paper/78"
                  >
                    Pull right and the script hardens into prestige. Pull left and the site starts speaking about ownership, schools, and permanence.
                  </motion.div>
                )}

                {shouldReduceMotion && !committedDirection && reversalPhase !== "thesis" && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => void commitDirection("valley")}
                      className="inline-flex rounded-full border border-paper/15 bg-paper/5 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.35em] text-paper transition hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      Choose expected path
                    </button>
                    <button
                      type="button"
                      onClick={() => void commitDirection("soil")}
                      className="inline-flex rounded-full border border-gold/35 bg-gold/12 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.35em] text-gold transition hover:bg-gold/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      Choose reverse path
                    </button>
                  </div>
                )}

                {(committedDirection || reversalPhase === "thesis") && (
                  <button
                    type="button"
                    onClick={() => void resetInteraction()}
                    className="mt-4 inline-flex rounded-full border border-paper/15 bg-paper/5 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.35em] text-paper transition hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Reset the test
                  </button>
                )}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-paper/10 bg-black/20 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">{content.pathTitle}</div>
                  <p className="mt-3 font-serif-body text-sm leading-relaxed text-paper/70">{content.pathBody}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activePathSteps.map((step, index) => {
                      const highlight =
                        reversalPhase === "thesis" ||
                        committedDirection === "soil" ||
                        (committedDirection === "valley" && reversalPhase === "reversal" && index >= 1);

                      return (
                        <span
                          key={step}
                          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] ${
                            highlight
                              ? "border border-gold/25 bg-gold/12 text-gold"
                              : "border border-paper/15 bg-paper/6 text-paper/65"
                          }`}
                        >
                          {step}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-gold/20 bg-soil-dark/40 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/75">{content.afterTitle}</div>
                  <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="mt-3">
                    <div className="font-display text-3xl italic leading-tight text-paper md:text-5xl">{content.afterHeadline}</div>
                    <p className="mt-4 max-w-xl font-serif-body text-base leading-relaxed text-paper/76">{content.afterBody}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="space-y-4"
            animate={{ y: shouldReduceMotion ? 0 : valleyIntensity * -8, opacity: 0.66 + valleyIntensity * 0.34 }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/50">Consequence card · expected path</div>
            <div className="rounded-[1.3rem] border border-paper/10 bg-black/20 p-5 reverse-shadow backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-3xl italic text-paper md:text-4xl">What this path optimizes</div>
                  <p className="mt-3 max-w-sm font-serif-body text-sm leading-relaxed text-paper/68">
                    Easy to justify. Quick to celebrate. Increasingly shaped by capital markets.
                  </p>
                </div>
                <div className="rounded-full border border-paper/15 bg-paper/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/78">
                  {Math.round(valleyIntensity * 100)}%
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {RIGHT_CONSEQUENCES.map((label, index) => {
                  const active = valleyIntensity > index * 0.16 || committedDirection === "valley";
                  return (
                    <div
                      key={label}
                      className={`rounded-2xl border px-3 py-3 font-mono text-[10px] uppercase tracking-[0.25em] transition ${
                        active ? "border-paper/15 bg-paper/10 text-paper/88" : "border-paper/8 bg-paper/4 text-paper/42"
                      }`}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper/42">
            Village → City → IIT → Princeton → Silicon Valley → IPO is the default story.
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold/72">
            Silicon Valley → Tamil Nadu → Tenkasi → Mathalamparai is the thesis.
          </div>
        </div>
      </div>
    </section>
  );
};
