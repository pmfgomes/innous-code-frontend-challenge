import { createFileRoute } from "@tanstack/react-router";

import { AlbumCard } from "@/components/album-card";
import { selectAlbums } from "@/store/albums-slice";
import { useAppSelector } from "@/store/hooks";

export const Route = createFileRoute("/albums")({
  component: AlbumsPage,
});

function AlbumsPage() {
  const albums = useAppSelector(selectAlbums);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#1e1e1e] px-6 py-8">
      <div className="pointer-events-none fixed inset-y-0 left-0 hidden w-[max(0px,calc((100vw-2560px)/2))] min-[2561px]:block bg-linear-to-r from-black/40 via-black/15 to-transparent backdrop-blur-lg" />
      <div className="pointer-events-none fixed inset-y-0 right-0 hidden w-[max(0px,calc((100vw-2560px)/2))] min-[2561px]:block bg-linear-to-l from-black/40 via-black/15 to-transparent backdrop-blur-lg" />
      <div className="mx-auto w-full max-w-640">
        <div className="grid grid-cols-[repeat(auto-fill,220px)] gap-4">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </main>
  );
}
