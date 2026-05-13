import { NUMBER_THAT_DOES_NOT_EXIST } from "@/data/story";

export const NumberThatDoesNotExist = () => {
  return (
    <section id="number" data-tone="mixed" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-5xl rounded-sm border border-paper/10 bg-black/20 px-6 py-12 text-center reverse-shadow md:px-12 md:py-16">
          <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/45">
            Section 05 · The Number That Doesn't Exist
          </div>
          <p className="mx-auto mt-6 max-w-2xl font-serif-body text-lg leading-relaxed text-paper/68">
            {NUMBER_THAT_DOES_NOT_EXIST.preface}
          </p>
          <div className="mt-8 font-mono text-[clamp(2rem,8vw,6rem)] tracking-[0.08em] text-paper/78">
            {NUMBER_THAT_DOES_NOT_EXIST.number}
          </div>
          <div className="mt-4 font-display text-[clamp(2.8rem,9vw,7rem)] italic text-grad-gold">
            {NUMBER_THAT_DOES_NOT_EXIST.decline}
          </div>
          <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/45">
            {NUMBER_THAT_DOES_NOT_EXIST.label}
          </div>
          <p className="mx-auto mt-4 max-w-2xl font-serif-body text-sm leading-relaxed text-paper/58">
            {NUMBER_THAT_DOES_NOT_EXIST.note}
          </p>
        </div>
      </div>
    </section>
  );
};
