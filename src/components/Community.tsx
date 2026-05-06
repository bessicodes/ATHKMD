import { motion } from "framer-motion";
import { Instagram, Youtube, ArrowUpRight } from "lucide-react";
import communityBg from "@/assets/community-bg.jpg";
import { SOCIALS } from "@/lib/socials";

export const Community = () => (
  <section id="community" className="relative py-32 md:py-48 overflow-hidden grain">
    <div className="absolute inset-0 -z-10">
      <img
        src={communityBg}
        alt=""
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        width={1920}
        height={1080}
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
    </div>

    <div className="container mx-auto px-6 text-center max-w-4xl">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.5em] text-muted-foreground mb-6"
      >
        The Movement
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9 }}
        className="font-display text-5xl md:text-8xl lg:text-9xl leading-[0.9] text-gradient"
      >
        Join the
        <br />
        Kingdom.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 max-w-2xl mx-auto text-base text-muted-foreground leading-relaxed md:text-lg"
      >
        Whether you are an athlete chasing greatness or a fan who lives for the moment - this is your
        home. Follow the movement, share the stories, become part of something bigger.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 flex flex-wrap justify-center gap-3"
      >
        <PrimaryLink href={SOCIALS.youtube}>Subscribe on YouTube</PrimaryLink>
        <GhostLink href={SOCIALS.instagram} icon={<Instagram size={16} />}>Instagram</GhostLink>
        <GhostLink href={SOCIALS.tiktok}>TikTok</GhostLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-10 flex flex-wrap justify-center gap-3"
      >
        {["Daily Content", "Athlete Stories", "Motivation & Growth"].map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-border bg-background/50 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground backdrop-blur"
          >
            {pill}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

const PrimaryLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-2 bg-foreground px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-background transition-all duration-300 hover:bg-foreground/90 hover:gap-4 md:px-7 md:py-4 md:text-sm md:tracking-[0.2em]"
  >
    <Youtube size={18} />
    {children}
    <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
  </a>
);

const GhostLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 border border-border px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-foreground transition-all hover:border-foreground/40 hover:bg-secondary md:px-7 md:py-4 md:text-sm md:tracking-[0.2em]"
  >
    {icon}
    {children}
  </a>
);
