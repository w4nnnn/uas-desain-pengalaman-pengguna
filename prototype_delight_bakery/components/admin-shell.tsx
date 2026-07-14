"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: string };

const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Beranda", icon: "home" },
  { href: "/admin/orders", label: "Pesanan", icon: "receipt_long" },
  { href: "/admin/profile", label: "Profil", icon: "person" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="theme-admin min-h-screen flex flex-col bg-background text-foreground">
      {/* Desktop top app bar with brand + nav */}
      <header className="sticky top-0 z-40 h-16 bg-card border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-heading text-lg font-bold text-primary tracking-tight"
          >
            <span className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20">
              <Icon name="bakery_dining" size={20} filled={1} />
            </span>
            Delight Bakery
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {ADMIN_NAV.map((n) => {
              const active =
                n.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon name={n.icon} size={18} filled={active ? 1 : 0} />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors">
              <Icon name="notifications" size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-card" />
            </button>
            <div className="hidden md:flex w-9 h-9 rounded-full bg-primary/10 items-center justify-center border border-primary/20 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop&crop=faces"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden sticky bottom-0 z-40 bg-card border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex justify-around items-center h-20 px-2 pb-2">
          {ADMIN_NAV.map((n) => {
            const active =
              n.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <div
                  className={cn(
                    "rounded-xl px-5 py-1.5 mb-1 transition-all",
                    active && "bg-primary/10",
                  )}
                >
                  <Icon name={n.icon} size={22} filled={active ? 1 : 0} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide">
                  {n.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
