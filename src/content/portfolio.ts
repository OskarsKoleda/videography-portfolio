export type PortfolioItem =
  | {
      id: string;
      type: "placeholder";
      featured?: boolean;
      /** Keys under `portfolioItems` in messages */
      titleKey: string;
      categoryKey: string;
      clientKey?: string;
    }
  | {
      id: string;
      type: "youtube";
      featured?: boolean;
      youtubeId: string;
      titleKey: string;
      categoryKey: string;
      clientKey?: string;
    };

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    type: "placeholder",
    featured: true,
    titleKey: "p1_title",
    categoryKey: "p1_category",
    clientKey: "p1_client",
  },
  {
    id: "p2",
    type: "placeholder",
    featured: true,
    titleKey: "p2_title",
    categoryKey: "p2_category",
    clientKey: "p2_client",
  },
  {
    id: "p3",
    type: "placeholder",
    titleKey: "p3_title",
    categoryKey: "p3_category",
    clientKey: "p3_client",
  },
  {
    id: "p4",
    type: "placeholder",
    titleKey: "p4_title",
    categoryKey: "p4_category",
  },
  {
    id: "p5",
    type: "placeholder",
    titleKey: "p5_title",
    categoryKey: "p5_category",
    clientKey: "p5_client",
  },
  {
    id: "p6",
    type: "placeholder",
    titleKey: "p6_title",
    categoryKey: "p6_category",
  },
];

export function featuredPortfolioItems(): PortfolioItem[] {
  return portfolioItems.filter((i) => i.featured);
}
