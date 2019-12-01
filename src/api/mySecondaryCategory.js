import request from '@/utils/request'

export function getAllSecondaryCategory() {
  return request({
    url: 'api/mySecondaryCategory/all',
    method: 'get'
  })
}
export function add(data) {
  return request({
    url: 'api/mySecondaryCategory',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/mySecondaryCategory/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/mySecondaryCategory',
    method: 'put',
    data
  })
}

export function downloadMyAssetList(params) {
  return request({
    url: 'api/mySecondaryCategory/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
