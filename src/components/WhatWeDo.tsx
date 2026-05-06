import { motion } from "framer-motion";
import { Film, Flame, Sparkles, TrendingUp, Trophy } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { IconKey } from "@/content/siteContent";
import { useSiteContent } from "@/content/SiteContentProvider";

const ICONS: Record<IconKey, typeof Flame> = {
  flame: Flame,
  trophy: Trophy,
  trendingUp: TrendingUp,
  sparkles: Sparkles,
  film: Film,
};

export const WhatWeDo = () => {
  const { whatWeDo } = useSiteContent();

  return (
    <section
      id="what-we-do"
      className="section-fade relative bg-background grain py-20 sm:py-24 md:py-40"
    >
      <div className="container mx-auto px-6">
        <div className="mb-14 max-w-3xl md:mb-20">
          <SectionHeading eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} />
        </div>

        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.items.map((item, i) => (
            <WorkCard key={item.title} item={item} index={i} />
          ))}

          <div className="hidden lg:flex bg-background p-10 md:p-12 items-center justify-center">
            <p className="text-gradient text-center font-display text-2xl leading-tight">
              More.
              <br />
              Always.
              <br />
              <span className="text-muted-foreground">More.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkCard = ({
  item,
  index,
}: {
  item: { icon: IconKey; title: string; desc: string };
  index: number;
}) => {
  const Icon = ICONS[item.icon];
  const [pointer, setPointer] = useState({ x: 50, y: 50, active: false });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "-20px 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPointer({ x, y, active: true });
      }}
      onMouseLeave={() => setPointer((old) => ({ ...old, active: false }))}
      className="group relative cursor-default overflow-hidden bg-background transition-all duration-500 hover:bg-card"
    >
      <div
        style={{
          transform: pointer.active
            ? `perspective(900px) rotateX(${(50 - pointer.y) * 0.08}deg) rotateY(${(pointer.x - 50) * 0.09}deg)`
            : "perspective(900px) rotateX(0deg) rotateY(0deg)",
        }}
        className="relative p-7 transition-transform duration-200 sm:p-9 md:p-12"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, hsl(0 0% 100% / 0.12), transparent 42%)`,
          }}
        />
        <div className="relative">
          <div className="mb-12 flex items-start justify-between">
            <Icon
            className="h-7 w-7 text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-foreground md:h-8 md:w-8"
              strokeWidth={1.2}
            />
            <span className="font-display text-sm text-muted-foreground">
              0{index + 1}
            </span>
          </div>
          <h3 className="mb-3 font-display text-[1.95rem] tracking-wide md:text-4xl">
            {item.title}
          </h3>
          <p className="text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">{item.desc}</p>
          <div className="mt-8 h-px w-12 bg-foreground/30 transition-all duration-500 group-hover:w-full group-hover:bg-foreground" />
        </div>
      </div>
    </motion.div>
  );
};
