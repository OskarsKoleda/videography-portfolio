import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang='${locale}'`,
        }}
      />
      <JsonLd locale={locale} />
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-12 lg:px-8">
          {children}
        </main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}
