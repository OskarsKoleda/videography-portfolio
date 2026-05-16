/** Editable site identity — swap placeholders before launch. */
export const site = {
  /** Used in metadata and JSON-LD */
  personName: "Konstantin Tarantino",
  /**
   * Static image URLs (files live in `/public`, e.g. `public/images/avatar.jpg` → `/images/avatar.jpg`).
   * Set to a path string when ready; `null` keeps the on-screen placeholder slot.
   */
  images: {
    sidebarAvatar: "/images/main-avatar.png",
    homeHeroPortrait: "/images/big-operator-welcome-photo.png",
  },
  /** Icon paths for sidebar (files in `public/images`) */
  socialIcons: {
    facebook: "/images/facebook-3-logo-svgrepo-com.svg",
    instagram: "/images/instagram.svg",
    twitter: "/images/twitter-3-logo-svgrepo-com.svg",
    youtube: "/images/youtube-color-svgrepo-com.svg",
  },
  /** Social profiles for footer, contact page, and JSON-LD `sameAs` */
  social: {
    facebook: "https://www.facebook.com/example" as string | null,
    instagram: "https://www.instagram.com/example",
    twitter: "https://twitter.com/example" as string | null,
    youtube: "https://www.youtube.com/@example",
    /** Optional — set to null and hide in UI if unused */
    telegram: "https://t.me/example" as string | null,
    vimeo: null as string | null,
  },
} as const;

export function socialSameAs(): string[] {
  return Object.values(site.social).filter(
    (u): u is string => typeof u === "string" && u.length > 0,
  );
}
