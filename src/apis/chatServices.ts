import { request } from '@/utils'
import type { ChatVO, RecordState } from '@/types'

export const chatServices = {
  chat(data: Pick<RecordState, 'id' | 'history'>) {
    return request<ChatVO>({
      url: '/chat/chat',
      method: 'POST',
      data
    })
  }
}
