import { motion } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export const SectionTransition = ({ label }: { label: string }) => {
  const { isMinimal } = usePerformanceMode();

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-6xl px-6 py-8 md:py-10"
    >
      <div className="relative overflow-hidden rounded-full border border-border/70 bg-background/40 px-4 py-3 backdrop-blur-sm">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/50 to-transparent" />
        <span className="mt-3 block text-center font-display text-sm tracking-[0.25em] text-muted-foreground md:text-base">
          {label}
        </span>
        {!isMinimal ? (
          <motion.span
            className="pointer-events-none absolute top-2 h-[2px] w-24 bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]"
            initial={{ x: "-25%" }}
            animate={{ x: ["-25%", "115%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          />
        ) : null}
      </div>
    </div>
  );
};
