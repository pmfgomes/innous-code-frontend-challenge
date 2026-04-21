import localIcon from "@/assets/source_icons/LOCAL.png";
import qobuzIcon from "@/assets/source_icons/QOBUZ.png";
import tidalIcon from "@/assets/source_icons/TIDAL.png";
import { cn } from "@/lib/utils";

const SOURCE_BADGE_STYLES: Record<string, string> = {
  LOCAL: "border-[#8e7357]/40 bg-[#4f4537] text-[#f3dfbd]",
  QOBUZ: "border-[#6f7f8b]/40 bg-[#3c464f] text-[#d7e4f0]",
  TIDAL: "border-[#7a6a57]/40 bg-[#493f33] text-[#f2ddbc]",
};

const SOURCE_ICONS: Record<string, { src: string; alt: string }> = {
  LOCAL: { src: localIcon, alt: "Local" },
  QOBUZ: { src: qobuzIcon, alt: "Qobuz" },
  TIDAL: { src: tidalIcon, alt: "Tidal" },
};

interface SourceBadgeProps {
  source: string;
  className?: string;
  showLabel?: boolean;
  iconClassName?: string;
}

interface SourceIconProps {
  source: string;
  className?: string;
  imageClassName?: string;
}

export function SourceIcon({ source, className, imageClassName }: SourceIconProps) {
  const icon = SOURCE_ICONS[source];

  if (!icon) {
    return null;
  }

  return (
    <span className={cn("inline-flex items-center justify-center", className)} aria-hidden="true">
      <img
        src={icon.src}
        alt=""
        className={cn("h-4 w-auto object-contain", imageClassName)}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

export function SourceBadge({ source, className, showLabel = true, iconClassName }: SourceBadgeProps) {
  const styleClass = SOURCE_BADGE_STYLES[source] ?? "border-white/10 bg-white/5 text-white/80";
  const icon = SOURCE_ICONS[source];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.08em] uppercase",
        styleClass,
        !showLabel && "justify-center px-2.5",
        className
      )}
      aria-label={icon?.alt ?? source}
    >
      {icon ? <SourceIcon source={source} imageClassName={cn("h-3.5", iconClassName)} /> : null}
      {showLabel ? source : null}
    </span>
  );
}
