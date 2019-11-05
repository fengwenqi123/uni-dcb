import fly from '@/utils/request'

export function getCancel() {
  return fly.request('/cancel', {
    method: 'get'
  }
  )
}
