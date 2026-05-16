import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { site } from "@/content/site";

type SocialEntry = {
  id: string;
  href: string;
  labelKey: "facebook" | "instagram" | "twitter" | "youtube" | "vimeo";
};

export async function SocialLinks({ variant }: { variant?: "default" | "compact" }) {
  const t = await getTranslations("Contact");

  const entries = [
    ...(site.social.facebook
      ? [
          {
            id: "facebook",
            href: site.social.facebook,
            labelKey: "facebook" as const,
          },
        ]
      : []),
    {
      id: "instagram",
      href: site.social.instagram,
      labelKey: "instagram" as const,
    },
    ...(site.social.twitter
      ? [
          {
            id: "twitter",
            href: site.social.twitter,
            labelKey: "twitter" as const,
          },
        ]
      : []),
    {
      id: "youtube",
      href: site.social.youtube,
      labelKey: "youtube" as const,
    },
    ...(site.social.vimeo
      ? [
          {
            id: "vimeo",
            href: site.social.vimeo,
            labelKey: "vimeo" as const,
          },
        ]
      : []),
  ].filter((e) => e.href.length > 0) satisfies SocialEntry[];

  const listClass =
    variant === "compact"
      ? "flex flex-wrap gap-3 text-sm"
      : "flex flex-col gap-3 sm:flex-row sm:flex-wrap";

  return (
    <ul className={listClass}>
      {entries.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-secondary/40"
          >
            {t(item.labelKey)}
            <ExternalLink className="size-4 text-muted-foreground" aria-hidden />
            <span className="sr-only">{t("opensNewTab")}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
