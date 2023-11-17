import TestRequst from "@/js/BackendRequst";
// 查询列表接口
export function getDishPage(params) {
  return TestRequst({
    url: '/dish/page',
    method: 'get',
    params
  })
}

// 删除接口
export function deleteDish  (ids) {
  return TestRequst({
    url: '/dish',
    method: 'delete',
    params: { ids }
  })
}

// 修改接口
export function editDish  (params) {
  return TestRequst({
    url: '/dish',
    method: 'put',
    data: { ...params }
  })
}

// 新增接口
export function addDish  (params) {
  return TestRequst({
    url: '/dish',
    method: 'post',
    data: { ...params }
  })
}

// 查询详情
export function queryDishById  (id) {
  return TestRequst({
    url: `/dish/${id}`,
    method: 'get'
  })
}

// 获取菜品分类列表
export function getCategoryList1(params) {
  return TestRequst({
    url: '/category/list',
    method: 'get',
    params
  })
}

// 查菜品列表的接口
export function queryDishList  (params) {
  return TestRequst({
    url: '/dish/list',
    method: 'get',
    params
  })
}

// 文件down预览
export function commonDownload  (params) {
  return TestRequst({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charsetUTF-8'
    },
    url: '/common/download',
    method: 'get',
    params
  })
}

// 起售停售---批量起售停售接口
export function dishStatusByStatus  (params) {
  return TestRequst({
    url: `/dish/status/${params.status}`,
    method: 'post',
    params: { ids: params.id }
  })
}
