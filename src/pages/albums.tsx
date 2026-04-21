import { Link } from "@tanstack/react-router";

import { AlbumCard } from "@/components/album-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { selectAlbums } from "@/store/albums-slice";
import { useAppSelector } from "@/store/hooks";

export function AlbumsPage() {
  const albums = useAppSelector(selectAlbums);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#1e1e1e] px-6 py-8">
      <div className="pointer-events-none fixed inset-y-0 left-0 hidden w-[max(0px,calc((100vw-2560px)/2))] min-[2561px]:block bg-linear-to-r from-black/40 via-black/15 to-transparent backdrop-blur-lg" />
      <div className="pointer-events-none fixed inset-y-0 right-0 hidden w-[max(0px,calc((100vw-2560px)/2))] min-[2561px]:block bg-linear-to-l from-black/40 via-black/15 to-transparent backdrop-blur-lg" />
      <div className="mx-auto flex w-full max-w-640 flex-col gap-6">
        <header className="flex flex-col gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="transition-colors text-white/55 hover:text-white">
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Albums</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div>
            <h1 className="text-2xl font-semibold tracking-[0.02em] text-white">Albums</h1>
            <p className="text-sm text-white/55">Browse your collection across local and streaming sources.</p>
          </div>
        </header>
        <div className="grid grid-cols-[repeat(auto-fill,220px)] justify-center gap-4">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </main>
  );
}
