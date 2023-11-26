<template>

  <div class="app" id="app">
    <div class="app-wrapper openSidebar clearfix">
      <!-- sidebar -->
      <div class="sidebar-container">
        <div class="logo">
          <!-- <img src="images/logo.png" width="122.5" alt="" /> -->
<!--          <img src="../../images/login/login-logo.png" alt="" style="width: 117px; height: 32px" />-->
          <img :src="imgPathConvert($store.state.mendian.image)" alt="" style="width: 50px; height: 50px" />
          <h5 style="color: white">{{$store.state.mendian.name}}</h5>
        </div>
        <div id="menu-item">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="rgb(52, 55, 68)"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="1" @click="show(1)">
                <i class="el-icon-s-custom"></i>
                <span slot="title">员工管理</span>
              </el-menu-item>
              <el-menu-item index="2" @click="show(2)">
                <i class="el-icon-menu"></i>
                <span slot="title">分类管理</span>
              </el-menu-item>
              <el-menu-item index="3" @click="show(3)">
                <i class="el-icon-s-data"></i>
                <span slot="title">菜品管理</span>
              </el-menu-item>
              <el-menu-item index="4" @click="show(4)">
                <i class="el-icon-dish"></i>
                <span slot="title">套餐管理</span>
              </el-menu-item>
              <el-menu-item index="5" @click="show(5)">
                <i class="el-icon-tickets"></i>
                <span slot="title">订单明细</span>
              </el-menu-item>
              <el-menu-item index="6" @click="show(6)">
                <i class="el-icon-s-data"></i>
                <span slot="title">门店管理</span>
              </el-menu-item>
              <el-menu-item index="7" @click="show(7)">
                <i class="el-icon-s-data"></i>
                <span slot="title">高德测试</span>
              </el-menu-item>
            </el-menu>
        </el-scrollbar>
        </div>
      </div>
      <div class="main-container">
        <!-- <navbar /> -->
        <div class="navbar">
          <div class="head-lable">
              <span v-if="goBackFlag" class="goBack" @click="goBack()"
              ><img src="../../images/icons/btn_back@2x.png" alt="" /> 返回</span
              >
            <span>{{headTitle}}</span>
          </div>
          <div class="right-menu">
            <div class="avatar-wrapper">{{ userInfo.name }}</div>
            <!-- <div class="logout" @click="logout">退出</div> -->
            <img src="../../images/icons/btn_close@2x.png" class="outLogin" alt="退出" @click="userTC" />
          </div>
        </div>

        <div class="app-main">
          <div class="divTmp" >
            <component :is="path" id="test"></component>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import MenberMain from "@/views/backend/member/Index.vue";
import ComboIndex from "@/views/backend/combo/Index.vue";
import FoodIndex from "@/views/backend/food/Index.vue";
import FoodAdd from "@/views/backend/food/Add.vue";
import CategoryIndex from "@/views/backend/category/Index.vue";
import MendainIndex from "@/views/backend/mendian/Index.vue";
import MendianAdd from "@/views/backend/mendian/Add.vue";
import OrderIndex from "@/views/backend/order/Index.vue";
import MemberAdd from "@/views/backend/member/Add.vue";
import ComboAdd from "@/views/backend/combo/Add.vue";
import {imgPath} from "@/api/front/common";
import {querymendianById} from "@/api/backend/mendian";

export default {
  name: 'MainIndex',
  //注册需要使用的路由
  components: {MenberMain,ComboIndex,FoodIndex,CategoryIndex,
    MendainIndex,OrderIndex,MemberAdd,FoodAdd,ComboAdd,MendianAdd},
  data() {
    return {
      vaIndex:1,
      currentComponent:this.$store.state.obj.pathstate, // 默认显示MemberMain组件
      username:JSON.parse(localStorage.getItem('userInfo')).username,
      defAct: '2',
      menuActived: '2',
      userInfo: {},
      headTitle: "员工管理",
      goBackFlag: false,
      loading: true,
      timer: null
    }
  },
  computed:{
    path(){
      return this.$store.state.obj.pathstate
    }
  },
  created() {
    console.log(this.$store.state.pathstate)
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
      this.mendainInit()
    }else {
      this.$router.push('/login')
    }
    this.$store.commit('update','MenberMain') ;
  },
  beforeDestroy() {
    this.timer = null
    clearTimeout(this.timer)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    show(flag){
      console.log("我开始执行了")
      switch (flag){
        case 1:
          this.$store.commit('update','MenberMain') ;
          this.headTitle="员工管理"
          break;
        case 2:
          this.$store.commit('update','CategoryIndex')
          break;
        case 3:
          this.$store.commit('update','FoodIndex');
          this.headTitle="菜品管理"
          break;
        case 4:
          this.$store.commit('update','ComboIndex');
          this.headTitle="套餐管理"
          break;
        case 5:
          this.$store.commit('update','OrderIndex') ;
          this.headTitle="订单明细"
          break;
        case 6:
          this.$store.commit('update','MendainIndex')
          this.headTitle="门店管理"
          break;
        default:
          this.currentComponent = 'DefaultComponent'; // 如果flag的值不匹配任何case，可以在default中设置一个默认值
      }
      console.log(this.currentComponent);
      console.log(flag);
    },
    userTC(){
      localStorage.removeItem('dengliObj')
      localStorage.removeItem('userInfo')
      //只能这样使用，否则或出现依赖循环引入
      this.$router.push("/login")
    },
    //网络图片路径转换
    imgPathConvert(path){
      return imgPath(path)
    },
    async mendainInit(){
      //发送请求，查询当前门店信息
      let res=await querymendianById(JSON.parse(localStorage.getItem('userInfo')).mendianId)
      if(String(res.code) === '1'){
        this.$store.commit("updateMendian",res.data)
      }else {
        this.$message.error("后端发送错误，请联系后台工作人员")
        return;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/backend/index.css";
#menu-item{
  height: 700px;
  width: 191px;
}
#test{
  overflow-y: auto; /* 或 auto */
  overflow-x: hidden;
  height: 750px; /* 设置容器的高度 */
}
.body{
  min-width: 1366px;
}
.app-main{
  height: calc(100% - 64px);
}
.divTmp{
  width: 100%;
  height: 100%;
}
#test{
  margin-top: 10px;
  height: 600px;
  overflow-y: scroll; /* 或 auto */
}
.app-main {
  width: 100%;
  height: 100%;
}
#logo {
  text-align: center;
  background-color: rgb(52, 55, 68);
  padding: 46px 37px 67px 36px;
}
#2x_png{
  width: 10px;
  height: 10px;
}

</style>
