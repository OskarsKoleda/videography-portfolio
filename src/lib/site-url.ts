import { routing } from "@/i18n/routing";

/** Base URL for canonical links, Open Graph, and sitemap (set in production / Vercel). */
export function getSiteUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  if (raw) {
    try {
      return new URL(raw.endsWith("/") ? raw.slice(0, -1) : raw);
    } catch {
      /* fall through */
    }
  }

  return new URL(`http://localhost:${process.env.PORT ?? "3000"}`);
}

export function localePath(locale: string, pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${path === "/" ? "" : path}`;
}

export function absoluteUrl(locale: string, pathname: string): string {
  const base = getSiteUrl().origin;
  return `${base}${localePath(locale, pathname)}`;
}

export const locales = routing.locales;
