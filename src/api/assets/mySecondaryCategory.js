import request from '@/utils/request'

export function getAllSecondaryCategory(data) {
  return request({
    url: 'api/mySecondaryCategory/getAllByPid?pid=' + data,
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
