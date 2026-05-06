import { motion } from "framer-motion";

export const SectionHeading = ({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={align === "center" ? "text-center" : ""}
  >
    <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground mb-4">{eyebrow}</p>
    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-gradient">
      {title}
    </h2>
  </motion.div>
);
