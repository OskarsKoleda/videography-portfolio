/** Editable site identity — swap placeholders before launch. */
export const site = {
  /** Used in metadata and JSON-LD */
  personName: "Operator Name",
  /** Social profiles for footer, contact page, and JSON-LD `sameAs` */
  social: {
    instagram: "https://www.instagram.com/example",
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
