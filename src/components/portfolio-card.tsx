import { Play } from "lucide-react";
import { getTranslations } from "next-intl/server";

import type { PortfolioItem } from "@/content/portfolio";

type PortfolioCardProps = {
  item: PortfolioItem;
};

export async function PortfolioCard({ item }: PortfolioCardProps) {
  const t = await getTranslations("PortfolioItems");

  const title = t(item.titleKey);
  const category = t(item.categoryKey);
  const client = "clientKey" in item && item.clientKey ? t(item.clientKey) : null;

  if (item.type === "youtube") {
    return (
      <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="aspect-video w-full bg-muted">
          <iframe
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="space-y-1 px-4 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {category}
          </p>
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          {client ? (
            <p className="text-sm text-muted-foreground">{client}</p>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="relative aspect-video w-full bg-gradient-to-br from-muted via-secondary/40 to-background">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-14 items-center justify-center rounded-full border border-border/80 bg-background/80 text-muted-foreground shadow-sm">
            <Play className="size-6" aria-hidden />
            <span className="sr-only">Demo</span>
          </div>
        </div>
      </div>
      <div className="space-y-1 px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {category}
        </p>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {client ? (
          <p className="text-sm text-muted-foreground">{client}</p>
        ) : null}
      </div>
    </article>
  );
}
