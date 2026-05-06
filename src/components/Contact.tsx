import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { SOCIALS } from "@/lib/socials";
import { SectionHeading } from "./SectionHeading";

export const Contact = () => (
  <section id="contact" className="relative py-32 md:py-48 grain">
    <div className="container mx-auto px-6 max-w-5xl">
      <SectionHeading eyebrow="Contact" title={"Let's\nconnect."} />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-3xl"
      >
        Get in touch with Athlete Kingdom for collaborations, questions, copyright inquiries, or to
        connect with the sports community. Reach out via email or follow Athlete Kingdom on
        Instagram, TikTok, and YouTube. Whether you're an athlete, creator, or sports fan, this is
        the place to connect and become part of The Home of Sports.
      </motion.p>

      <motion.a
        href={`mailto:${SOCIALS.email}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="group relative mt-16 flex items-center justify-between gap-6 overflow-hidden border border-border p-8 transition-all duration-500 hover:border-foreground/40 hover:bg-card md:p-12"
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,hsl(0_0%_100%/.16),transparent_45%)]" />
        <div className="flex items-center gap-6">
          <Mail className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.2} />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Email</p>
            <p className="font-display text-2xl md:text-4xl text-gradient break-all">
              {SOCIALS.email}
            </p>
          </div>
        </div>
        <ArrowUpRight className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-foreground shrink-0" strokeWidth={1} />
      </motion.a>
    </div>
  </section>
);
