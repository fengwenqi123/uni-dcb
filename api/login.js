import fly from '@/utils/request'
import qs from 'qs'

export function getLogin(loginName, password, loginType, loginSource) {
  const data = qs.stringify({
    loginName,
    password,
    loginType,
    loginSource
  })
  return fly.request('/login/user/login', data, {
    method: 'post'
  })
}
export function getOnline(accessToken) {
  const data = qs.stringify({
    accessToken
  })
  return fly.request('/login/user/online', data, {
    method: 'post'
  })
}
export function getPersonnelDetails(personnelId) {
  const data = {
    personnelId
  }
  return fly.request('/account/department/findListByPersonnel', data, {
    method: 'get'
  })
}
