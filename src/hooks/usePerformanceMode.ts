import { useEffect, useState } from "react";

export type EffectsLevel = "full" | "lite" | "minimal";

const computeEffectsLevel = () => {
  if (typeof window === "undefined") return "lite" as const;

  const prefersReduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const coarsePointer =
    window.matchMedia?.("(max-width: 900px), (pointer: coarse)")?.matches ??
    false;
  const saveData =
    "connection" in navigator &&
    Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData
    );
  const lowCpu =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  if (prefersReduced || saveData) return "minimal" as const;
  if (coarsePointer || lowCpu) return "lite" as const;
  return "full" as const;
};

export const usePerformanceMode = () => {
  const [effectsLevel, setEffectsLevel] = useState<EffectsLevel>(
    computeEffectsLevel()
  );

  useEffect(() => {
    const update = () => setEffectsLevel(computeEffectsLevel());
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    update();
    media.addEventListener("change", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return {
    effectsLevel,
    isMinimal: effectsLevel === "minimal",
    isLite: effectsLevel === "lite",
    isFull: effectsLevel === "full",
  };
};
