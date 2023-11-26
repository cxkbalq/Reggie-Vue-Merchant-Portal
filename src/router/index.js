import Vue from 'vue'
import VueRouter from 'vue-router'
import MenberMain from "@/views/backend/member/Index.vue";
import ComboIndex from "@/views/backend/combo/Index.vue";
import MainIndex from "@/views/backend/Index.vue";
import FoodIndex from "@/views/backend/food/Index.vue";
import FoodAdd from "@/views/backend/food/Add.vue";
import CategoryIndex from "@/views/backend/category/Index.vue";
import MendainIndex from "@/views/backend/mendian/Index.vue";
import MendianAdd from "@/views/backend/mendian/Add.vue";
import MemberAdd from "@/views/backend/member/Add.vue";
import OrderIndex from "@/views/backend/order/Index.vue";
import LoginIndex from "@/views/backend/login/Index.vue";
import ComboAdd from "@/views/backend/combo/Add.vue";
import Gaode from "@/views/GaoDe.vue";
import FrontLogin from "@/views/fonts/login.vue"
import FrontIndex from "@/views/fonts/Index.vue"
import AddOrder from "@/views/fonts/add-order.vue"
import AddressFonts from "@/views/fonts/address.vue";
import AddressEdit from "@/views/fonts/address-edit.vue";
import UserFront from "@/views/fonts/User.vue";
import paySuccess from "@/views/fonts/pay-success.vue";
import FrontOrder from "@/views/fonts/order.vue";
import mendainView from "@/views/fonts/mendian.vue";
import Search from "@/views/fonts/search/index.vue";
import SearchList from "@/views/fonts/search/list.vue";
import FrontHome from "@/views/fonts/home.vue";
import selectIndex from "@/views/backend/mendian/select.vue";
// 注册路由
Vue.use(VueRouter)
const router =new VueRouter({
  // mode:'history',
  routes: [
    //这些是商家端
   {path: '/page/member/list', component:MenberMain},
   {path: '/backend', component:MainIndex},
   {path: '/page/food/list', component:FoodIndex},
   {path: '/page/food/add', component:FoodAdd},
   {path: '/page/category/list', component:CategoryIndex},
   {path: '/page/mendain/list', component:MendainIndex},
   {path: '/page/mendain/add', component:MendianAdd},
   {path: '/page/combo/list', component:ComboIndex},
   {path: '/page/combo/add', component:ComboAdd},
   {path: '/page/order/list', component:OrderIndex},
   {path: '/login', component:LoginIndex},
   {path: '/page/member/add', component:MemberAdd},
   {path: '/gaode', component:Gaode},
    //这些是用户端
    {path: '/front/login', component:FrontLogin},
    {path: '/front/index', component:FrontIndex},
    {path: '/front/addorder', component:AddOrder},
    {path: '/front/page/address', component:AddressFonts},
    {path: '/front/page/address-edit', component:AddressEdit},
    {path: '/front/page/user', component:UserFront},
    {path: '/front/page/paysuccess', component:paySuccess},
    {path: '/front/page/order', component:FrontOrder},
    {path: '/front/page/mendian', component:mendainView},
    {path: '/front/search', component:Search},
    {path: '/front/searchlist', component:SearchList},
    {path: '/front/home', component:FrontHome},
    {path: '/select', component:selectIndex},
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
