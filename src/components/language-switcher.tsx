"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const active = useLocale();
  const t = useTranslations("Language");

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium"
      aria-label={t("label")}
    >
      {routing.locales.map((locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            className={
              isActive
                ? "rounded-md bg-secondary px-2 py-1 text-secondary-foreground"
                : "rounded-md px-2 py-1 text-muted-foreground transition hover:bg-secondary/60 hover:text-foreground"
            }
            hrefLang={locale}
            lang={locale}
          >
            {locale === "lv" ? t("lv") : locale === "en" ? t("en") : t("ru")}
          </Link>
        );
      })}
    </div>
  );
}
