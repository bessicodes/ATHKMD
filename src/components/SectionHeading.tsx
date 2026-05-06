import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export const SectionHeading = ({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { isMinimal, isLite } = usePerformanceMode();
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isMinimal ? 0 : isLite ? 8 : 14, 0, isMinimal ? 0 : isLite ? -8 : -14]
  );

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "-30px 0px -10px 0px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={align === "center" ? "text-center" : ""}
    >
      <motion.p
        style={isMinimal ? undefined : { y: headingY }}
        className="mb-4 text-xs uppercase tracking-[0.32em] text-muted-foreground md:tracking-[0.5em]"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        style={isMinimal ? undefined : { y: headingY }}
        className="whitespace-pre-line font-display text-5xl leading-[0.9] text-gradient md:text-7xl lg:text-8xl"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
};
