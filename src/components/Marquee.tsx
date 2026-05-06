const words = ["Discipline", "Grit", "Glory", "Kingdom", "Hustle", "Legacy", "Heart", "Greatness"];

export const Marquee = () => (
  <div className="marquee-wrap relative overflow-hidden border-y border-border bg-background py-10">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...words, ...words, ...words, ...words].map((w, i) => (
        <span
          key={`top-${i}`}
          className="mx-8 font-display text-5xl text-muted-foreground/40 transition-colors hover:text-foreground md:text-7xl"
        >
          {w} <span className="text-foreground/20">*</span>
        </span>
      ))}
    </div>
    <div className="mt-2 flex animate-marquee-reverse whitespace-nowrap">
      {[...words, ...words, ...words].map((w, i) => (
        <span
          key={`bottom-${i}`}
          className="mx-8 font-display text-2xl text-muted-foreground/30 transition-colors hover:text-foreground md:text-3xl"
        >
          {w.toUpperCase()}
        </span>
      ))}
    </div>
  </div>
);
