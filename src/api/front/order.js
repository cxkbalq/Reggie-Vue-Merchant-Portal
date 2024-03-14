import FrontRequst from "@/js/FrontRequst";

//用于查询待支付订单时间
export function getOredesTime(id) {
  return FrontRequst({
    'url': `/order/getOredesTime/${id}`,
    'method': 'post',
  })
}
//立即支付
export function payOredes(id) {
  return FrontRequst({
    'url': `/order/payorder/${id}`,
    'method': 'post',
  })
}
//提交订单
export function  addOrderApi(data){
    return FrontRequst({
        'url': '/order/submit',
        'method': 'post',
        data
      })
}

//查询所有订单
export function orderListApi() {
  return FrontRequst({
    'url': '/order/list',
    'method': 'get',
  })
}

//分页查询订单
export function orderPagingApi(data) {
  return FrontRequst({
      'url': '/order/userPage',
      'method': 'get',
      params:{...data}
  })
}

//再来一单
export function orderAgainApi(data) {
  return FrontRequst({
      'url': '/order/again',
      'method': 'post',
      data
  })
}
//取消订单
export function errorOredes(id) {
  return FrontRequst({
    'url': `/order/errorOrder/${id}`,
    'method': 'post',
  })
}
