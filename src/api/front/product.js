import request from '@/utils/request'

// 获取搜索商品列表的数据
export const getproList=(obj)=>{
  var goodsName=obj.goodsName
  var page=obj.page
  var sortPrice=obj.sortPrice
  var sortType=obj.sortType
  var categoryId=obj.categoryId
  return request.get('/goods/list',{
    params:{
      goodsName,
      page,
      sortType,
      sortPrice,
      categoryId
    }
  })
}

// 获取商品详情数据
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
