import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { hreflangAlternates } from "@/lib/alternates";
import { absoluteUrl } from "@/lib/site-url";

const OPERATOR_KEYS = ["item1", "item2", "item3", "item4", "item5", "item6"] as const;
const MONTAGE_KEYS = ["item1", "item2", "item3", "item4", "item5"] as const;

type CreditSection = "operator" | "montage";

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

function CreditList({
  section,
  keys,
  heading,
  items,
}: {
  section: CreditSection;
  keys: readonly string[];
  heading: string;
  items: (path: string) => { title: string; detail: string };
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight">{heading}</h2>
      <ul className="flex flex-col gap-4 border-l-2 border-primary/35 pl-6">
        {keys.map((key) => {
          const { title, detail } = items(`${section}.${key}`);
          return (
            <li key={`${section}-${key}`} className="text-base leading-relaxed text-muted-foreground">
              <span className="text-foreground">{title}</span>
              <span className="text-muted-foreground"> — {detail}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default async function CreditsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Credits");

  const getItem = (path: string) => ({
    title: t(`${path}.title`),
    detail: t(`${path}.detail`),
  });

  return (
    <div className="flex max-w-2xl flex-col gap-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">{t("title")}</h1>
        <p className="text-base leading-relaxed text-muted-foreground">{t("description")}</p>
      </header>
      <div className="flex flex-col gap-12">
        <CreditList
          section="operator"
          keys={OPERATOR_KEYS}
          heading={t("operatorHeading")}
          items={getItem}
        />
        <CreditList section="montage" keys={MONTAGE_KEYS} heading={t("montageHeading")} items={getItem} />
      </div>
    </div>
  );
}
