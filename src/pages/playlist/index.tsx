import { Link } from "@tanstack/react-router";
import { Heart, Play } from "lucide-react";
import { useMemo, useState } from "react";

import { FilterBadges, type FilterBadgeOption } from "@/components/filter-badges.tsx";
import { SearchFilter } from "@/components/search-filter";
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
  formatHeaderDuration,
  parseTrackLengthToSeconds,
  type PlaylistFilter,
} from "./utils";

export function PlaylistPage() {
  const dispatch = useAppDispatch();
  const playlist = useAppSelector(selectPlaylist);
  const [sourceFilter, setSourceFilter] = useState<PlaylistFilter>("ALL");
  const [query, setQuery] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  function handleSourceFilterChange(nextFilter: PlaylistFilter) {
    setSourceFilter(nextFilter);
    setQuery("");
  }

  const filterBadges = useMemo<Record<PlaylistFilter, FilterBadgeOption>>(
    () => ({
      ALL: {
        label: "All",
      },
      FAVORITES: {
        label: "Favorites",
        icon: <Heart className="size-3.5" />,
      },
      LOCAL: {
        label: "Local",
        icon: <SourceIcon source="LOCAL" imageClassName="h-3.5" />,
      },
      QOBUZ: {
        label: "Qobuz",
        icon: <SourceIcon source="QOBUZ" imageClassName="h-3.5" />,
      },
      TIDAL: {
        label: "Tidal",
        icon: <SourceIcon source="TIDAL" imageClassName="h-3.5" />,
      },
    }),
    []
  );

  const sourceFilteredTracks = useMemo(
    () =>
      playlist.tracks.filter((track) =>
        sourceFilter === "ALL" ? true : sourceFilter === "FAVORITES" ? track.favorite : track.source === sourceFilter
      ),
    [playlist.tracks, sourceFilter]
  );

  const totalPlaylistDuration = useMemo(
    () => playlist.tracks.reduce((total, track) => total + parseTrackLengthToSeconds(track.length), 0),
    [playlist.tracks]
  );
  const selectedTrack = useMemo(
    () => playlist.tracks.find((track) => track.id === selectedTrackId) ?? null,
    [playlist.tracks, selectedTrackId]
  );

  const filteredTracks = useFuzzySearch(sourceFilteredTracks, query, PLAYLIST_SEARCH_OPTIONS);

  const activeTrackId = filteredTracks.some((track) => track.id === selectedTrackId) ? selectedTrackId : null;

  return (
    <main className="relative flex h-screen flex-col overflow-hidden bg-[#2f2f2f] px-4 py-6 text-white sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,169,124,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.24),transparent_30%)]" />
      <div className="pointer-events-none fixed inset-y-0 left-0 hidden w-[max(0px,calc((100vw-2560px)/2))] bg-linear-to-r from-black/40 via-black/15 to-transparent backdrop-blur-lg min-[2561px]:block" />
      <div className="pointer-events-none fixed inset-y-0 right-0 hidden w-[max(0px,calc((100vw-2560px)/2))] bg-linear-to-l from-black/40 via-black/15 to-transparent backdrop-blur-lg min-[2561px]:block" />

      <div className="relative mx-auto flex min-h-0 w-full max-w-640 flex-1 flex-col gap-6">
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

        <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-4xl border border-white/8 bg-[#343434] shadow-[0_24px_90px_rgba(0,0,0,0.34)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_26%),radial-gradient(circle_at_top_right,rgba(209,169,124,0.12),transparent_22%)]" />

          <div className="relative flex min-h-0 flex-1 flex-col gap-8 p-8">
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
                  <span className="font-medium">{formatHeaderDuration(totalPlaylistDuration)}</span>
                </div>
              </div>
            </div>

            {/* Filters + Search */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <FilterBadges
                label="Source:"
                data={filterBadges}
                value={sourceFilter}
                onChange={handleSourceFilterChange}
              />

              <SearchFilter value={query} onSubmit={setQuery} label="Search tracks" placeholder="Search track..." />
            </div>

            {/* Track list */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-white/6 bg-[#343434]">
              <div className="hidden border-b border-[#3b3833] px-6 py-4 md:grid md:grid-cols-[64px_minmax(0,1.8fr)_minmax(0,1.3fr)_120px_56px_72px] md:items-center md:gap-4">
                <p className="text-center text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">#</p>
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">Title</p>
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">Album</p>
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">Source</p>
                <div />
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-[#a8a099] uppercase">Time</p>
              </div>

              <div className="min-h-0 overflow-y-auto overscroll-contain divide-y divide-[#3b3833]">
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

            <div className="rounded-[1.75rem] border border-white/8 bg-[#181818]/92 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
                {selectedTrack ? (
                  <>
                    <img
                      src={selectedTrack.cover}
                      alt={`${selectedTrack.title} cover`}
                      className="size-14 shrink-0 rounded-2xl object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#2d2d2d] bg-[#202020] text-[#d1a97c]">
                        <Play className="ml-0.5 size-4" fill="currentColor" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#f2f0ea]">{selectedTrack.title}</p>
                        <p className="truncate text-xs text-[#bfb8ac]">
                          {selectedTrack.artist.map((artist) => artist.name).join(", ")}
                        </p>
                      </div>
                    </div>
                    <p className="hidden text-sm text-[#8d7f70] md:block">{selectedTrack.album}</p>
                    <p className="shrink-0 text-sm font-medium text-[#d1a97c]">{selectedTrack.length}</p>
                  </>
                ) : (
                  <div className="flex min-h-14 items-center gap-3 text-sm text-[#bfb8ac]">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-dashed border-white/12 bg-white/3 text-[#d1a97c]">
                      <Play className="ml-0.5 size-4" />
                    </div>
                    <p>You need to select something to play.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
