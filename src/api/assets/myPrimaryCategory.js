import request from '@/utils/request'

export function getAllPrimaryCategory() {
  return request({
    url: 'api/myPrimaryCategory/all',
    method: 'get'
  })
}
export function add(data) {
  return request({
    url: 'api/myPrimaryCategory',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/myPrimaryCategory/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/myPrimaryCategory',
    method: 'put',
    data
  })
}

export function downloadMyAssetList(params) {
  return request({
    url: 'api/myPrimaryCategory/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
