export type NavItem = {
  href: string;
  label: string;
};

export type StorySection = {
  id: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
};

export type StatItem = {
  n: string;
  l: string;
};

export type IconKey = "flame" | "trophy" | "trendingUp" | "sparkles" | "film";

export type WhatWeDoItem = {
  icon: IconKey;
  title: string;
  desc: string;
};

export type SiteContent = {
  socials: {
    instagram: string;
    tiktok: string;
    youtube: string;
    email: string;
  };
  navItems: NavItem[];
  storySections: StorySection[];
  hero: HeroContent;
  about: {
    eyebrow: string;
    title: string;
    paragraphs: [string, string];
    stats: StatItem[];
  };
  whatWeDo: {
    eyebrow: string;
    title: string;
    items: WhatWeDoItem[];
  };
  community: {
    eyebrow: string;
    title: string;
    body: string;
    pills: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
  };
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  socials: {
    instagram:
      "https://instagram.com/athletekingdm?igsh=MWFkY2RrajhqN2psMA==&utm_source=qr",
    tiktok: "https://tiktok.com/@athletekingdm?_t=8kQJrUQWZmw&_r=1",
    youtube: "https://www.youtube.com/@AthleteKingdom",
    email: "athletekingdomedits@gmail.com",
  },
  navItems: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#community", label: "Community" },
    { href: "#contact", label: "Contact" },
  ],
  storySections: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "what-we-do", label: "What We Do" },
    { id: "community", label: "Community" },
    { id: "contact", label: "Contact" },
  ],
  hero: {
    eyebrow: "Est. The Home of Sports",
    titleTop: "ATHLETE",
    titleBottom: "KINGDOM",
  },
  about: {
    eyebrow: "About",
    title: "Built for\nthose who\ncompete.",
    paragraphs: [
      "Athlete Kingdom is more than a sports page - it is a movement. We craft cinematic content that captures the heart of competition: the sweat, the silence before the whistle, the moments that change careers.",
      "Expect inspiring athlete stories, motivational edits, iconic sporting moments, and educational clips designed to push you forward - whether you are chasing greatness on the field or watching from the stands.",
    ],
    stats: [
      { n: "Unlimited", l: "Stories Told" },
      { n: "24/7", l: "Sports Energy" },
      { n: "1", l: "Kingdom" },
    ],
  },
  whatWeDo: {
    eyebrow: "What We Do",
    title: "The craft\nbehind the\nkingdom.",
    items: [
      {
        icon: "flame",
        title: "Inspiring Stories",
        desc: "Real athletes. Real journeys. The grit behind the glory.",
      },
      {
        icon: "trophy",
        title: "Iconic Sporting Moments",
        desc: "The plays, the wins, the chills - preserved cinematically.",
      },
      {
        icon: "trendingUp",
        title: "Athlete Growth",
        desc: "Educational clips and insights to sharpen your craft.",
      },
      {
        icon: "sparkles",
        title: "Motivational Clips",
        desc: "Daily fuel for the dreamers, builders, and grinders.",
      },
      {
        icon: "film",
        title: "Creative Sports Edits",
        desc: "Bold cuts, sharp cinematography, unforgettable energy.",
      },
    ],
  },
  community: {
    eyebrow: "The Movement",
    title: "Join the\nKingdom.",
    body: "Whether you are an athlete chasing greatness or a fan who lives for the moment - this is your home. Follow the movement, share the stories, become part of something bigger.",
    pills: ["Daily Content", "Athlete Stories", "Motivation & Growth"],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's\nconnect.",
    body: "Get in touch with Athlete Kingdom for collaborations, questions, copyright inquiries, or to connect with the sports community. Reach out via email or follow Athlete Kingdom on Instagram, TikTok, and YouTube. Whether you're an athlete, creator, or sports fan, this is the place to connect and become part of The Home of Sports.",
  },
};
