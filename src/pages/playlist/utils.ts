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

export function parseTrackLengthToSeconds(length: string): number {
  const parts = length.split(":").map((part) => Number(part));

  if (parts.some((part) => Number.isNaN(part))) {
    return 0;
  }

  if (parts.length === 2) {
    const [minutes, seconds] = parts;

    return minutes * 60 + seconds;
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;

    return hours * 3600 + minutes * 60 + seconds;
  }

  return 0;
}

export function formatHeaderDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (totalSeconds <= 0) {
    return "0sec";
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
