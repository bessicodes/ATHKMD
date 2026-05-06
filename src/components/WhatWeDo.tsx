import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { WHAT_WE_DO } from "@/content/siteContent";

export const WhatWeDo = () => (
  <section id="what-we-do" className="relative py-32 md:py-48 grain">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mb-20">
        <SectionHeading eyebrow={WHAT_WE_DO.eyebrow} title={WHAT_WE_DO.title} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {WHAT_WE_DO.items.map((item, i) => (
          <WorkCard
            key={item.title}
            item={item}
            index={i}
          />
        ))}

        <div className="hidden lg:flex bg-background p-10 md:p-12 items-center justify-center">
          <p className="font-display text-2xl text-gradient text-center leading-tight">
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

const WorkCard = ({
  item,
  index,
}: {
  item: (typeof WHAT_WE_DO.items)[number];
  index: number;
}) => {
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
        className="relative p-10 transition-transform duration-200 md:p-12"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, hsl(0 0% 100% / 0.12), transparent 42%)`,
          }}
        />
        <div className="relative">
          <div className="mb-12 flex items-start justify-between">
            <item.icon
              className="h-8 w-8 text-muted-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-foreground"
              strokeWidth={1.2}
            />
            <span className="font-display text-sm text-muted-foreground">
              0{index + 1}
            </span>
          </div>
          <h3 className="mb-3 font-display text-3xl tracking-wide md:text-4xl">
            {item.title}
          </h3>
          <p className="leading-relaxed text-muted-foreground">{item.desc}</p>
          <div className="mt-8 h-px w-12 bg-foreground/30 transition-all duration-500 group-hover:w-full group-hover:bg-foreground" />
        </div>
      </div>
    </motion.div>
  );
};
