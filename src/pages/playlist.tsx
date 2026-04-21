import { Link } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function PlaylistPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#1e1e1e] px-6 py-8 text-white">
      <div className="pointer-events-none fixed inset-y-0 left-0 hidden w-[max(0px,calc((100vw-2560px)/2))] bg-linear-to-r from-black/40 via-black/15 to-transparent backdrop-blur-lg min-[2561px]:block" />
      <div className="pointer-events-none fixed inset-y-0 right-0 hidden w-[max(0px,calc((100vw-2560px)/2))] bg-linear-to-l from-black/40 via-black/15 to-transparent backdrop-blur-lg min-[2561px]:block" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/" className="text-white/55 transition-colors hover:text-white">
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Playlist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/4 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.28)] lg:flex-row lg:items-start">
          Playlist
        </div>
      </div>
    </main>
  );
}
