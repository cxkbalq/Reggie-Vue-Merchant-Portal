import TestRequst from "@/js/TestRequst";

// 查询列表数据
export function getSetmealPage  (params)  {
  return TestRequst({
    url: '/setmeal/page',
    method: 'get',
    params
  })
}

// 删除数据接口
export function deleteSetmeal  (ids)  {
  return TestRequst({
    url: '/setmeal',
    method: 'delete',
    params: { ids }
  })
}

// 修改数据接口
export function editSetmeal  (params)  {
  return TestRequst({
    url: '/setmeal',
    method: 'put',
    data: { ...params }
  })
}

// 新增数据接口
export function addSetmeal  (params)  {
  return TestRequst({
    url: '/setmeal',
    method: 'post',
    data: { ...params }
  })
}

// 查询详情接口
export function querySetmealById  (id)  {
  return TestRequst({
    url: `/setmeal/${id}`,
    method: 'get'
  })
}
export function getCategoryList(params) {
  return TestRequst({
    url: '/category/list',
    method: 'get',
    params
  })
}
// 批量起售禁售
export function setmealStatusByStatus  (params)  {
  return TestRequst({
    url: `/setmeal/status/${params.status}`,
    method: 'post',
    params: { ids: params.ids }
  })
}
