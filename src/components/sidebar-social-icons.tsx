import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { site } from "@/content/site";

const SIDEBAR_SOCIAL = [
  {
    id: "facebook",
    href: site.social.facebook,
    icon: site.socialIcons.facebook,
    labelKey: "facebook" as const,
  },
  {
    id: "instagram",
    href: site.social.instagram,
    icon: site.socialIcons.instagram,
    labelKey: "instagram" as const,
  },
  {
    id: "twitter",
    href: site.social.twitter,
    icon: site.socialIcons.twitter,
    labelKey: "twitter" as const,
  },
  {
    id: "youtube",
    href: site.social.youtube,
    icon: site.socialIcons.youtube,
    labelKey: "youtube" as const,
  },
] as const;

export async function SidebarSocialIcons() {
  const t = await getTranslations("Contact");

  const items = SIDEBAR_SOCIAL.filter(
    (item): item is (typeof SIDEBAR_SOCIAL)[number] & { href: string } =>
      typeof item.href === "string" && item.href.length > 0,
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
      {items.map(({ id, href, icon, labelKey }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(labelKey)}
            title={t(labelKey)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-sidebar-border transition hover:border-primary/40 hover:bg-sidebar-accent/60"
          >
            <Image
              src={icon}
              alt=""
              width={20}
              height={20}
              className="size-5"
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
