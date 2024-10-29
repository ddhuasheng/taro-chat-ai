import { create } from 'zustand'
import { FileType } from '@/types'

export interface OtherStore {
  files: FileType[]
  setFiles: (files: FileType[]) => void
}

export const useOtherStore = create<OtherStore>((set) => ({
  files: [],
  setFiles: (files) => set({ files }),
}))
