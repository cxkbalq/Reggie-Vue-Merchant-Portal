import Vue from 'vue'
import Vuex from 'vuex'
import userjwt from "@/store/modules/user";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //控制显示页面的
    obj:{
      pathstate:'MenberMain',
      pathflag:1,  //2表示添加，1表示修改
      pathid:0,
      loading:true,
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
