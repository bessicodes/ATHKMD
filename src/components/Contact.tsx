import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useSiteContent } from "@/content/SiteContentProvider";

export const Contact = () => {
  const { socials, contact } = useSiteContent();

  return (
    <section id="contact" className="relative grain py-20 sm:py-24 md:py-40">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:mt-10 md:text-lg"
        >
          {contact.body}
        </motion.p>

        <motion.a
          href={`mailto:${socials.email}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="interactive-glow group relative mt-10 flex flex-col items-start justify-between gap-5 overflow-hidden border border-border p-5 transition-all duration-500 hover:border-foreground/40 hover:bg-card sm:mt-12 md:mt-16 md:flex-row md:items-center md:gap-6 md:p-12"
        >
          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,hsl(0_0%_100%/.16),transparent_45%)]" />
          <div className="flex items-center gap-4 md:gap-6">
            <Mail className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-foreground md:h-8 md:w-8" strokeWidth={1.2} />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Email</p>
              <p className="break-all font-display text-[1.7rem] text-gradient sm:text-3xl md:text-4xl">
                {socials.email}
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-8 w-8 shrink-0 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-foreground md:h-12 md:w-12" strokeWidth={1} />
        </motion.a>
      </div>
    </section>
  );
};
