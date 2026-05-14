import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { featuredPortfolioItems } from "@/content/portfolio";
import { Link } from "@/i18n/navigation";
import { hreflangAlternates } from "@/lib/alternates";
import { absoluteUrl } from "@/lib/site-url";

import { PortfolioCard } from "@/components/portfolio-card";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = `${t("homeTitle")} — ${t("siteName")}`;
  const description = t("homeDescription");

  return {
    title,
    description,
    alternates: hreflangAlternates(locale, "/"),
    openGraph: {
      title,
      description,
      locale,
      url: absoluteUrl(locale, "/"),
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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const featured = featuredPortfolioItems();

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-6 text-balance">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight lg:text-4xl">
          {t("title")}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("lead")}
        </p>
        <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
          <iframe
            title={t("heroVideoTitle")}
            src="https://www.youtube-nocookie.com/embed/Ot9W8B8WzW0?autoplay=1&mute=1&playsinline=1&rel=0"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/work"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {t("ctaWork")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/80"
          >
            {t("ctaContact")}
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight">{t("featuredHeading")}</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
