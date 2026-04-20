import { createSlice } from "@reduxjs/toolkit";

import albumsData from "@/assets/albums.json";

import type { RootState } from "./index";

export interface Album {
  id: string;
  source: string;
  artist: string;
  album: string;
  cover: string | null;
}

interface AlbumsState {
  items: Album[];
}

const initialState: AlbumsState = {
  items: albumsData as Album[],
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
});

export default albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
