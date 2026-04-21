import type { IFuseOptions } from "fuse.js";

import type { PlaylistTrack } from "@/store/playlist-slice";

export type SourceFilter = "ALL" | PlaylistTrack["source"];

export type PlaylistFilter = "ALL" | "FAVORITES" | PlaylistTrack["source"];

export const PLAYLIST_SEARCH_OPTIONS: IFuseOptions<PlaylistTrack> = {
  keys: [
    { name: "title", weight: 0.45 },
    { name: "album", weight: 0.35 },
    { name: "artist.name", weight: 0.2 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export const PLAYLIST_CURATOR = "Pedro Gomes";

export function formatArtists(artists: PlaylistTrack["artist"]): string {
  return artists.map((artist) => artist.name).join(", ");
}

export function formatHeaderDuration(totalTime: string): string {
  const [hours, minutes, seconds] = totalTime.split(":").map((part) => Number(part));

  if ([hours, minutes, seconds].some((part) => Number.isNaN(part))) {
    return totalTime;
  }

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0) {
    parts.push(`${minutes}min`);
  }

  if (seconds > 0) {
    parts.push(`${seconds}sec`);
  }

  return parts.join(" ");
}
