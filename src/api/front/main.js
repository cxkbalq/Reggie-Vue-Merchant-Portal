import FrontRequst from "@/js/FrontRequst";

//获取所有的菜品分类
export function categoryListApi() {
    return FrontRequst({
      'url': '/category/list',
      'method': 'get',
    })
  }

//获取菜品分类对应的菜品
export function dishListApi(data) {
    return FrontRequst({
        'url': '/dish/list',
        'method': 'get',
        params:{...data}
    })
}

//获取菜品分类对应的套餐
export function setmealListApi(data) {
    return FrontRequst({
        'url': '/setmeal/list',
        'method': 'get',
        params:{...data}
    })
}

//获取购物车内商品的集合
export function cartListApi(data) {
    return FrontRequst({
        'url': '/shoppingCart/list',
        'method': 'get',
        params:{...data}
    })
}

//购物车中添加商品
export function  addCartApi(data){
    return FrontRequst({
        'url': '/shoppingCart/add',
        'method': 'post',
        data
      })
}

//购物车中修改商品
export function  updateCartApi(data){
    return FrontRequst({
        'url': '/shoppingCart/sub',
        'method': 'post',
        data
      })
}

//删除购物车的商品
export function clearCartApi() {
    return FrontRequst({
        'url': '/shoppingCart/clean',
        'method': 'delete',
    })
}

//获取套餐的全部菜品
export function setMealDishDetailsApi(id) {
    return FrontRequst({
        'url': `/setmeal/dish/${id}`,
        'method': 'get',
    })
}


