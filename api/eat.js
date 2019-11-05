import fly from '@/utils/request'

export function getEat() {
  return fly.request('/eat', {
    method: 'get'
  }
  )
}
