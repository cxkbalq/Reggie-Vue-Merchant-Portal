import FrontRequst from "@/js/FrontRequst";

//获取所有地址
export function addressListApi() {
    return FrontRequst({
      'url': '/addressBook/list',
      'method': 'get',
    })
  }

//获取最新地址
export function addressLastUpdateApi() {
    return FrontRequst({
      'url': '/addressBook/lastUpdate',
      'method': 'get',
    })
}

//新增地址
export function  addAddressApi(data){
    return FrontRequst({
        'url': '/addressBook',
        'method': 'post',
        data
      })
}

//修改地址
export function  updateAddressApi(data){
    return FrontRequst({
        'url': '/addressBook',
        'method': 'put',
        data
      })
}

//删除地址
export function deleteAddressApi(params) {
    return FrontRequst({
        'url': '/addressBook',
        'method': 'delete',
        params
    })
}

//查询单个地址
export function addressFindOneApi(id) {
  return FrontRequst({
    'url': `/addressBook/${id}`,
    'method': 'get',
  })
}

//设置默认地址
export function  setDefaultAddressApi(data){
  return FrontRequst({
      'url': '/addressBook/default',
      'method': 'put',
      data
    })
}

//获取默认地址
export function getDefaultAddressApi() {
  return FrontRequst({
    'url': `/addressBook/default`,
    'method': 'get',
  })
}
