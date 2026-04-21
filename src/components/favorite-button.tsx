import { Heart } from "lucide-react";
import type { MouseEvent } from "react";

import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  iconClassName?: string;
}

export function FavoriteButton({ isFavorite, onClick, className, iconClassName }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      onClick={onClick}
      className={cn(
        "rounded-full p-1 text-[#8f8a83] transition-colors hover:text-[#d1a97c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d1a97c]/60",
        className
      )}
    >
      <Heart
        className={cn(iconClassName, isFavorite && "text-[#d1a97c]")}
        fill={isFavorite ? "currentColor" : "none"}
      />
    </button>
  );
}
