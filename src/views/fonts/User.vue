<template>
  <div id="user" class="app">
    <div class="divHead">
      <div class="divTitle">
        <i class="el-icon-arrow-left" @click="goBack"></i>个人中心
      </div>
      <div class="divUser">
        <img src="@/images/front/headPage.png"/>
        <div class="desc">
          <div class="divName">林之迷 <img src="@/images/front/women.png"/></div>
          <div class="divPhone">{{userPhone}}</div>
        </div>
      </div>
    </div>
    <div class="divContent">
      <div class="divLinks">
        <div class="item" @click="toAddressPage">
          <img src="@/images/front/locations.png"/>
          <span style="font-size: 15px">地址管理</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="divSplit"></div>
        <div class="item" @click="toOrderPage">
          <img src="@/images/front/orders.png"/>
          <span style="font-size: 15px">历史订单</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="divOrders" v-if="order[0]">
        <div class="title">最新订单</div>
        <div class="timeStatus">
          <span>{{order[0].orderTime}}</span>
          <span>{{getStatus(order[0].status)}}</span>
          <!-- <span>正在派送</span> -->
        </div>
        <div class="dishList">
          <div v-for="(item,index) in order[0].orderDetails" :key="index" class="item">
            <span>{{item.name}}</span>
            <span>x{{item.number}}</span>
          </div>
        </div>
        <div class="result">
          <span>共{{order[0].sumNum}} 件商品,实付</span>
          <span class="price">￥{{order[0].amount}}</span>
        </div>
        <div class="btn" v-if="order[0].status === 4">
          <div class="btnAgain" @click="addOrderAgain">再来一单</div>
        </div>
      </div>
      <div class="quitLogin" @click="toPageLogin">
        退出登录
      </div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" @click="qh(2)">首页</van-tabbar-item>
        <van-tabbar-item icon="contact-o" @click="qh(1)">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import {orderAgainApi,orderPagingApi} from "@/api/front/order";
import {loginoutApi} from "@/api/front/login";
import setRem from "@/js/base";

export default {
  name: "UserFront",
  data(){
    return {
      form:{
        phone:'',
        code:''
      },
      msgFlag:false,
      order:[{
        orderTime:'',//下单时间
        status:undefined,//订单状态 1已结账，2未结账，3已退单，4已完成，5已取消
        orderDetails:[{
          name:'',//菜品名称
          number:undefined,//数量
        }],//明细
        amount:undefined,//实收金额
        sumNum:0,//菜品总数
      }],
      active:1
    }
  },
  computed:{},
  created(){
    setRem(document, window);
    this.userPhone =JSON.parse(localStorage.getItem("user")).phone
    this.initData()
  },
  mounted(){},
  methods:{
    goBack(){
      history.go(-1)
    },
    toAddressPage(){
      window.requestAnimationFrame(()=>{
        window.location.href = '#/front/page/address'
      })
    },
    toOrderPage(){
      window.requestAnimationFrame(()=>{
        window.location.href = '#/front/page/order'
      })
    },
    initData(){
      this.getLatestOrder()
    },
    async getLatestOrder(){
      const params = {
        page:1,
        pageSize:1
      }
      const res = await orderPagingApi(params)
      if(res.code === 1){
        this.order = res.data.records
        if(this.order && this.order[0].orderDetails){
          let number = 0
          this.order[0].orderDetails.forEach(item=>{
            number += item.number
          })
          this.order[0].sumNum = number
        }
      }else{
        this.$notify({ type:'warning', message:res.msg});
      }
    },
    getStatus(status){
      let str = ''
      switch(status){
        case 1:
          str =  '待付款'
          break;
        case 2:
          str =  '正在派送'
          break;
        case 3:
          str =  '已派送'
          break;
        case 4:
          str =  '已完成'
          break;
        case 5:
          str =  '已取消'
          break;

      }
      return str
    },
    async addOrderAgain(){
      const res = await orderAgainApi({id:this.order[0].id})
      if(res.code === 1){
        window.requestAnimationFrame(()=>{
          window.location.href = '#/front/index'
        })
      }else{
        this.$notify({ type:'warning', message:res.msg});
      }
    },
    async toPageLogin(){
      const res = await loginoutApi()
      if(res.code === 1){
        localStorage.removeItem("userInfo")
        localStorage.removeItem("dengliObj1")
        this.$notify({ type:'success', message:"用户退出成功"});
        window.requestAnimationFrame(()=>{
          window.location.href = '#/front/login'
        })
      }else{
        this.$notify({ type:'warning', message:res.msg});
      }
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
    }
  }
}
</script>



<style scoped lang="less">
@import "@/styles/front/user.css";
#dizhi{
  font-size: 16px; /* 设置字体大小为16像素 */
}
</style>
