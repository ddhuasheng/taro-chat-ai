import { create } from "zustand";
import { persist } from "zustand/middleware";
import { asyncLocalStorage } from "../index";
import { RecordState } from "@/types";

export interface FavoriteState {
  favoriteList: RecordState[];
  addFavorite: (record: RecordState) => void;
  removeFavorite: (id: number) => void;
  findFavorite: (id: number) => RecordState | undefined;
}

const persistedStore = persist<FavoriteState>(
  (set, get) => {
    return {
      favoriteList: [],
      addFavorite: (record: RecordState) =>
        set((state) => ({ favoriteList: [...state.favoriteList, record] })),
      removeFavorite: (id: number) =>
        set((state) => ({
          favoriteList: state.favoriteList.filter(
            (item) => item.id !== id
          ),
        })),
      findFavorite: (id: number) =>
        get().favoriteList.find((item) => item.id === id),
    };
  },
  {
    name: "favorite",
    partialize: (state) => state,
    storage: asyncLocalStorage,
  }
);

export const useFavoriteStore = create(persistedStore);
