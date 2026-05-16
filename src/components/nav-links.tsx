"use client";

import type { LucideIcon } from "lucide-react";
import { Award, Clapperboard, Home, Mail, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { href: string; key: "home" | "work" | "credits" | "about" | "contact"; Icon: LucideIcon }[] = [
  { href: "/", key: "home", Icon: Home },
  { href: "/work", key: "work", Icon: Clapperboard },
  { href: "/credits", key: "credits", Icon: Award },
  { href: "/about", key: "about", Icon: User },
  { href: "/contact", key: "contact", Icon: Mail },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ layout = "sidebar" }: { layout?: "sidebar" | "bar" }) {
  const pathname = usePathname();
  const t = useTranslations("Nav");

  if (layout === "bar") {
    return (
      <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm">
        {NAV_ITEMS.map(({ href, key }) => {
          const active = isActivePath(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors hover:text-foreground",
                  active ? "font-semibold text-foreground" : "text-muted-foreground",
                )}
              >
                {t(key)}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-1 text-sm">
      {NAV_ITEMS.map(({ href, key, Icon }) => {
        const active = isActivePath(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                active
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
              <span>{t(key)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
