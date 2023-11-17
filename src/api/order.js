import TestRequst from "@/js/TestRequst";
// 查询列表页接口
export function getOrderDetailPage (params) {
  return TestRequst({
    url: '/order/page',
    method: 'get',
    params
  })
}

// 查看接口
export function queryOrderDetailById (id) {
  return TestRequst({
    url: `/orderDetail/${id}`,
    method: 'get'
  })
}

// 取消，派送，完成接口
export function editOrderDetail (params) {
  return TestRequst({
    url: '/order',
    method: 'put',
    data: { ...params }
  })
}
