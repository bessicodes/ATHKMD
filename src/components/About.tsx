import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { useSiteContent } from "@/content/SiteContentProvider";

export const About = () => {
  const { about } = useSiteContent();

  return (
    <section
      id="about"
      className="section-fade relative overflow-hidden bg-background grain py-20 sm:py-24 md:py-40"
    >
      <div className="container mx-auto grid items-end gap-10 px-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-6">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-5 text-base leading-relaxed text-muted-foreground md:col-span-6 md:text-lg"
        >
          <p>{about.paragraphs[0]}</p>
          <p>{about.paragraphs[1]}</p>
          <div className="flex flex-wrap gap-6 border-t border-border pt-6 md:gap-8">
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
