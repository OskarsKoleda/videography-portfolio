import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";

export function hreflangAlternates(locale: string, pathname: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = absoluteUrl(l, pathname);
  }
  return {
    canonical: absoluteUrl(locale, pathname),
    languages: {
      ...languages,
      "x-default": absoluteUrl(routing.defaultLocale, pathname),
    },
  };
}
