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
    titleKey: "p1_title",
    categoryKey: "p1_category",
    clientKey: "p1_client",
  },
  {
    id: "p2",
    type: "placeholder",
    titleKey: "p2_title",
    categoryKey: "p2_category",
    clientKey: "p2_client",
  },
  {
    id: "p7",
    type: "youtube",
    featured: true,
    youtubeId: "wEVhYynriZw",
    titleKey: "p7_title",
    categoryKey: "p7_category",
  },
  {
    id: "p8",
    type: "youtube",
    featured: true,
    youtubeId: "eD5DbSoN6sg",
    titleKey: "p8_title",
    categoryKey: "p8_category",
  },
  {
    id: "p9",
    type: "youtube",
    featured: true,
    youtubeId: "aGpBdDQ_43k",
    titleKey: "p9_title",
    categoryKey: "p9_category",
  },
  {
    id: "p10",
    type: "youtube",
    featured: true,
    youtubeId: "p2ujTomRhKU",
    titleKey: "p10_title",
    categoryKey: "p10_category",
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
