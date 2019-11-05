import fly from '@/utils/request'

export function getConfirmed() {
  return fly.request('/confirmed', {
    method: 'get'
  }
  )
}
