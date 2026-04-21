import { Link } from "@tanstack/react-router";
import { Heart, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { FilterBadges, type FilterBadgeOption } from "@/components/filter-badges.tsx";
import { SourceIcon } from "@/components/source-badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useFuzzySearch } from "@/hooks/use-fuzzy-search";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectPlaylist, toggleTrackFavorite } from "@/store/playlist-slice";

import { TrackRow } from "./track-row";
import {
  PLAYLIST_CURATOR,
  PLAYLIST_SEARCH_OPTIONS,
  SOURCE_FILTER_ORDER,
  formatHeaderDuration,
  type PlaylistFilter,
} from "./utils";

export function PlaylistPage() {
  const dispatch = useAppDispatch();
  const playlist = useAppSelector(selectPlaylist);
  const [sourceFilter, setSourceFilter] = useState<PlaylistFilter>("ALL");
  const [query, setQuery] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const availableFilters = useMemo(
    () =>
      SOURCE_FILTER_ORDER.filter(
        (source) =>
          source === "ALL" || source === "FAVORITES" || playlist.tracks.some((track) => track.source === source)
      ),
    [playlist.tracks]
  );

  const filterBadges = useMemo(
    () =>
      availableFilters.reduce<Partial<Record<PlaylistFilter, FilterBadgeOption>>>((badges, filter) => {
        badges[filter] = {
          label:
            filter === "ALL"
              ? "All"
              : filter === "FAVORITES"
                ? "Favorites"
                : filter.charAt(0) + filter.slice(1).toLowerCase(),
          icon:
            filter === "FAVORITES" ? (
              <Heart className="size-3.5" />
            ) : filter !== "ALL" ? (
              <SourceIcon source={filter} imageClassName="h-3.5" />
            ) : undefined,
        };

        return badges;
      }, {}),
    [availableFilters]
  );

  const sourceFilteredTracks = useMemo(
    () =>
      playlist.tracks.filter((track) =>
        sourceFilter === "ALL" ? true : sourceFilter === "FAVORITES" ? track.favorite : track.source === sourceFilter
      ),
    [playlist.tracks, sourceFilter]
  );

  const filteredTracks = useFuzzySearch(sourceFilteredTracks, query, PLAYLIST_SEARCH_OPTIONS);

  const activeTrackId = filteredTracks.some((track) => track.id === selectedTrackId) ? selectedTrackId : null;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#2f2f2f] px-4 py-6 text-white sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,169,124,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.24),transparent_30%)]" />
      <div className="pointer-events-none fixed inset-y-0 left-0 hidden w-[max(0px,calc((100vw-2560px)/2))] bg-linear-to-r from-black/40 via-black/15 to-transparent backdrop-blur-lg min-[2561px]:block" />
      <div className="pointer-events-none fixed inset-y-0 right-0 hidden w-[max(0px,calc((100vw-2560px)/2))] bg-linear-to-l from-black/40 via-black/15 to-transparent backdrop-blur-lg min-[2561px]:block" />

      <div className="relative mx-auto flex w-full max-w-640 flex-col gap-6">
        <header className="flex flex-col gap-3">
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
        </header>

        <section className="relative overflow-hidden rounded-4xl border border-white/8 bg-[#343434] shadow-[0_24px_90px_rgba(0,0,0,0.34)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_26%),radial-gradient(circle_at_top_right,rgba(209,169,124,0.12),transparent_22%)]" />

          <div className="relative flex flex-col gap-8 p-5 sm:p-7 lg:gap-10 lg:p-10 xl:p-12">
            {/* Hero */}
            <div className="grid grid-cols-[minmax(120px,184px)_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[16rem_minmax(0,1fr)] sm:gap-6">
              <div className="overflow-hidden rounded-3xl border border-white/8 bg-[#404040] shadow-[0_16px_50px_rgba(0,0,0,0.28)]">
                <img
                  src={playlist.cover_id}
                  alt={`${playlist.name} cover`}
                  className="aspect-square h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex min-w-0 flex-col gap-5 pt-2 sm:h-64 sm:justify-between">
                <div className="space-y-3">
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-[#f2f0ea] sm:text-5xl lg:text-[3.4rem]">
                    {playlist.name}
                  </h1>
                  <p className="max-w-4xl text-sm leading-7 text-[#bfb8ac] sm:text-base">{playlist.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm text-[#d1a97c]">
                  <span className="font-semibold">{PLAYLIST_CURATOR}</span>
                  <span className="text-[#8d7f70]">•</span>
                  <span className="font-medium">{playlist.track_count} Tracks</span>
                  <span className="text-[#8d7f70]">•</span>
                  <span className="font-medium">{formatHeaderDuration(playlist.total_time)}</span>
                </div>
              </div>
            </div>

            {/* Filters + Search */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <FilterBadges label="Source:" data={filterBadges} value={sourceFilter} onChange={setSourceFilter} />

              <label className="flex h-13 w-full items-center gap-3 rounded-full border border-white/6 bg-[#3a3a3a] px-5 text-sm text-[#e6e0d6] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] xl:max-w-90">
                <Search className="size-4.5 shrink-0 text-[#d1a97c]" />
                <span className="sr-only">Search tracks</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search track..."
                  className="playlist-search-input w-full bg-transparent text-sm text-[#e6e0d6] placeholder:text-[#bfb8ac] outline-none"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="shrink-0 rounded-full p-1 text-[#d1a97c] transition-colors hover:text-[#f2e5ce] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d1a97c]/60"
                  >
                    <X className="size-4" />
                  </button>
                ) : null}
              </label>
            </div>

            {/* Track list */}
            <div className="overflow-hidden rounded-[1.75rem] border border-white/6 bg-[#343434]">
              <div className="hidden border-b border-[#3b3833] px-6 py-4 md:grid md:grid-cols-[64px_minmax(0,1.8fr)_minmax(0,1.3fr)_120px_56px_72px] md:items-center md:gap-4">
                <p className="text-center text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">#</p>
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">Title</p>
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">Album</p>
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">Source</p>
                <div />
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">Time</p>
              </div>

              <div className="divide-y divide-[#3b3833]">
                {filteredTracks.length === 0 ? (
                  <div className="flex min-h-56 items-center justify-center px-6 py-10 text-center text-sm text-[#bfb8ac]">
                    No tracks match your current search and source filter.
                  </div>
                ) : (
                  filteredTracks.map((track, index) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      index={index}
                      isActive={activeTrackId === track.id}
                      onSelect={setSelectedTrackId}
                      onToggleFavorite={(trackId) => dispatch(toggleTrackFavorite(trackId))}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
