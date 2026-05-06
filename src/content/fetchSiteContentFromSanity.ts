import { createClient } from "@sanity/client";
import type { IconKey, SiteContent } from "@/content/siteContent";

type SanitySiteSettings = {
  socials?: Partial<SiteContent["socials"]>;
  navItems?: { href?: string; label?: string }[];
  storySections?: { id?: string; label?: string }[];
  hero?: Partial<SiteContent["hero"]>;
  visuals?: Partial<SiteContent["visuals"]>;
  effects?: Partial<SiteContent["effects"]>;
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
  visuals{logoUrl,heroBgUrl,communityBgUrl},
  effects{
    enableIntroLoader,
    enableAmbientOrbs,
    showSectionTransitions,
    loaderSpeed,
    moodShiftStrength
  },
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

const normalizeText = (value: string) =>
  value
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .trim();

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
    visuals: sanitizeVisuals(data.visuals),
    effects: sanitizeEffects(data.effects),
    about: sanitizeAbout(data.about),
    whatWeDo: sanitizeWhatWeDo(data.whatWeDo),
    community: sanitizeCommunity(data.community),
    contact: sanitizeContact(data.contact),
  };
};

const sanitizeSocials = (socials?: SanitySiteSettings["socials"]) => {
  if (!socials) return undefined;
  const next: Partial<SiteContent["socials"]> = {};
  if (typeof socials.instagram === "string") next.instagram = normalizeText(socials.instagram);
  if (typeof socials.tiktok === "string") next.tiktok = normalizeText(socials.tiktok);
  if (typeof socials.youtube === "string") next.youtube = normalizeText(socials.youtube);
  if (typeof socials.email === "string") next.email = normalizeText(socials.email);
  return Object.keys(next).length ? next : undefined;
};

const sanitizeNavItems = (items?: SanitySiteSettings["navItems"]) => {
  if (!items?.length) return undefined;
  const clean = items
    .filter((i) => typeof i?.href === "string" && typeof i?.label === "string")
    .map((i) => ({
      href: normalizeText(i.href as string),
      label: normalizeText(i.label as string),
    }));
  return clean.length ? clean : undefined;
};

const sanitizeStorySections = (items?: SanitySiteSettings["storySections"]) => {
  if (!items?.length) return undefined;
  const clean = items
    .filter((i) => typeof i?.id === "string" && typeof i?.label === "string")
    .map((i) => ({
      id: normalizeText(i.id as string),
      label: normalizeText(i.label as string),
    }));
  return clean.length ? clean : undefined;
};

const sanitizeHero = (hero?: SanitySiteSettings["hero"]) => {
  if (!hero) return undefined;
  const next: Partial<SiteContent["hero"]> = {};
  if (typeof hero.eyebrow === "string") next.eyebrow = normalizeText(hero.eyebrow);
  if (typeof hero.titleTop === "string") next.titleTop = normalizeText(hero.titleTop);
  if (typeof hero.titleBottom === "string") next.titleBottom = normalizeText(hero.titleBottom);
  return Object.keys(next).length ? next : undefined;
};

const sanitizeVisuals = (visuals?: SanitySiteSettings["visuals"]) => {
  if (!visuals) return undefined;
  const next: Partial<SiteContent["visuals"]> = {};
  if (typeof visuals.logoUrl === "string") next.logoUrl = normalizeText(visuals.logoUrl);
  if (typeof visuals.heroBgUrl === "string") next.heroBgUrl = normalizeText(visuals.heroBgUrl);
  if (typeof visuals.communityBgUrl === "string") {
    next.communityBgUrl = normalizeText(visuals.communityBgUrl);
  }
  return Object.keys(next).length ? next : undefined;
};

const sanitizeEffects = (effects?: SanitySiteSettings["effects"]) => {
  if (!effects) return undefined;
  const next: Partial<SiteContent["effects"]> = {};
  if (typeof effects.enableIntroLoader === "boolean") {
    next.enableIntroLoader = effects.enableIntroLoader;
  }
  if (typeof effects.enableAmbientOrbs === "boolean") {
    next.enableAmbientOrbs = effects.enableAmbientOrbs;
  }
  if (typeof effects.showSectionTransitions === "boolean") {
    next.showSectionTransitions = effects.showSectionTransitions;
  }
  if (
    typeof effects.loaderSpeed === "string" &&
    ["normal", "slow", "cinematic"].includes(effects.loaderSpeed)
  ) {
    next.loaderSpeed = effects.loaderSpeed as SiteContent["effects"]["loaderSpeed"];
  }
  if (typeof effects.moodShiftStrength === "number" && Number.isFinite(effects.moodShiftStrength)) {
    next.moodShiftStrength = Math.min(1, Math.max(0, effects.moodShiftStrength));
  }
  return Object.keys(next).length ? next : undefined;
};

const sanitizeAbout = (about?: SanitySiteSettings["about"]) => {
  if (!about) return undefined;
  const next: Partial<SiteContent["about"]> = {};
  if (typeof about.eyebrow === "string") next.eyebrow = normalizeText(about.eyebrow);
  if (typeof about.title === "string") next.title = normalizeText(about.title);
  if (Array.isArray(about.paragraphs) && about.paragraphs.length >= 2) {
    next.paragraphs = [normalizeText(about.paragraphs[0]), normalizeText(about.paragraphs[1])];
  }
  if (Array.isArray(about.stats)) {
    const stats = about.stats
      .filter((s) => typeof s?.n === "string" && typeof s?.l === "string")
      .map((s) => ({
        n: normalizeText(s.n as string),
        l: normalizeText(s.l as string),
      }));
    if (stats.length) next.stats = stats;
  }
  return Object.keys(next).length ? next : undefined;
};

const sanitizeWhatWeDo = (whatWeDo?: SanitySiteSettings["whatWeDo"]) => {
  if (!whatWeDo) return undefined;
  const next: Partial<SiteContent["whatWeDo"]> = {};
  if (typeof whatWeDo.eyebrow === "string") next.eyebrow = normalizeText(whatWeDo.eyebrow);
  if (typeof whatWeDo.title === "string") next.title = normalizeText(whatWeDo.title);
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
        title: normalizeText(item.title as string),
        desc: normalizeText(item.desc as string),
      }));
    if (items.length) next.items = items;
  }
  return Object.keys(next).length ? next : undefined;
};

const sanitizeCommunity = (community?: SanitySiteSettings["community"]) => {
  if (!community) return undefined;
  const next: Partial<SiteContent["community"]> = {};
  if (typeof community.eyebrow === "string") next.eyebrow = normalizeText(community.eyebrow);
  if (typeof community.title === "string") next.title = normalizeText(community.title);
  if (typeof community.body === "string") next.body = normalizeText(community.body);
  if (Array.isArray(community.pills)) {
    const pills = community.pills
      .filter((pill) => typeof pill === "string")
      .map((pill) => normalizeText(pill));
    if (pills.length) next.pills = pills;
  }
  return Object.keys(next).length ? next : undefined;
};

const sanitizeContact = (contact?: SanitySiteSettings["contact"]) => {
  if (!contact) return undefined;
  const next: Partial<SiteContent["contact"]> = {};
  if (typeof contact.eyebrow === "string") next.eyebrow = normalizeText(contact.eyebrow);
  if (typeof contact.title === "string") next.title = normalizeText(contact.title);
  if (typeof contact.body === "string") next.body = normalizeText(contact.body);
  return Object.keys(next).length ? next : undefined;
};
