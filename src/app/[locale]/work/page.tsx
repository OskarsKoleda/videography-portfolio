import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { portfolioItems } from "@/content/portfolio";
import { hreflangAlternates } from "@/lib/alternates";
import { absoluteUrl } from "@/lib/site-url";

import { PortfolioCard } from "@/components/portfolio-card";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = `${t("workTitle")} — ${t("siteName")}`;
  const description = t("workDescription");

  return {
    title,
    description,
    alternates: hreflangAlternates(locale, "/work"),
    openGraph: {
      title,
      description,
      locale,
      url: absoluteUrl(locale, "/work"),
      siteName: t("siteName"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Work");

  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">{t("title")}</h1>
        <p className="text-base leading-relaxed text-muted-foreground">{t("description")}</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
