import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/myAssetList',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/myAssetList/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/myAssetList',
    method: 'put',
    data
  })
}

export function downloadMyAssetList(params) {
  return request({
    url: 'api/myAssetList/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
