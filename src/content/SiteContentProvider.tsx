import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_SITE_CONTENT, SiteContent } from "@/content/siteContent";
import { fetchSiteContentFromSanity } from "@/content/fetchSiteContentFromSanity";

const SiteContentContext = createContext<SiteContent>(DEFAULT_SITE_CONTENT);

export const SiteContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const remote = await fetchSiteContentFromSanity();
        if (!remote || cancelled) return;
        setContent((current) => mergeSiteContent(current, remote));
      } catch {
        // Silent fallback to local content keeps the site stable.
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => content, [content]);

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);

const mergeSiteContent = (
  base: SiteContent,
  incoming: Partial<SiteContent>
): SiteContent => ({
  socials: { ...base.socials, ...incoming.socials },
  navItems: incoming.navItems ?? base.navItems,
  storySections: incoming.storySections ?? base.storySections,
  hero: { ...base.hero, ...incoming.hero },
  about: {
    ...base.about,
    ...incoming.about,
    paragraphs: incoming.about?.paragraphs ?? base.about.paragraphs,
    stats: incoming.about?.stats ?? base.about.stats,
  },
  whatWeDo: {
    ...base.whatWeDo,
    ...incoming.whatWeDo,
    items: incoming.whatWeDo?.items ?? base.whatWeDo.items,
  },
  community: {
    ...base.community,
    ...incoming.community,
    pills: incoming.community?.pills ?? base.community.pills,
  },
  contact: {
    ...base.contact,
    ...incoming.contact,
  },
});
