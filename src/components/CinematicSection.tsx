import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CinematicSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0.35, 1, 1, 0.45]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [32, 0, -26]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.99]);

  return (
    <motion.div
      ref={wrapperRef}
      style={shouldReduceMotion ? undefined : { opacity, y, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
