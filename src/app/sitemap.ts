import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";

const paths = ["/", "/work", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of paths) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
