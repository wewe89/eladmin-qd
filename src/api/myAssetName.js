import request from '@/utils/request'

export function getAllAssetName(data) {
  
  return request({
    url: 'api/myAssetName/getMyAssetNames?scid='+data,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/myAssetName',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/myAssetName/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/myAssetName',
    method: 'put',
    data
  })
}

export function downloadMyAssetList(params) {
  return request({
    url: 'api/myAssetName/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
