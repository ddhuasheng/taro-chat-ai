import { create } from "zustand";
import { persist } from "zustand/middleware";
import { asyncLocalStorage } from "../index";
import type { RecordState, RecordHistory } from '@/types'

export interface MainStore {
  current: number | null;
  records: RecordState[]
  setCurrent: (current: number | null) => void;
  addRecord: (record: RecordState) => void;
  addHistory: (...historys: RecordHistory[]) => void;
}

const persistedStore = persist<MainStore>(
  (set, get) => {

    const addRecord = (record: RecordState) => set(state => {
      const newRecords = [...state.records, record];

      return {
        ...state,
        records: newRecords,
      }
    })

    const addHistory = (...historys: RecordHistory[]) => set(state => {
      const newRecords = [...state.records]

      const record = newRecords[state.current!].history
      record.push(...historys)

      return {
        ...state,
        records: newRecords,
      }
    })

    return {
      current: null,
      records: [],
      setCurrent: (current) => set({ current }),
      addRecord,
      addHistory
    };
  },
  {
    name: "main",
    partialize: (state) => state,
    storage: asyncLocalStorage,
  }
);

export const useMainStore = create(persistedStore);
