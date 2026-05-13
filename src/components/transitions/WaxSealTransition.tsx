import { motion, useReducedMotion } from "framer-motion";

type Props = {
  tone?: "soil" | "silicon" | "mixed";
};

export const WaxSealTransition = ({ tone = "soil" }: Props) => {
  const reduce = useReducedMotion();
  const ink =
    tone === "silicon"
      ? "radial-gradient(circle at 50% 50%, hsl(var(--silicon-accent)/0.22), transparent 62%)"
      : tone === "mixed"
        ? "radial-gradient(circle at 50% 50%, hsl(var(--paper)/0.12), transparent 62%)"
      : "radial-gradient(circle at 50% 50%, hsl(var(--gold)/0.22), transparent 62%)";

  return (
    <div aria-hidden="true" className="relative h-16 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-double border-paper/20"
        style={{ backgroundImage: ink, mixBlendMode: tone === "silicon" ? "screen" : "overlay" }}
        initial={{ scale: 0.2, opacity: 0 }}
        whileInView={reduce ? { scale: 1, opacity: 0.75 } : { scale: [0.2, 1.05, 0.98], opacity: [0, 0.9, 0.45] }}
        viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
        transition={reduce ? { duration: 0 } : { duration: 0.55, ease: [0.2, 1, 0.2, 1] }}
      />
    </div>
  );
};
