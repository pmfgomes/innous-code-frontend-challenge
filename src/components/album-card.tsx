import undefinedCover from "@/assets/images/undefined_album_cover.png";
import localIcon from "@/assets/source_icons/LOCAL.png";
import qobuzIcon from "@/assets/source_icons/QOBUZ.png";
import tidalIcon from "@/assets/source_icons/TIDAL.png";
import type { Album } from "@/store/albums-slice";

const sourceIcons: Record<string, string> = {
  QOBUZ: qobuzIcon,
  TIDAL: tidalIcon,
  LOCAL: localIcon,
};

function getCoverUrl(cover: string | null): string {
  if (!cover) return undefinedCover;
  return new URL(`../assets/covers/${cover}`, import.meta.url).href;
}

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const coverUrl = getCoverUrl(album.cover);
  const sourceIcon = sourceIcons[album.source] ?? null;

  return (
    <article className="flex flex-col gap-2">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-[#2a2a2a]">
        <img
          src={coverUrl}
          alt={`${album.album} by ${album.artist}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {sourceIcon && <img src={sourceIcon} alt={album.source} className="absolute bottom-1.5 right-1.5 size-5" />}
      </div>
      <div className="flex flex-col gap-0.5 px-0.5">
        <p className="truncate text-sm font-medium text-white">{album.album}</p>
        <p className="truncate text-xs text-white/50">{album.artist}</p>
      </div>
    </article>
  );
}
