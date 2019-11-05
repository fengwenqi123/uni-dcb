import fly from '@/utils/request'

export function getOver() {
  return fly.request('/over', {
    method: 'get'
  }
  )
}
