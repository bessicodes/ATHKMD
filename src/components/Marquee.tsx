const words = ["Discipline", "Grit", "Glory", "Kingdom", "Hustle", "Legacy", "Heart", "Greatness"];

export const Marquee = () => (
  <div className="marquee-wrap relative overflow-hidden border-y border-border bg-background py-7 md:py-10">
    <div className="flex animate-marquee whitespace-nowrap will-change-transform">
      {[...words, ...words, ...words, ...words].map((w, i) => (
        <span
          key={`top-${i}`}
          className="mx-5 font-display text-4xl text-muted-foreground/40 transition-colors hover:text-foreground md:mx-8 md:text-7xl"
        >
          {w} <span className="text-foreground/20">*</span>
        </span>
      ))}
    </div>
    <div className="mt-1.5 flex animate-marquee-reverse whitespace-nowrap will-change-transform md:mt-2">
      {[...words, ...words, ...words].map((w, i) => (
        <span
          key={`bottom-${i}`}
          className="mx-5 font-display text-xl text-muted-foreground/30 transition-colors hover:text-foreground md:mx-8 md:text-3xl"
        >
          {w.toUpperCase()}
        </span>
      ))}
    </div>
  </div>
);
