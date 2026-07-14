"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: string };

const CUSTOMER_NAV: NavItem[] = [
  { href: "/katalog", label: "Beranda", icon: "home" },
  { href: "/pesanan", label: "Pesanan", icon: "receipt_long" },
  { href: "/profil", label: "Profil", icon: "person" },
];

/**
 * Customer shell — mobile-first, centered at max-w-md (480px) on desktop
 * to mimic a phone frame. Bottom nav always visible (mobile pattern).
 */
export function CustomerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex justify-center bg-muted/30">
      <div className="w-full max-w-md bg-background min-h-screen flex flex-col relative shadow-xl">
        {children}

        {/* Bottom nav (always visible — primary entrypoint for customer) */}
        <nav className="sticky bottom-0 z-40 bg-card/95 backdrop-blur-md border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
          <div className="flex justify-around items-center h-20 px-2 pb-2">
            {CUSTOMER_NAV.map((n) => {
              const active =
                n.href === "/katalog"
                  ? pathname === "/katalog"
                  : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn(
                    "flex flex-col items-center justify-center flex-1 h-full group",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-full px-5 py-1.5 mb-1 transition-all group-active:scale-90",
                      active
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <Icon name={n.icon} size={22} filled={active ? 1 : 0} />
                  </div>
                  <span
                    className={cn(
                      "text-[11px] tracking-wide",
                      active
                        ? "font-semibold text-primary"
                        : "font-medium text-muted-foreground",
                    )}
                  >
                    {n.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
