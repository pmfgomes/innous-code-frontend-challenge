import { createSlice } from "@reduxjs/toolkit";

import playlistData from "@/assets/playlist.json";

import type { RootState } from "./index";

export interface PlaylistArtist {
  name: string;
  id: string;
}

export interface PlaylistTrack {
  id: string;
  source: string;
  cover: string;
  artist: PlaylistArtist[];
  album: string;
  album_id: string;
  length: string;
  title: string;
}

export interface Playlist {
  source: string;
  name: string;
  id: string;
  description: string;
  created_time: number;
  track_count: number;
  total_time: string;
  cover_id: string;
  tracks: PlaylistTrack[];
}

interface PlaylistState {
  item: Playlist;
}

const initialState: PlaylistState = {
  item: playlistData as Playlist,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
});

export default playlistSlice.reducer;

export const selectPlaylist = (state: RootState) => state.playlist.item;
export const selectPlaylistTracks = (state: RootState) => state.playlist.item.tracks;
