import { cn } from "@/lib/utils";
import {
  type OrderStatus,
  STATUS_LABEL,
  STATUS_TONE,
} from "@/lib/mock-data";

type Variant = "solid" | "subtle" | "outline";
type Size = "xs" | "sm" | "md";

type Props = {
  status: OrderStatus;
  variant?: Variant;
  size?: Size;
  withDot?: boolean;
  className?: string;
};

/**
 * Pill-shaped status badge with Indonesian labels and semantic colors.
 * Default variant = subtle (low-contrast bg + colored text).
 */
export function StatusBadge({
  status,
  variant = "subtle",
  size = "sm",
  withDot = false,
  className,
}: Props) {
  const tone = STATUS_TONE[status];
  const label = STATUS_LABEL[status];

  const sizes: Record<Size, string> = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-[11px]",
    md: "px-3 py-1.5 text-xs",
  };

  const variants: Record<Variant, string> = {
    subtle: `${tone.bg} ${tone.fg} ring-1 ring-inset ${tone.ring}`,
    solid: `bg-primary text-primary-foreground ring-0`,
    outline: `bg-transparent ${tone.fg} ring-1 ring-inset ${tone.ring}`,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full whitespace-nowrap",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      {withDot && tone.dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", tone.dot)} />
      )}
      {label}
    </span>
  );
}
