import TestRequst from "@/js/BackendRequst";
// 查询列表接口
export function  getCategoryPage(params) {
  return TestRequst({
    url: '/category/page',
    method: 'get',
    params
  })
}

// 编辑页面反查详情接口
export function  queryCategoryById(id){
  return TestRequst({
    url: `/category/${id}`,
    method: 'get'
  })
}

// 删除当前列的接口
export function  deleCategory(id){
  return TestRequst({
    url: '/category',
    method: 'delete',
    params: { id }
  })
}

// 修改接口
export function  editCategory(params){
  return TestRequst({
    url: '/category',
    method: 'put',
    data: { ...params }
  })
}

// 新增接口
export function  addCategory  (params)  {
  return TestRequst({
    url: '/category',
    method: 'post',
    data: { ...params }
  })
}
