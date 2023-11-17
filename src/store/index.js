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

    }

  },
  getters: {
  },
  mutations: {
    update(sta,str){
      sta.obj.pathstate= str
    },
    updateflag(sta,flag){
      sta.obj.pathflag=flag
    },
    updateid(sta,t){
      sta.obj.pathid=t
    },
    updateloading(sta,t){
      sta.obj.loading=t
    }
  },
  actions: {
  },
  modules: {
    //加载store
    userjwt
  }
})
