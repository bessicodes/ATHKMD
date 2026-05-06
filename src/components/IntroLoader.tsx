import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export const INTRO_SESSION_KEY = "athkmd_intro_seen";
export const INTRO_DONE_EVENT = "athkmd:intro-done";

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
  const displayDuration = isLite ? 2300 : 3200;

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const alreadySeen = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    if (alreadySeen || isMinimal) return;

    setVisible(true);
    const timeout = window.setTimeout(() => {
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      setVisible(false);
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    }, displayDuration);

    return () => window.clearTimeout(timeout);
  }, [displayDuration, enabled, isMinimal]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(6px)",
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(0_0%_100%/.15),transparent_55%)]"
            animate={{ opacity: [0.35, 0.78, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,hsl(0_0%_100%/.14)_45%,transparent_72%)]"
            initial={{ x: "-60%" }}
            animate={{ x: ["-60%", "70%", "115%"] }}
            transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            initial={{ y: 20, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{
              y: -120,
              scale: 0.62,
              opacity: 0,
              filter: "blur(3px)",
              transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {logoSrc ? (
              <motion.img
                src={logoSrc}
                alt=""
                aria-hidden="true"
                className="mb-5 w-20 select-none md:w-24"
                animate={{
                  rotateY: [-12, 12, -12],
                  y: [0, -3, 0],
                  rotateZ: [-0.4, 0.6, -0.4],
                  filter: [
                    "drop-shadow(0 0 8px rgba(255,255,255,0.22))",
                    "drop-shadow(0 0 16px rgba(255,255,255,0.42))",
                    "drop-shadow(0 0 8px rgba(255,255,255,0.22))",
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
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
            <div className="mt-5 h-[2px] w-40 overflow-hidden rounded-full bg-foreground/20">
              <motion.div
                className="h-full bg-gradient-to-r from-foreground/45 via-foreground to-foreground/45"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: displayDuration / 1000, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
