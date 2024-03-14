<template>
  <div class="goods-item" @click="toindex">
    <div class="left">
      <img :src='imgPathConvert(item.image)' alt="" />
    </div>
    <div class="right">
      <p class="tit text-ellipsis-2">
        {{item.name}}
      </p>
      <p class="count">{{item.jianjie}}</p>
      <p class="biaoqian">
        <van-tag plain type="primary">20起送</van-tag>
        <van-tag plain type="primary">美食节</van-tag>
      </p>
    </div>
  </div>
</template>

<script>
import {imgPath} from "@/api/front/common";
export default {
  name:'GoodsItem',
  props:['item'],
  methods:{
    //网络图片路径转换
    imgPathConvert(path){
      return imgPath(path)
    },
    //页面跳转
    // 页面跳转
    toindex() {
      //设置当前点击的店铺id
      this.$store.commit("updatestater",this.item.id)
      // 使用 query 传递参数
      localStorage.setItem("md",JSON.stringify(this.item))
      this.$router.push({
        path:'/front/index',
        query:{item:this.item}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  height: 148px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 127px;
    img {
      display: block;
      width: 100%;
      height: 90%;
    }
  }
  .right {
    position: relative;
    right: 80px;
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      width: 200px;
      height: 100%;
      color: #999;
      font-size: 12px;
      position: relative;
      left: 70px;
    }
    .price {
      color: #999;
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>
