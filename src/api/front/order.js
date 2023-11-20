import FrontRequst from "@/js/FrontRequst";

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
