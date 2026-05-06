import { MotionConfig, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Suspense, lazy, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { InAppBrowserNotice } from "@/components/InAppBrowserNotice";
import { StoryRail } from "@/components/StoryRail";
import { CinematicSection } from "@/components/CinematicSection";
import { SectionTransition } from "@/components/SectionTransition";
import { IntroLoader } from "@/components/IntroLoader";
import { useSiteContent } from "@/content/SiteContentProvider";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import defaultLogo from "@/assets/logo.png";

const About = lazy(async () => ({
  default: (await import("@/components/About")).About,
}));
const WhatWeDo = lazy(async () => ({
  default: (await import("@/components/WhatWeDo")).WhatWeDo,
}));
const Community = lazy(async () => ({
  default: (await import("@/components/Community")).Community,
}));
const Contact = lazy(async () => ({
  default: (await import("@/components/Contact")).Contact,
}));

const Index = () => {
  const { storySections, hero, visuals, effects } = useSiteContent();
  const { isMinimal, isLite } = usePerformanceMode();
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = storySections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-22% 0px -40% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [storySections]);

  const aboutLabel =
    storySections.find((section) => section.id === "about")?.label ?? "About";
  const whatWeDoLabel =
    storySections.find((section) => section.id === "what-we-do")?.label ??
    "What We Do";
  const communityLabel =
    storySections.find((section) => section.id === "community")?.label ??
    "Community";
  const contactLabel =
    storySections.find((section) => section.id === "contact")?.label ??
    "Contact";
  const moodStrength = Math.min(1, Math.max(0, effects.moodShiftStrength ?? 0.45));
  const moodBySection: Record<string, string> = {
    home: `radial-gradient(circle at 50% 14%, hsl(210 60% 48% / ${0.18 * moodStrength}), transparent 55%)`,
    about: `radial-gradient(circle at 22% 20%, hsl(12 70% 45% / ${0.2 * moodStrength}), transparent 58%)`,
    "what-we-do": `radial-gradient(circle at 78% 30%, hsl(182 72% 46% / ${0.18 * moodStrength}), transparent 58%)`,
    community: `radial-gradient(circle at 50% 35%, hsl(280 68% 52% / ${0.17 * moodStrength}), transparent 58%)`,
    contact: `radial-gradient(circle at 35% 24%, hsl(48 75% 50% / ${0.17 * moodStrength}), transparent 58%)`,
  };
  const moodBackground = moodBySection[activeSection] ?? moodBySection.home;

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 120, damping: 20 }}>
      <main className="relative overflow-x-hidden bg-background text-foreground">
      <IntroLoader
        enabled={effects.enableIntroLoader}
        logoSrc={visuals.logoUrl || defaultLogo}
        titleTop={hero.titleTop}
        titleBottom={hero.titleBottom}
      />
      <InAppBrowserNotice />
      <ScrollProgress />
      <StoryRail sections={storySections} />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        {effects.enableAmbientOrbs ? (
          <>
            <motion.div
              className="ambient-orb absolute -top-24 left-[8%] h-72 w-72"
              animate={
                isMinimal
                  ? undefined
                  : { x: [0, isLite ? 16 : 30, isLite ? -10 : -20, 0], y: [0, isLite ? -10 : -20, isLite ? 6 : 10, 0] }
              }
              transition={{ duration: isLite ? 24 : 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="ambient-orb ambient-orb-soft absolute top-[30%] right-[4%] h-96 w-96"
              animate={
                isMinimal
                  ? undefined
                  : { x: [0, isLite ? -12 : -20, isLite ? 8 : 10, 0], y: [0, isLite ? 12 : 20, isLite ? -8 : -10, 0] }
              }
              transition={{ duration: isLite ? 28 : 24, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : null}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          animate={{ opacity: isMinimal ? 0.22 : 0.45, backgroundImage: moodBackground }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>

      <Navbar />
      <Hero />
      <Marquee />
      <SectionTransition label={aboutLabel} />

      <Suspense fallback={<SectionFallback />}>
        <CinematicSection>
          <About />
        </CinematicSection>
      </Suspense>
      <SectionTransition label={whatWeDoLabel} />
      <Suspense fallback={<SectionFallback />}>
        <CinematicSection>
          <WhatWeDo />
        </CinematicSection>
      </Suspense>
      <SectionTransition label={communityLabel} />
      <Suspense fallback={<SectionFallback />}>
        <CinematicSection>
          <Community />
        </CinematicSection>
      </Suspense>
      <SectionTransition label={contactLabel} />
      <Suspense fallback={<SectionFallback />}>
        <CinematicSection>
          <Contact />
        </CinematicSection>
      </Suspense>

      <Footer />

      <motion.button
        type="button"
        aria-label="Scroll to top"
        initial={false}
        animate={{
          opacity: showTop ? 1 : 0,
          y: showTop ? 0 : 24,
          pointerEvents: showTop ? "auto" : "none",
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-5 z-50 inline-flex h-12 w-12 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-xl transition-colors hover:bg-foreground hover:text-background md:bottom-8 md:right-8"
      >
        <ArrowUp size={18} />
      </motion.button>
      </main>
    </MotionConfig>
  );
};

const SectionFallback = () => (
  <div
    className="h-40 w-full border-y border-border/40 bg-background/40"
    aria-hidden="true"
  />
);

export default Index;
