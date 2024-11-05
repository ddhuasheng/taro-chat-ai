import { create } from "zustand";
import { persist } from "zustand/middleware";
import { asyncLocalStorage } from "../index";
import type { RecordState, RecordHistory } from '@/types'

export interface MainStore {
  changeNum: number,
  current: number | null;
  records: RecordState[];
  setChangeNum: (changeNum: number) => void;
  setCurrent: (current: number | null) => void;
  addRecord: (record: RecordState) => void;
  addHistory: (...historys: RecordHistory[]) => void;
  setRecordName: (name: string) => void;
  removeRecord: (id: number) => void;
  findRecord: (id: number) => RecordState | undefined;
  findIndexRecord: (id: number) => number
}

const persistedStore = persist<MainStore>(
  (set, get) => {

    const addRecord = (record: RecordState) => set(state => {
      const newRecords = [record, ...state.records];

      return {
        ...state,
        records: newRecords,
      }
    })

    const addHistory = (...historys: RecordHistory[]) => set(state => {
      const newRecords = [...state.records]

      const index = findIndexRecord(state.current!)
      if (index !== -1) {
        newRecords[index]?.history.push(...historys)
      }

      return {
        ...state,
        records: newRecords,
      }
    })

    const setRecordName = (name: string) => set(state => {
      const newRecords = [...state.records]

      const index = findIndexRecord(state.current!)
      if (index !== -1) {
        newRecords[index].name = name
      }

      return {
        ...state,
        records: newRecords,
      }
    })

    const removeRecord = (id: number) => set(state => {
      const newRecords = state.records.filter((item) => item.id !== id)

      return {
        ...state,
        records: newRecords,
      }
    })

    const findRecord = (id: number) => {
      return get().records.find((item) => item.id === id)
    }

    const findIndexRecord = (id: number) => {
      return get().records.findIndex((item) => item.id === id)
    }

    return {
      changeNum: 0, // 修改次数
      current: null,
      records: [],
      setCurrent: (current) => set({ current }),
      addRecord,
      removeRecord,
      findRecord,
      findIndexRecord,
      addHistory,
      setRecordName,
      setChangeNum: (num: number) => set({ changeNum: num }),
    };
  },
  {
    name: "main",
    partialize: (state) => state,
    storage: asyncLocalStorage,
  }
);

export const useMainStore = create(persistedStore);
