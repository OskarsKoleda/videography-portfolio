import { getTranslations } from "next-intl/server";

import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

import { LanguageSwitcher } from "@/components/language-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="border-b border-border/80 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {site.personName}
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-6">
          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition hover:text-foreground">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link href="/work" className="transition hover:text-foreground">
                {t("work")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-foreground">
                {t("contact")}
              </Link>
            </li>
          </ul>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
