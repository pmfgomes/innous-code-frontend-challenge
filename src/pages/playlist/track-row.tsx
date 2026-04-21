import { Play } from "lucide-react";

import { FavoriteButton } from "@/components/favorite-button";
import { SourceBadge, SourceIcon } from "@/components/source-badge";
import { cn } from "@/lib/utils";
import type { PlaylistTrack } from "@/store/playlist-slice";

import { formatArtists } from "./utils";

interface TrackRowProps {
  track: PlaylistTrack;
  index: number;
  isActive: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function TrackRow({ track, index, isActive, onSelect, onToggleFavorite }: TrackRowProps) {
  const artistNames = formatArtists(track.artist);
  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleFavorite(track.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(track.id)}
      onKeyDown={(event) => {
        if (event.currentTarget !== event.target) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(track.id);
        }
      }}
      className={cn(
        "block w-full text-left transition-colors",
        isActive ? "bg-[#3b3833]" : "bg-transparent hover:bg-white/3"
      )}
    >
      {/* Mobile layout */}
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 md:hidden">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/15 text-sm font-semibold text-[#e8e2d6]">
            {isActive ? <Play className="ml-0.5 size-4 text-[#d1a97c]" fill="currentColor" /> : index + 1}
          </div>
          <img
            src={track.cover}
            alt={`${track.title} cover`}
            className="size-14 shrink-0 rounded-xl object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#f2e5ce]">{track.title}</p>
            <p className="truncate text-xs text-[#b8b8b8]">{artistNames}</p>
          </div>
          <FavoriteButton
            isFavorite={track.favorite}
            onClick={handleFavoriteClick}
            className="shrink-0"
            iconClassName="size-4"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#d7d2cb]">
          <SourceBadge source={track.source} className="px-2.5 py-1" />
          <span className="rounded-full border border-white/8 px-2.5 py-1">{track.album}</span>
          <span className="ml-auto text-sm text-[#d7d2cb]">{track.length}</span>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden grid-cols-[64px_minmax(0,1.8fr)_minmax(0,1.3fr)_120px_56px_72px] items-center gap-4 px-6 py-4 md:grid">
        <div className="flex h-10 items-center justify-center text-sm font-semibold text-[#e8e2d6]">
          {isActive ? <Play className="ml-0.5 size-4.5 text-[#d1a97c]" fill="currentColor" /> : index + 1}
        </div>

        <div className="flex min-w-0 items-center gap-4">
          <img
            src={track.cover}
            alt={`${track.title} cover`}
            className="size-12 shrink-0 rounded-lg object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#f2e5ce]">{track.title}</p>
            <p className="truncate text-xs text-[#b8b8b8]">{artistNames}</p>
          </div>
        </div>

        <p className="truncate text-sm text-[#d7d2cb]">{track.album}</p>

        <div className="flex items-center justify-center">
          <SourceIcon source={track.source} imageClassName="h-4.5" />
        </div>

        <div className="flex items-center justify-center">
          <FavoriteButton isFavorite={track.favorite} onClick={handleFavoriteClick} iconClassName="size-4.5" />
        </div>

        <p className="text-sm text-[#d7d2cb]">{track.length}</p>
      </div>
    </div>
  );
}
