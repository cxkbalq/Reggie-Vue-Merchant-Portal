<template>
  <div class="main">
    <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
        @click="$router.push(path='/front/search')"
    />
    <img src="@/images/front/zs1.jpg" id="zs1" @click="gn">
    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.imgUrl" :item="item"></GoodsItem>
    </div>

    <div class="dibu">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" @click="qh(2)">首页</van-tabbar-item>
        <van-tabbar-item icon="contact-o" @click="qh(1)">个人中心</van-tabbar-item>>
      </van-tabbar>
    </div>
  </div>


</template>

<script>
import {Tabbar, TabbarItem, Toast} from 'vant';
import setRem from "@/js/base";
import myCustomImage from '@/images/1.png';
import GoodsItem from "@/components/GoodsItem.vue";
import {getmendianPage} from "@/api/front/mendian";
import {imgPath} from "@/api/front/common";
export default {
  name: "mendainView",
  data() {
    return {
      active: 0,
      path:'FrontHome',
      proList:[]
    };
  },
  created() {
    setRem(document, window);
    this.init()
  },
  components: {
    GoodsItem
  },
  methods:{
    gn(){
      Toast({
        message: '当前功能暂未开发哦!',
        icon: myCustomImage,
      });
    },
    async init(){
      await getmendianPage().then(res => {
        if (String(res.code) === '1') {
          this.proList=res.data
        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })
    },
    //页面切换
    qh(t){
      if(t===1){
        window.requestAnimationFrame(()=>{
          window.location.href='#/front/page/user'
        })

      }else {
        window.requestAnimationFrame(()=>{
          window.location.href='#/front/page/mendian'
        })
      }
    },

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
#dianmian{
  position: relative;
  top: 60px;
}
#zs1{
  position: relative;
  top: 50px;
  width: 100%;
  height: 300px;
}
.goods-list{
  position: relative;
  top: 60px;
}
</style>
