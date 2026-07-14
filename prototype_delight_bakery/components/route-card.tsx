"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  description: string;
  icon: string;
  tone: "admin" | "customer";
  /** Optional preview chip text (e.g. status). */
  meta?: string;
};

/**
 * Navigation card for the landing-page hub.
 * Two visual tones (admin navy vs customer orange) so the two-sided UI
 * is obvious at a glance.
 */
export function RouteCard({
  href,
  label,
  description,
  icon,
  tone,
  meta,
}: Props) {
  const isAdmin = tone === "admin";
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-3 rounded-2xl border p-5 transition-all hover:-translate-y-0.5",
        isAdmin
          ? "bg-slate-900 text-white border-slate-800 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/20"
          : "bg-card text-card-foreground border-border hover:border-primary hover:shadow-xl hover:shadow-orange-200/50",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center",
            isAdmin
              ? "bg-blue-500/20 text-blue-300"
              : "bg-secondary text-secondary-foreground",
          )}
        >
          <Icon name={icon} size={22} filled={1} />
        </span>
        <Icon
          name="arrow_forward"
          size={18}
          className={cn(
            "transition-transform group-hover:translate-x-0.5",
            isAdmin ? "text-blue-300" : "text-primary",
          )}
        />
      </div>
      <div>
        <h3 className="font-heading text-lg font-bold leading-tight">
          {label}
        </h3>
        <p
          className={cn(
            "text-sm mt-1 leading-relaxed",
            isAdmin ? "text-slate-400" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      </div>
      {meta && (
        <span
          className={cn(
            "self-start text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ring-1 ring-inset",
            isAdmin
              ? "bg-blue-500/10 text-blue-300 ring-blue-400/30"
              : "bg-secondary text-secondary-foreground ring-primary/20",
          )}
        >
          {meta}
        </span>
      )}
    </Link>
  );
}
