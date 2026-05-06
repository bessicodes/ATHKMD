import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

export const About = () => (
  <section id="about" className="relative py-32 md:py-48 grain overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(0_0%_10%)_0%,hsl(0_0%_4%)_60%)]" />

    <div className="container mx-auto px-6 grid md:grid-cols-12 gap-12 items-end">
      <div className="md:col-span-6">
        <SectionHeading eyebrow="About" title={"Built for\nthose who\ncompete."} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:col-span-6 space-y-6 text-lg text-muted-foreground leading-relaxed"
      >
        <p>
          Athlete Kingdom is more than a sports page - it is a movement. We craft cinematic content
          that captures the heart of competition: the sweat, the silence before the whistle, the
          moments that change careers.
        </p>
        <p>
          Expect inspiring athlete stories, motivational edits, iconic sporting moments, and
          educational clips designed to push you forward - whether you are chasing greatness on the
          field or watching from the stands.
        </p>
        <div className="flex flex-wrap gap-8 pt-6 border-t border-border">
          <Stat n="Unlimited" l="Stories Told" />
          <Stat n="24/7" l="Sports Energy" />
          <Stat n="1" l="Kingdom" />
        </div>
      </motion.div>
    </div>
  </section>
);

const Stat = ({ n, l }: { n: string; l: string }) => (
  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
    <p className="font-display text-4xl text-foreground">{n}</p>
    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-1">{l}</p>
  </motion.div>
);
