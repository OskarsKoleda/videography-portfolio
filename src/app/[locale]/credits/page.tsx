import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { hreflangAlternates } from "@/lib/alternates";
import { absoluteUrl } from "@/lib/site-url";

const CREDIT_KEYS = [
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item6",
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = `${t("creditsTitle")} — ${t("siteName")}`;
  const description = t("creditsDescription");

  return {
    title,
    description,
    alternates: hreflangAlternates(locale, "/credits"),
    openGraph: {
      title,
      description,
      locale,
      url: absoluteUrl(locale, "/credits"),
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

export default async function CreditsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Credits");

  return (
    <div className="flex max-w-2xl flex-col gap-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">{t("title")}</h1>
        <p className="text-base leading-relaxed text-muted-foreground">{t("description")}</p>
      </header>
      <ul className="flex flex-col gap-4 border-l-2 border-border pl-6">
        {CREDIT_KEYS.map((key) => (
          <li key={key} className="text-base leading-relaxed text-muted-foreground">
            <span className="text-foreground">{t(`${key}.title`)}</span>
            <span className="text-muted-foreground"> — {t(`${key}.detail`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
