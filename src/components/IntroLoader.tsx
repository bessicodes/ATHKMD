import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

const SESSION_KEY = "athkmd_intro_seen";

export const IntroLoader = ({
  enabled,
  logoSrc,
  titleTop,
  titleBottom,
}: {
  enabled: boolean;
  logoSrc: string;
  titleTop: string;
  titleBottom: string;
}) => {
  const { isMinimal, isLite } = usePerformanceMode();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    if (alreadySeen || isMinimal) return;

    setVisible(true);
    const timeout = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }, isLite ? 1150 : 1650);

    return () => window.clearTimeout(timeout);
  }, [enabled, isLite, isMinimal]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeOut" } }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(0_0%_100%/.15),transparent_55%)]"
            animate={{ opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {logoSrc ? (
              <motion.img
                src={logoSrc}
                alt=""
                aria-hidden="true"
                className="mb-5 w-20 select-none md:w-24"
                animate={{ rotateY: [-14, 14, -14] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : null}
            <p className="font-display text-5xl leading-[0.86] text-gradient md:text-6xl">
              {titleTop}
              <br />
              {titleBottom}
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
              Entering the kingdom
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
