import { getTranslations } from "next-intl/server";

import { site } from "@/content/site";

import { SocialLinks } from "@/components/social-links";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-16 border-t border-border/80 bg-card/30">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold">{site.personName}</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">{t("tagline")}</p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <SocialLinks variant="compact" />
          <p className="text-xs text-muted-foreground">{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
