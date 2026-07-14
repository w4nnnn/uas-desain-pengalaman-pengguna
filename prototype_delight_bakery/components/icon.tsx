import { cn } from "@/lib/utils";

type Props = {
  /** Material Symbols icon name, e.g. "shopping_cart", "arrow_forward". */
  name: string;
  /** Visual size in pixels (default 20). */
  size?: number;
  /** 0 = outline (default), 1 = filled. */
  filled?: 0 | 1;
  className?: string;
  /** Disable user-select + align baseline. */
  ariaLabel?: string;
};

/**
 * Material Symbols icon wrapper. Uses the font-family loaded in
 * `app/layout.tsx` head. Treats the icon as text — size is font-size.
 */
export function Icon({
  name,
  size = 20,
  filled = 0,
  className,
  ariaLabel,
}: Props) {
  return (
    <span
      className={cn("material-symbols-outlined align-middle", className)}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${filled}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
      }}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {name}
    </span>
  );
}
