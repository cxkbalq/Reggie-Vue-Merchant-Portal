import TestRequst from "@/js/BackendRequst";
//分页查询
export function getmendianPage  (params) {
    return TestRequst({
        url: '/mendian/page',
        method: 'get',
        params
    })
}

//状态更改
export function enableOrDisableEmployee (params) {
    return TestRequst({
        url: '/mendian',
        method: 'put',
        data: { ...params }
    })
}

//信息回读
export function querymendianById  (id) {
    return TestRequst({
        url: `/mendian/${id}`,
        method: 'get'
    })
}
//获得当前门店下的所有员工信息
export function querysupersonList (id) {
    return TestRequst({
        url: `/mendian/supersonList/${id}`,
        method: 'get'
    })
}
export function savemendian(params){
  return TestRequst({
    url:'/mendian',
    method:'post',
    data:{...params}
  })
}
export function update(params){
  return TestRequst({
    url:'/mendian/update',
    method:'post',
    data:{...params}
  })
}
