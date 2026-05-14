import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={routing.defaultLocale}
      className={`dark ${inter.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-svh bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
