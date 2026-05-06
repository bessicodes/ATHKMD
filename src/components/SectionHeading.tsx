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
    viewport={{ once: true, amount: 0.12, margin: "-30px 0px -10px 0px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={align === "center" ? "text-center" : ""}
  >
    <p className="mb-4 text-xs uppercase tracking-[0.32em] text-muted-foreground md:tracking-[0.5em]">
      {eyebrow}
    </p>
    <h2 className="whitespace-pre-line font-display text-5xl leading-[0.9] text-gradient md:text-7xl lg:text-8xl">
      {title}
    </h2>
  </motion.div>
);
