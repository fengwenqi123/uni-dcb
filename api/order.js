import fly from '@/utils/request'
import qs from 'qs'

export function getOrderList(obj) {
  return fly.request('/restaurant/yOrder/', obj, {
    method: 'get'
  })
}
export function addOrder(form) {
  const data = qs.stringify(form)
  return fly.request('/restaurant/orderInfo/insert', data, {
    method: 'post'
  })
}

export function editOrderActive(form) {
  const data = qs.stringify(form)
  return fly.request('/restaurant/yOrder/modifyState', data, {
    method: 'PUT'
  })
}

export function queryCook(form) {
  const data = qs.stringify(form)
  return fly.request('/restaurant/yOrder/queryCook', data, {
    method: 'GET'
  })
}
export function editOrderWithCook(form) {
  const data = qs.stringify(form)
  return fly.request('/restaurant/yOrder/menuChange', data, {
    method: 'post'
  })
}
export function getSumOfMoney() {
  return fly.request('/restaurant/orderInfo/sumOfMoney', {
    method: 'get'
  })
}