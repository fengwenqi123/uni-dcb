import fly from '@/utils/request'

export function getGoodsList() {
  return fly.request('/restaurant/category/selectAll', {
    method: 'get'
  })
}
