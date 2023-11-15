import Vue from 'vue'
import VueRouter from 'vue-router'
import MenberMain from "@/views/member/Index.vue";
import ComboIndex from "@/views/combo/Index.vue";
import MainIndex from "@/views/Index.vue";
import FoodIndex from "@/views/food/Index.vue";
import FoodAdd from "@/views/food/Add.vue";
import CategoryIndex from "@/views/category/Index.vue";
import MendainIndex from "@/views/mendian/Index.vue";
import MemberAdd from "@/views/member/Add.vue";
import OrderIndex from "@/views/order/Index.vue";
import LoginIndex from "@/views/login/Index.vue";

// 注册路由
Vue.use(VueRouter)
const router =new VueRouter({
 routes: [
   {path: '/page/member/list', component:MenberMain},
   {path: '/', component:MainIndex},
   {path: '/page/food/list', component:FoodIndex},
   {path: '/page/food/add', component:FoodAdd},
   {path: '/page/category/list', component:CategoryIndex},
   {path: '/page/mendain/list', component:MendainIndex},
   {path: '/page/combo/list', component:ComboIndex},
   {path: '/page/order/list', component:OrderIndex},
   {path: '/login', component:LoginIndex},
   {path: '/page/member/add', component:MemberAdd},
 ]
})


//全局守卫拦截器
// router.beforeEach((to,from,next)=>{
//   if(!url.includes(to.path)){
//     next()
//     return
//   }
//   const token=localStorage.getItem('dengliObj')
//   if(token) {
//     next()
//     return
//   }else {
//     next('/login')
//   }
// })
export default router
