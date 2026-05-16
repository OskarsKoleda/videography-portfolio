import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { featuredPortfolioItems } from "@/content/portfolio";
import { site } from "@/content/site";
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
  const tLayout = await getTranslations("Layout");
  const featured = featuredPortfolioItems();
  const heroPortraitSrc = site.images.homeHeroPortrait;

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-10 text-balance lg:gap-12">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] xl:grid-cols-[1fr_minmax(0,24rem)] lg:gap-12">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight lg:text-4xl">
              {t("title")}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{t("lead")}</p>
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
          </div>

          <figure className="relative mx-auto w-full max-w-[min(100%,20rem)] lg:mx-0 lg:max-w-none">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute -right-4 top-4 size-[min(100%,18rem)] rounded-full bg-primary/15 blur-3xl md:-right-8 md:top-8" />
              <div className="absolute bottom-0 right-1/4 size-48 rounded-full bg-chart-2/25 blur-2xl" />
              <div className="absolute left-0 top-1/3 size-32 rounded-full bg-accent/40 blur-xl" />
            </div>
            {heroPortraitSrc ? (
              <Image
                src={heroPortraitSrc}
                alt={tLayout("heroImageAlt")}
                width={1023}
                height={1537}
                className="relative z-10 h-auto w-full"
                sizes="(min-width: 1280px) 24rem, (min-width: 1024px) 20rem, min(90vw, 20rem)"
                priority
              />
            ) : (
              <div className="relative z-10 flex min-h-[14rem] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {tLayout("imageSlot")}
                </span>
                <span className="max-w-[14rem] text-xs leading-relaxed text-muted-foreground/80">
                  {tLayout("heroImageHint")}
                </span>
              </div>
            )}
          </figure>
        </div>

        <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
          <iframe
            title={t("heroVideoTitle")}
            src="https://www.youtube-nocookie.com/embed/Ot9W8B8WzW0?autoplay=1&mute=1&playsinline=1&rel=0"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
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
