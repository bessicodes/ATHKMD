import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { SOCIALS } from "@/lib/socials";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52V6.55a4.85 4.85 0 0 1-1.84-.16Z" />
  </svg>
);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.05]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden grain"
    >
      <div className="absolute inset-0">
        <motion.img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
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
        className="relative z-10 container mx-auto px-6 text-center pt-24 pb-16"
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
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.92, 1.08, 0.92] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative [transform-style:preserve-3d]"
            animate={{
              rotateY: [-34, 34, -34],
              x: [-14, 14, -14],
              rotateZ: [-1.6, 1.6, -1.6],
              filter: [
                "drop-shadow(0 0 14px rgba(255,255,255,0.22))",
                "drop-shadow(0 0 26px rgba(255,255,255,0.5))",
                "drop-shadow(0 0 14px rgba(255,255,255,0.22))",
              ],
            }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={logo}
              alt="Athlete Kingdom"
              className="w-24 md:w-32"
              animate={{ rotateX: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-40 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/75 to-transparent blur-[2px]"
            animate={{ x: [-26, 26, -26], opacity: [0.2, 0.75, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs md:text-sm uppercase tracking-[0.5em] text-muted-foreground mb-6"
        >
          Est. The Home of Sports
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[18vw] md:text-[12vw] lg:text-[10rem] leading-[0.85] text-gradient"
        >
          ATHLETE
          <br />
          KINGDOM
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          <SocialButton href={SOCIALS.youtube} label="YouTube" icon={<Youtube size={18} />} />
          <SocialButton href={SOCIALS.tiktok} label="TikTok" icon={<TikTokIcon />} />
          <SocialButton href={SOCIALS.instagram} label="Instagram" icon={<Instagram size={18} />} />
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
    className="group relative inline-flex items-center gap-2 border border-border bg-background/40 px-6 py-3 text-sm uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-foreground hover:bg-foreground hover:text-background"
  >
    {icon}
    <span>{label}</span>
    <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(115deg,transparent_0%,hsl(0_0%_100%/.16)_48%,transparent_78%)]" />
  </a>
);
