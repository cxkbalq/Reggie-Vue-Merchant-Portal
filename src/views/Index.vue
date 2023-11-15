<template>
<div id="app">
  <el-container>
    <el-aside width="200px">
      <div id="mainleft" >
        <img src="@/images/login/login-logo.png" alt="Logo" id="logo">
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
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="navbar">
          <div class="head-lable">
<!--              <span v-if="true" class="goBack"-->
<!--              ><img src="@/images/icons/icon_index.png" alt="" /> 返回</span-->
<!--              >-->
<!--            <span>{{管理员}}</span>-->
          </div>
          <div class="right-menu">
            <div class="avatar-wrapper">{{username}}</div>
            <!-- <div class="logout" @click="logout">退出</div> -->
<!--            <img src="@/images/icons/btn_close@2x.png" class="outLogin" alt="退出" @click="logout" />-->
            <img src="@/images/icons/btn_close@2x.png" class="outLogin" @click="userTC" />
          </div>
        </div>
      </el-header>

<!--      <el-main>hahah</el-main>-->
<!--      这个里面用来填充页面-->
      <div id="main">
        <component :is="path" id=""></component>
      </div>
    </el-container>
  </el-container>

</div>

</template>

<script>
import MenberMain from "@/views/member/Index.vue";
import ComboIndex from "@/views/combo/Index.vue";
import FoodIndex from "@/views/food/Index.vue";
import FoodAdd from "@/views/food/Add.vue";
import CategoryIndex from "@/views/category/Index.vue";
import MendainIndex from "@/views/mendian/Index.vue";
import OrderIndex from "@/views/order/Index.vue";
import MemberAdd from "@/views/member/Add.vue";
// import router from "@/router";

export default {
  name: 'MainIndex',
  components: {MenberMain,ComboIndex,FoodIndex,CategoryIndex,MendainIndex,OrderIndex,MemberAdd,FoodAdd},
  data(){
    return{
      vaIndex:1,
      currentComponent:this.$store.state.pathstate, // 默认显示MemberMain组件
      username:JSON.parse(localStorage.getItem('userInfo')).username
    }
  },
  async created() {
    //初始化操作
      if(!JSON.parse(localStorage.getItem('userInfo')).username){
        this.username=JSON.parse(localStorage.getItem('userInfo')).username
      }else {
        //返回到登录界面
      }
  },
  computed:{
    path(){
      return this.$store.state.obj.pathstate
    }
  },
  methods:{
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
          break;
        case 2:
          this.$store.commit('update','CategoryIndex')
          break;
        case 3:
          this.$store.commit('update','FoodIndex');
          break;
        case 4:
          this.$store.commit('update','ComboIndex');
          break;
        case 5:
          this.$store.commit('update','OrderIndex') ;
          break;
        case 6:
          this.$store.commit('update','MendainIndex');
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
    }
  }
}
</script>

<style lang="less" scoped>
@import "../css/main.css";
#mainleft{
  padding-top: 60px;
}
#main{
  height: 860px;
  background-color: #f3f4f7;
}
#head-main{
  position: absolute;
  background-color: red;
  //height: 900px;
  height: 60px;
  width: 1645px;
}
#head-left{
  position: absolute;
  background-color: #00ffe1;
  width: 100px;
  height: 60px;
  right: 10px;
}
#head-rig{
  position: absolute;
  background-color: #5daf34;
  width: 50px;
  height: 60px;
  left: 10px;
}
#yg_id{
  position: absolute;
  top: -20px;
}
#zhanghu{
  position: absolute;
  top: -10px;
  right: 10px;
}
#logo {
  text-align: center;
  background-color: rgb(52, 55, 68);
  /* height: 100px;
  line-height: 100px;
  padding: 12px 5px; */
  //width: 20px;
  //height: 20px;
  padding: 46px 37px 67px 36px;
}
#2x_png{
  width: 10px;
  height: 10px;
}

</style>
