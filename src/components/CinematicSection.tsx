import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export const CinematicSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { isMinimal, isLite } = usePerformanceMode();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.2, 0.8, 0.95],
    [isMinimal ? 0.95 : 0.45, 1, 1, isMinimal ? 0.95 : 0.6]
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [isLite ? 16 : 30, 0, isLite ? -12 : -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [isLite ? 0.995 : 0.985, 1, isLite ? 0.995 : 0.99]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [isLite ? 0.2 : 0.9, 0, isLite ? -0.2 : -0.9]);

  return (
    <motion.div
      ref={wrapperRef}
      style={
        shouldReduceMotion
          ? undefined
          : {
              opacity,
              y,
              scale,
              rotateX,
              transformPerspective: 1400,
              transformOrigin: "50% 50%",
            }
      }
      className={`section-shell ${className}`}
    >
      {children}
    </motion.div>
  );
};
