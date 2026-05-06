import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { useSiteContent } from "@/content/SiteContentProvider";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52V6.55a4.85 4.85 0 0 1-1.84-.16Z" />
  </svg>
);

export const Hero = () => {
  const { hero, socials } = useSiteContent();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.08 : 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 70 : 130]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 30 : 75]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.05]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden grain md:min-h-screen"
    >
      <div className="absolute inset-0">
        <motion.img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          style={{ scale: bgScale, y: bgY }}
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(0_0%_95%/.2),transparent_45%)]"
        />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 container mx-auto px-6 pb-16 pt-36 text-center md:pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: -26, scale: 0.86 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-8 w-fit [perspective:1200px]"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,hsl(0_0%_100%/.28),transparent_65%)] blur-2xl"
            animate={
              shouldReduceMotion || isMobile
                ? { opacity: [0.24, 0.36, 0.24] }
                : { opacity: [0.2, 0.6, 0.2], scale: [0.92, 1.08, 0.92] }
            }
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative [transform-style:preserve-3d]"
            animate={
              shouldReduceMotion
                ? undefined
                : isMobile
                  ? {
                      rotateY: [-12, 12, -12],
                      x: [-6, 6, -6],
                      rotateZ: [-0.6, 0.6, -0.6],
                      filter: [
                        "drop-shadow(0 0 10px rgba(255,255,255,0.22))",
                        "drop-shadow(0 0 16px rgba(255,255,255,0.38))",
                        "drop-shadow(0 0 10px rgba(255,255,255,0.22))",
                      ],
                    }
                  : {
                      rotateY: [-28, 28, -28],
                      x: [-12, 12, -12],
                      rotateZ: [-1.2, 1.2, -1.2],
                      filter: [
                        "drop-shadow(0 0 14px rgba(255,255,255,0.22))",
                        "drop-shadow(0 0 26px rgba(255,255,255,0.5))",
                        "drop-shadow(0 0 14px rgba(255,255,255,0.22))",
                      ],
                    }
            }
            transition={{ duration: isMobile ? 5.2 : 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={logo}
              alt="Athlete Kingdom"
              width={1024}
              height={1536}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-24 md:w-32 select-none"
              animate={shouldReduceMotion || isMobile ? undefined : { rotateX: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-40 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/75 to-transparent blur-[2px]"
            animate={
              shouldReduceMotion || isMobile
                ? { opacity: [0.18, 0.4, 0.18] }
                : { x: [-26, 26, -26], opacity: [0.2, 0.75, 0.2] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 text-[10px] uppercase tracking-[0.38em] text-muted-foreground sm:mb-6 sm:text-sm sm:tracking-[0.5em]"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[17vw] leading-[0.85] text-foreground md:text-[12vw] md:text-gradient lg:text-[10rem]"
        >
          {hero.titleTop}
          <br />
          {hero.titleBottom}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:gap-4"
        >
          <SocialButton href={socials.youtube} label="YouTube" icon={<Youtube size={18} />} />
          <SocialButton href={socials.tiktok} label="TikTok" icon={<TikTokIcon />} />
          <SocialButton href={socials.instagram} label="Instagram" icon={<Instagram size={18} />} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        Scroll
        <div className="mt-2 h-10 w-px bg-gradient-to-b from-foreground/50 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

const SocialButton = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative inline-flex items-center gap-2 border border-border bg-background/40 px-4 py-2.5 text-[11px] uppercase tracking-[0.17em] text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-foreground hover:bg-foreground hover:text-background md:px-6 md:py-3 md:text-sm md:tracking-[0.2em]"
  >
    {icon}
    <span>{label}</span>
    <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(115deg,transparent_0%,hsl(0_0%_100%/.16)_48%,transparent_78%)]" />
  </a>
);
