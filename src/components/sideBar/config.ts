export interface SideConfig {
  title: string,
  value: string,
  path?: string,
  children?: sideConfigChildren[]
}

export interface sideConfigChildren extends SideConfig {
  id: number
}

export const sideConfig: SideConfig[] = [
  {
    title: '最近对话',
    value: 'recent',
    children: [],
  },
  {
    title: '文件',
    value: 'file',
    path: '/pages/file/index',
  },
  {
    title: '收藏',
    value: 'favorite',
    path: '/pages/favorite/index',
  }
]
