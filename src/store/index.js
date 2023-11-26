import Vue from 'vue'
import Vuex from 'vuex'
import userjwt from "@/store/modules/user";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //控制显示页面的,这个是管理端的数据
    obj:{
      pathstate:'MenberMain',
      pathflag:1,  //2表示添加，1表示修改
      pathid:0,
      loading:true,
    },
    //这个是用户手机端的数据
    ObjPhone:{
     id:0
    },
    //用于手机端点击店铺，无需jwt校验
    stater:0,
    //这个用于商家端的门店信息村村
    // mendian:{
    //   id:0,
    //   image:'',
    //   name:''
    // }
    mendian:{
    }
  },
  getters: {
  },
  mutations: {
    //商家端路径更改
    update(sta,str){
      sta.obj.pathstate= str
    },
    //商家端，判读是否添加，还是编辑
    updateflag(sta,flag){
      sta.obj.pathflag=flag
    },
    //代替路径传参，可以携带需要更改东西的id，用于信息修改和回读
    updateid(sta,t){
      sta.obj.pathid=t
    },
    //商家端加载动画的状态修改
    updateloading(sta,t){
      sta.obj.loading=t
    },
    //用户端id更改
    updateAddressid(sta,t){
      sta.ObjPhone.id=t
    },
    //为了应对同一个前端，处理商家和用户端不同查询情况
    updatestater(sta,t){
      sta.stater=t
    },
    //储存门店信息，减少本地存储，减少xxs攻击
    updateMendian(sta,obj){
      sta.mendian=obj
      // sta.mendian.id=obj.id
      // sta.mendian.name=obj.name
      // sta.mendian.image=obj.image
    }
  },
  actions: {
  },
  modules: {
    //加载store
    userjwt
  }
})
