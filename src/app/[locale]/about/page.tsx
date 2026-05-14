import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { hreflangAlternates } from "@/lib/alternates";
import { absoluteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = `${t("aboutTitle")} — ${t("siteName")}`;
  const description = t("aboutDescription");

  return {
    title,
    description,
    alternates: hreflangAlternates(locale, "/about"),
    openGraph: {
      title,
      description,
      locale,
      url: absoluteUrl(locale, "/about"),
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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");

  return (
    <div className="flex max-w-2xl flex-col gap-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">{t("title")}</h1>
        <p className="text-base leading-relaxed text-muted-foreground">{t("lead")}</p>
      </header>
      <div className="flex flex-col gap-6 text-base leading-relaxed text-muted-foreground">
        <p>{t("body1")}</p>
        <p>{t("body2")}</p>
        <p>{t("body3")}</p>
      </div>
    </div>
  );
}
