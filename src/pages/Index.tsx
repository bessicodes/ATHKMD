import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Community } from "@/components/Community";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

const Index = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="ambient-orb absolute -top-24 left-[8%] h-72 w-72"
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="ambient-orb ambient-orb-soft absolute top-[30%] right-[4%] h-96 w-96"
          animate={{ x: [0, -20, 10, 0], y: [0, 20, -10, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <WhatWeDo />
      <Community />
      <Contact />
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
  );
};

export default Index;
