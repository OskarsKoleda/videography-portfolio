import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { site } from "@/content/site";

import { LanguageSwitcher } from "@/components/language-switcher";
import { NavLinks } from "@/components/nav-links";
import { SidebarSocialIcons } from "@/components/sidebar-social-icons";
import { Link } from "@/i18n/navigation";

export async function SiteSidebar() {
  const t = await getTranslations("Layout");
  const tFooter = await getTranslations("Footer");
  const avatarSrc = site.images.sidebarAvatar;

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-sidebar-border bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:h-svh md:w-[min(100%,17.5rem)] md:border-b-0 md:border-r">
      <div className="flex flex-1 flex-col gap-8 p-6 md:min-h-0 md:justify-between">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-3 md:text-center">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-sidebar-border bg-sidebar-accent/30 md:size-24">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={t("profileImageAlt", { name: site.personName })}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                  aria-hidden
                >
                  {t("imageSlot")}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 md:w-full">
              <Link
                href="/"
                className="block text-base font-semibold tracking-tight text-sidebar-foreground transition hover:opacity-80"
              >
                {site.personName}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{tFooter("tagline")}</p>
            </div>
            <div className="shrink-0 md:hidden">
              <LanguageSwitcher />
            </div>
          </div>

          <nav aria-label="Primary">
            <NavLinks layout="sidebar" />
          </nav>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>

        <SidebarSocialIcons />
      </div>
    </aside>
  );
}
