import { site, socialSameAs } from "@/content/site";
import { absoluteUrl } from "@/lib/site-url";

type JsonLdProps = {
  locale: string;
};

export function JsonLd({ locale }: JsonLdProps) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.personName,
    url: absoluteUrl(locale, "/"),
    sameAs: socialSameAs(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
