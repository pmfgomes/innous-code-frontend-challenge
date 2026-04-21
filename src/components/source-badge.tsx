import { cn } from "@/lib/utils";

const SOURCE_BADGE_STYLES: Record<string, string> = {
  LOCAL: "border-[#8e7357]/40 bg-[#4f4537] text-[#f3dfbd]",
  QOBUZ: "border-[#6f7f8b]/40 bg-[#3c464f] text-[#d7e4f0]",
  TIDAL: "border-[#7a6a57]/40 bg-[#493f33] text-[#f2ddbc]",
};

interface SourceBadgeProps {
  source: string;
  className?: string;
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
  const styleClass = SOURCE_BADGE_STYLES[source] ?? "border-white/10 bg-white/5 text-white/80";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.08em] uppercase",
        styleClass,
        className
      )}
    >
      {source}
    </span>
  );
}
