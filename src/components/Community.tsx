import { motion } from "framer-motion";
import { Instagram, Youtube, ArrowUpRight } from "lucide-react";
import communityBg from "@/assets/community-bg.jpg";
import { useSiteContent } from "@/content/SiteContentProvider";

export const Community = () => {
  const { socials, community, visuals } = useSiteContent();
  const communityBgSrc = visuals.communityBgUrl || communityBg;

  return (
    <section id="community" className="section-fade relative overflow-hidden grain py-20 sm:py-24 md:py-40">
    <div className="absolute inset-0 -z-10">
      <img
        src={communityBgSrc}
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

    <div className="container mx-auto max-w-4xl px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground md:tracking-[0.5em]"
      >
        {community.eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9 }}
        className="text-gradient whitespace-pre-line font-display text-[clamp(3rem,13vw,8rem)] leading-[0.88] lg:text-9xl"
      >
        {community.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg"
      >
        {community.body}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 md:mt-12 md:flex md:w-auto md:flex-wrap md:justify-center"
      >
        <PrimaryLink href={socials.youtube}>Subscribe on YouTube</PrimaryLink>
        <GhostLink href={socials.instagram} icon={<Instagram size={16} />}>Instagram</GhostLink>
        <GhostLink href={socials.tiktok}>TikTok</GhostLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8 flex flex-wrap justify-center gap-2.5 md:mt-10 md:gap-3"
      >
        {community.pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-border bg-background/50 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur md:px-4 md:text-[11px] md:tracking-[0.24em]"
          >
            {pill}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
  );
};

const PrimaryLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="interactive-glow touch-feedback group inline-flex w-full items-center justify-center gap-2 bg-foreground px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-background transition-all duration-300 hover:bg-foreground/90 hover:gap-4 sm:w-auto md:px-7 md:py-4 md:text-sm md:tracking-[0.2em]"
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
    className="interactive-glow touch-feedback inline-flex w-full items-center justify-center gap-2 border border-border px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-foreground transition-all hover:border-foreground/40 hover:bg-secondary sm:w-auto md:px-7 md:py-4 md:text-sm md:tracking-[0.2em]"
  >
    {icon}
    {children}
  </a>
);
