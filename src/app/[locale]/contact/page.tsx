import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { hreflangAlternates } from "@/lib/alternates";
import { absoluteUrl } from "@/lib/site-url";

import { SocialLinks } from "@/components/social-links";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = `${t("contactTitle")} — ${t("siteName")}`;
  const description = t("contactDescription");

  return {
    title,
    description,
    alternates: hreflangAlternates(locale, "/contact"),
    openGraph: {
      title,
      description,
      locale,
      url: absoluteUrl(locale, "/contact"),
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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Contact");

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">{t("title")}</h1>
        <p className="text-base leading-relaxed text-muted-foreground">{t("description")}</p>
      </header>
      <SocialLinks />
    </div>
  );
}
