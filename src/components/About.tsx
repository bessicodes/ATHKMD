import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { useSiteContent } from "@/content/SiteContentProvider";

export const About = () => {
  const { about } = useSiteContent();

  return (
    <section id="about" className="relative py-32 md:py-48 grain overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(0_0%_10%)_0%,hsl(0_0%_4%)_60%)]" />

      <div className="container mx-auto px-6 grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-6">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-6 space-y-6 text-lg text-muted-foreground leading-relaxed"
        >
          <p>{about.paragraphs[0]}</p>
          <p>{about.paragraphs[1]}</p>
          <div className="flex flex-wrap gap-8 pt-6 border-t border-border">
            {about.stats.map((stat) => (
              <Stat key={stat.l} n={stat.n} l={stat.l} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({ n, l }: { n: string; l: string }) => (
  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
    <p className="font-display text-4xl text-foreground">{n}</p>
    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-1">{l}</p>
  </motion.div>
);
