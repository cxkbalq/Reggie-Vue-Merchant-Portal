<template>
  <div class="main">
    <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
        @click="$router.push('/front/search')"
    />
    <img src="@/images/front/zs1.jpg" id="zs1" @click="gn">
    <div class="dibu">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="contact-o">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import setRem from "@/js/base";
import {Toast} from "vant";
import myCustomImage from "@/images/1.png";
export default {
  name: "FrontHome",
  data() {
    return {
      active: 0,
      path:'FrontHome'
    };
  },
  created() {
    setRem(document, window);
    console.log(this.active)
  },
  methods:{
    gn(){
      Toast({
        message: '当前功能暂未开发哦!',
        icon: myCustomImage,
      });
    }
  }
}
</script>
<style scoped lang="less">
// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  z-index: 999;
  background-color: #FFD103FF;
}
#zs1{
  position: relative;
  top: 50px;
  width: 100%;
  height: 300px;
}
</style>
