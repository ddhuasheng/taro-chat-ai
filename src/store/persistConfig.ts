import {getStorageSync,  setStorageSync, removeStorageSync} from '@tarojs/taro'

export const asyncLocalStorage = {
  getItem: getStorageSync,
  setItem: setStorageSync,
  removeItem: removeStorageSync
}

