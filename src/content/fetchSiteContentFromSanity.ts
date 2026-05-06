import { createClient } from "@sanity/client";
import type { IconKey, SiteContent } from "@/content/siteContent";

type SanitySiteSettings = {
  socials?: Partial<SiteContent["socials"]>;
  navItems?: { href?: string; label?: string }[];
  storySections?: { id?: string; label?: string }[];
  hero?: Partial<SiteContent["hero"]>;
  about?: {
    eyebrow?: string;
    title?: string;
    paragraphs?: string[];
    stats?: { n?: string; l?: string }[];
  };
  whatWeDo?: {
    eyebrow?: string;
    title?: string;
    items?: { icon?: string; title?: string; desc?: string }[];
  };
  community?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    pills?: string[];
  };
  contact?: {
    eyebrow?: string;
    title?: string;
    body?: string;
  };
};

const VALID_ICONS = new Set<IconKey>([
  "flame",
  "trophy",
  "trendingUp",
  "sparkles",
  "film",
]);

const QUERY = `*[_type == "siteSettings"][0]{
  "cacheBust": $cacheBust,
  socials{instagram,tiktok,youtube,email},
  navItems[]{href,label},
  storySections[]{id,label},
  hero{eyebrow,titleTop,titleBottom},
  about{
    eyebrow,
    title,
    paragraphs,
    stats[]{n,l}
  },
  whatWeDo{
    eyebrow,
    title,
    items[]{icon,title,desc}
  },
  community{
    eyebrow,
    title,
    body,
    pills
  },
  contact{
    eyebrow,
    title,
    body
  }
}`;

export const fetchSiteContentFromSanity = async (): Promise<Partial<SiteContent> | null> => {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || "7qw9rsri";
  const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || "production";

  const client = createClient({
    projectId,
    dataset,
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? "2026-05-01",
    // Disable CDN for instant editor-to-site updates after publish.
    useCdn: false,
    perspective: "published",
  });

  const data = await client.fetch<SanitySiteSettings | null>(
    QUERY,
    // Add a throwaway param to avoid stubborn intermediary caches.
    { cacheBust: Date.now() },
    { cache: "no-store" as RequestCache }
  );
  if (!data) return null;

  return {
    socials: sanitizeSocials(data.socials),
    navItems: sanitizeNavItems(data.navItems),
    storySections: sanitizeStorySections(data.storySections),
    hero: sanitizeHero(data.hero),
    about: sanitizeAbout(data.about),
    whatWeDo: sanitizeWhatWeDo(data.whatWeDo),
    community: sanitizeCommunity(data.community),
    contact: sanitizeContact(data.contact),
  };
};

const sanitizeSocials = (socials?: SanitySiteSettings["socials"]) => {
  if (!socials) return undefined;
  const next: Partial<SiteContent["socials"]> = {};
  if (typeof socials.instagram === "string") next.instagram = socials.instagram;
  if (typeof socials.tiktok === "string") next.tiktok = socials.tiktok;
  if (typeof socials.youtube === "string") next.youtube = socials.youtube;
  if (typeof socials.email === "string") next.email = socials.email;
  return Object.keys(next).length ? next : undefined;
};

const sanitizeNavItems = (items?: SanitySiteSettings["navItems"]) => {
  if (!items?.length) return undefined;
  const clean = items
    .filter((i) => typeof i?.href === "string" && typeof i?.label === "string")
    .map((i) => ({ href: i.href as string, label: i.label as string }));
  return clean.length ? clean : undefined;
};

const sanitizeStorySections = (items?: SanitySiteSettings["storySections"]) => {
  if (!items?.length) return undefined;
  const clean = items
    .filter((i) => typeof i?.id === "string" && typeof i?.label === "string")
    .map((i) => ({ id: i.id as string, label: i.label as string }));
  return clean.length ? clean : undefined;
};

const sanitizeHero = (hero?: SanitySiteSettings["hero"]) => {
  if (!hero) return undefined;
  const next: Partial<SiteContent["hero"]> = {};
  if (typeof hero.eyebrow === "string") next.eyebrow = hero.eyebrow;
  if (typeof hero.titleTop === "string") next.titleTop = hero.titleTop;
  if (typeof hero.titleBottom === "string") next.titleBottom = hero.titleBottom;
  return Object.keys(next).length ? next : undefined;
};

const sanitizeAbout = (about?: SanitySiteSettings["about"]) => {
  if (!about) return undefined;
  const next: Partial<SiteContent["about"]> = {};
  if (typeof about.eyebrow === "string") next.eyebrow = about.eyebrow;
  if (typeof about.title === "string") next.title = about.title;
  if (Array.isArray(about.paragraphs) && about.paragraphs.length >= 2) {
    next.paragraphs = [about.paragraphs[0], about.paragraphs[1]];
  }
  if (Array.isArray(about.stats)) {
    const stats = about.stats
      .filter((s) => typeof s?.n === "string" && typeof s?.l === "string")
      .map((s) => ({ n: s.n as string, l: s.l as string }));
    if (stats.length) next.stats = stats;
  }
  return Object.keys(next).length ? next : undefined;
};

const sanitizeWhatWeDo = (whatWeDo?: SanitySiteSettings["whatWeDo"]) => {
  if (!whatWeDo) return undefined;
  const next: Partial<SiteContent["whatWeDo"]> = {};
  if (typeof whatWeDo.eyebrow === "string") next.eyebrow = whatWeDo.eyebrow;
  if (typeof whatWeDo.title === "string") next.title = whatWeDo.title;
  if (Array.isArray(whatWeDo.items)) {
    const items = whatWeDo.items
      .filter(
        (item) =>
          typeof item?.icon === "string" &&
          VALID_ICONS.has(item.icon as IconKey) &&
          typeof item?.title === "string" &&
          typeof item?.desc === "string"
      )
      .map((item) => ({
        icon: item.icon as IconKey,
        title: item.title as string,
        desc: item.desc as string,
      }));
    if (items.length) next.items = items;
  }
  return Object.keys(next).length ? next : undefined;
};

const sanitizeCommunity = (community?: SanitySiteSettings["community"]) => {
  if (!community) return undefined;
  const next: Partial<SiteContent["community"]> = {};
  if (typeof community.eyebrow === "string") next.eyebrow = community.eyebrow;
  if (typeof community.title === "string") next.title = community.title;
  if (typeof community.body === "string") next.body = community.body;
  if (Array.isArray(community.pills)) {
    const pills = community.pills.filter((pill) => typeof pill === "string");
    if (pills.length) next.pills = pills;
  }
  return Object.keys(next).length ? next : undefined;
};

const sanitizeContact = (contact?: SanitySiteSettings["contact"]) => {
  if (!contact) return undefined;
  const next: Partial<SiteContent["contact"]> = {};
  if (typeof contact.eyebrow === "string") next.eyebrow = contact.eyebrow;
  if (typeof contact.title === "string") next.title = contact.title;
  if (typeof contact.body === "string") next.body = contact.body;
  return Object.keys(next).length ? next : undefined;
};
