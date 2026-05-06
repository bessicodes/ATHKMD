import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-20% 0px -35% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <a href="#home" className="group flex items-center">
          <span className="font-display text-[1.05rem] tracking-[0.08em] text-foreground transition-opacity group-hover:opacity-80 sm:text-xl md:text-lg lg:text-xl">
            ATHLETE KINGDOM
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`group relative flex items-center gap-2 text-sm uppercase tracking-[0.2em] transition-colors ${
                  activeSection === l.href.replace("#", "") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    activeSection === l.href.replace("#", "")
                      ? "bg-foreground shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      : "bg-muted-foreground/40"
                  }`}
                />
                {l.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-foreground transition-all duration-300 ${
                    activeSection === l.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-foreground p-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border"
          >
            <ul className="flex flex-col p-6 gap-5">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className={`font-display text-2xl tracking-widest transition-colors ${
                      activeSection === l.href.replace("#", "")
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
