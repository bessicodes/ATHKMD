import { useEffect, useState } from "react";

type StorySection = {
  id: string;
  label: string;
};

export const StoryRail = ({ sections }: { sections: StorySection[] }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-25% 0px -35% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="rounded-md border border-border/80 bg-background/45 px-3 py-3 backdrop-blur">
        <ul className="space-y-3">
          {sections.map((section) => {
            const active = section.id === activeId;
            return (
              <li key={section.id} className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    active
                      ? "bg-foreground shadow-[0_0_10px_rgba(255,255,255,0.85)]"
                      : "bg-muted-foreground/35"
                  }`}
                />
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {section.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
