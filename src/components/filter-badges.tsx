import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface FilterBadgeOption {
  label: string;
  icon?: ReactNode;
}

interface FilterBadgesProps<TValue extends string> {
  data: Partial<Record<TValue, FilterBadgeOption>>;
  value: TValue;
  onChange: (value: TValue) => void;
  label?: string;
  className?: string;
  badgeListClassName?: string;
  activeBadgeClassName?: string;
  inactiveBadgeClassName?: string;
}

export function FilterBadges<TValue extends string>({
  data,
  value,
  onChange,
  label,
  className,
  badgeListClassName,
  activeBadgeClassName,
  inactiveBadgeClassName,
}: FilterBadgesProps<TValue>) {
  const badgeEntries = Object.entries(data) as Array<[TValue, FilterBadgeOption]>;

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center", className)}>
      {label ? <span className="pl-1 text-sm font-semibold text-[#d1a97c] sm:pl-0">{label}</span> : null}

      <div className={cn("flex flex-wrap gap-3", badgeListClassName)}>
        {badgeEntries.map(([badgeValue, badge]) => {
          const isActive = badgeValue === value;

          return (
            <button
              key={badgeValue}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(badgeValue)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d1a97c]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#343434]",
                isActive
                  ? "border-[#5d4f3f] bg-[#4a4033] text-[#f2e5ce] [&_svg]:fill-current"
                  : "border-white/6 bg-[#343434] text-[#d1a97c] hover:border-[#5d4f3f] hover:bg-[#3c3c3c]",
                isActive ? activeBadgeClassName : inactiveBadgeClassName
              )}
            >
              {badge.icon}
              {badge.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
