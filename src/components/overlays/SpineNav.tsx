import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type SpineItem = { id: string; n: string; title: string };

export const SpineNav = () => {
  const spine: SpineItem[] = useMemo(
    () => [
      { id: "hero", n: "01", title: "The Man Who Walked Back" },
      { id: "origin", n: "02", title: "Thanjavur. Tamil Medium. The Vow." },
      { id: "first-risk", n: "03", title: "From Trade Show Booth to Zero." },
      { id: "system", n: "04", title: "Build. Not Buy. Not Borrow." },
      { id: "school", n: "05", title: "Contextual Knowledge." },
      { id: "schools-counter", n: "06", title: "From 6 Kids to Hundreds." },
      { id: "policy", n: "07", title: "Degrees Not Required." },
      { id: "return", n: "08", title: "Breakfast in a Mud House." },
      { id: "philosophy", n: "09", title: "Patients vs Patients." },
      { id: "tension", n: "10", title: "The Complicated Man." },
      { id: "finale", n: "11", title: "The Signal From The Soil." },
    ],
    [],
  );

  const [active, setActive] = useState<string>(spine[0]?.id ?? "hero");

  useEffect(() => {
    const els = spine
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const top = inView[0]?.target as HTMLElement | undefined;
        if (top?.id) setActive(top.id);
      },
      {
        root: null,
        rootMargin: "-45% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [spine]);

  return (
    <nav
      aria-label="Story spine"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <div className="pointer-events-auto w-[280px] rounded-sm border border-border/40 bg-background/30 p-3 backdrop-blur-md">
        <div className="px-2 py-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.45em] text-paper/55">Story spine</div>
          <div className="mt-1 font-display text-xl text-paper/85">Inverse Roots</div>
        </div>

        <div className="relative mt-2">
          <div className="pointer-events-none absolute bottom-0 left-[18px] top-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          <ul className="space-y-1">
            {spine.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={cn(
                      "group flex items-center gap-3 rounded-sm px-2 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                      isActive ? "bg-soil-mid/25" : "hover:bg-card/30",
                    )}
                  >
                    <div className="flex w-10 items-center gap-2">
                      <span
                        className={cn(
                          "grid h-2 w-2 place-items-center rounded-full border",
                          isActive ? "border-gold bg-gold/80 shadow-[0_0_18px_hsl(var(--gold)/0.25)]" : "border-border/60 bg-paper/15",
                        )}
                      />
                      <span className={cn("font-mono text-[10px] uppercase tracking-[0.35em]", isActive ? "text-gold" : "text-paper/45")}>
                        {s.n}
                      </span>
                    </div>
                    <span className={cn("truncate font-serif-body text-sm", isActive ? "text-paper" : "text-paper/65")}>
                      {s.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

