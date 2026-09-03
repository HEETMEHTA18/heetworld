export const site = {
  name: "Heet Mehta",
  initials: "HEET",
  title: "AI / ML · Software · Experiments",
  shortTitle: "Heet Mehta",
  description:
    "Computer engineering student building intelligent systems, developer tools, and machine learning products. I think in systems, ship in public, and write about what I learn.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://heetworld.tech",
  worldUrl: process.env.NEXT_PUBLIC_WORLD_URL ?? "https://explore.heetworld.tech/",
  locale: "en_US",
  location: "India",
  email: "explore@heetworld.tech",
  twitter: "@heetmehta",
  author: {
    name: "Heet Mehta",
    rss: "/rss.xml",
  },
  socials: {
    github: "https://github.com/heetmehta18",
    linkedin: "https://linkedin.com/in/heetmehta18",
    twitter: "https://x.com/heetmehta",
    email: "mailto:explore@heetworld.tech",
  },
  spotify: {
    track: "https://open.spotify.com/track/0q4442eIt44kTWEhkoTlh8",
    embed: "https://open.spotify.com/embed/track/0q4442eIt44kTWEhkoTlh8",
    title: "Safar — Talha Anjum",
  },
} as const;

export type NavLink = {
  href: string;
  label: string;
  sameTab?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/projects", label: "Work" },
  { href: site.worldUrl, label: "World", sameTab: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const MORE_LINKS: NavLink[] = [
  { href: "/now", label: "Now" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/writing", label: "Writing" },
  { href: "/resume", label: "Resume" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/stack", label: "Stack" },
];

export const FOOTER_LINKS = [
  { href: "/stack", label: "Stack" },
  { href: "/now", label: "Now" },
  { href: "/resume", label: "Resume" },
  { href: "/uses", label: "Uses" },
] as const;