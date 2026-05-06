import { Instagram, Youtube } from "lucide-react";
import { useSiteContent } from "@/content/SiteContentProvider";

export const Footer = () => {
  const { socials } = useSiteContent();

  return (
    <footer className="relative border-t border-border py-12 grain md:py-16">
      <div className="container mx-auto grid items-center gap-8 px-6 text-center md:grid-cols-3 md:gap-10 md:text-left">
        <a href="#home" className="group justify-self-center md:justify-self-start">
          <p className="font-display text-xl tracking-widest transition-opacity group-hover:opacity-80">ATHLETE KINGDOM</p>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">The Home of Sports</p>
        </a>

        <div className="flex justify-center gap-6 text-sm">
          <a href={`mailto:${socials.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
            {socials.email}
          </a>
        </div>

        <div className="flex justify-center gap-3 md:justify-end">
          <SocialIcon href={socials.instagram} label="Instagram"><Instagram size={18} /></SocialIcon>
          <SocialIcon href={socials.tiktok} label="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52V6.55a4.85 4.85 0 0 1-1.84-.16Z"/></svg>
          </SocialIcon>
          <SocialIcon href={socials.youtube} label="YouTube"><Youtube size={18} /></SocialIcon>
        </div>
      </div>

      <div className="container mx-auto mt-10 flex flex-col justify-between gap-3 border-t border-border px-6 pt-7 text-center text-xs uppercase tracking-[0.26em] text-muted-foreground md:mt-12 md:flex-row md:gap-4 md:tracking-[0.3em]">
        <p>(c) {new Date().getFullYear()} Athlete Kingdom. All rights reserved.</p>
        <p>Built with heart for the game.</p>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="interactive-glow inline-flex h-11 w-11 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
  >
    {children}
  </a>
);
