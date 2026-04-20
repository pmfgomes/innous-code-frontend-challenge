import { configureStore } from "@reduxjs/toolkit";

import albumsReducer from "./albums-slice";
import playlistReducer from "./playlist-slice";

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    playlist: playlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
