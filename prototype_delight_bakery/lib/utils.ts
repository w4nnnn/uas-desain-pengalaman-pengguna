import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format angka ke Rupiah Indonesia: 50000 → "Rp 50.000".
 * Accepts number | string | undefined.
 */
export function formatIDR(value: number | string | undefined | null): string {
  if (value === null || value === undefined || value === "") return "Rp 0";
  const n = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(n)) return "Rp 0";
  return "Rp " + n.toLocaleString("id-ID");
}

/**
 * Format tanggal ID: "2024-10-24" → "24 Okt 2024".
 */
export function formatDateID(value: string | Date | undefined | null): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
