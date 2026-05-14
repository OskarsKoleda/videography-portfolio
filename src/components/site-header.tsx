import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

import { LanguageSwitcher } from "@/components/language-switcher";
import { NavLinks } from "@/components/nav-links";

export async function SiteHeader() {
  return (
    <header className="border-b border-border/80 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {site.personName}
        </Link>
        <nav className="flex flex-1 flex-wrap items-center justify-end gap-4 sm:gap-6">
          <NavLinks />
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
