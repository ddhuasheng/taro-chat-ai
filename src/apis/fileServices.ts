import { request } from '@/utils'
import type { FileType, FileListVO, RecordState } from '@/types'

export const fileServices = {
  getFileList: () => {
    return request<{ files: FileListVO[] }>({
      url: "/file/list",
      method: "GET",
    })
  },
  uploadFile: (file: any) => {
    return request<Pick<FileType, 'fileId'>>({
      url: "/file/upload",
      method: "POST",
      data: file,
    });
  },
  deleteFile: (fileId: string) => {
    return request({
      url: `/file/delete`,
      method: "POST",
      data: {
        fileId,
      },
    });
  },
  FileChat: (
    data: Omit<RecordState, "name"> & { fileIds: string[] }
  ) => {
    return request<{
      fileContents: string[];
      content: string;
    }>({
      url: "/file/chat",
      method: "POST",
      data,
    });
  }
}
