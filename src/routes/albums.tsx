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
    <main className="min-h-screen bg-[#1e1e1e] px-6 py-8">
      <div className="mx-auto w-full max-w-640">
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,220px)]">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </main>
  );
}
