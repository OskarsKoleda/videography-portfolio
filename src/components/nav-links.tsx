"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", key: "home" as const },
  { href: "/work", key: "work" as const },
  { href: "/credits", key: "credits" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations("Nav");

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
                active
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground",
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
