import { RoleEnum } from '@/enums'

export interface RecordState {
  id: number;
  name: string;
  isFile: boolean;
  history: RecordHistory[]
}

export interface RecordHistory {
  content: string;
  isFile: boolean;
  role: RoleEnum;
}
