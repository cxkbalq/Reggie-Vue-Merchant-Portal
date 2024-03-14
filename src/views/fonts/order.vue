<template>
  <div id="order" class="app">
    <div class="divHead">
      <div class="divTitle">
        <i class="el-icon-arrow-left" @click="goBack"></i>菩提阁
      </div>
    </div>
    <div class="divBody" v-if="orderList.length > 0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getList"
      >
        <van-cell v-for="(order,index) in orderList" :key="index" class="item">
          <div class="timeStatus">
            <span>{{order.orderTime}}</span>
          </div>
          <div class="dishList">
            <div v-for="(item,index) in order.orderDetails" :key="index" class="item">
              <span>{{item.name}}</span>
              <span>{{item.number}}</span>
            </div>
          </div>
          <div class="result" @click="waitpay(order)">
            <span class="btn" v-if="order.status === 4">
              <van-tag type="success" class="biaoqian">已完成</van-tag>
            </span>
            <span class="btn" v-if="order.status === 2">
              <van-tag type="primary" class="biaoqian">派送中</van-tag>
            </span>
            <span class="btn" v-if="order.status === 1">
              <van-tag type="warning" class="biaoqian">待支付</van-tag>
            </span>
            <span class="btn" v-if="order.status === 3">
              <van-tag  color="#2e6737" class="biaoqian">已派送</van-tag>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="price">￥{{order.amount}}</span>
          </div>
        </van-cell>
      </van-list>
    </div>
    <div class="divNoData" v-else>
      <div class="divContainer">
        <img src="@/images/front/no_order.png"/>
        <div>暂无订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import setRem from "@/js/base";
import {orderPagingApi,orderAgainApi,orderListApi,addOrderApi} from "@/api/front/order";
import waitPay from "@/views/fonts/wait-pay.vue";
import myCustomImage from "@/images/1.png";
import {Toast} from "vant";
import router from "@/router";
export default {
  name: "FrontOrder",
  data(){
    return {
      paging:{
        page:1,
        pageSize:5,
        number:JSON.parse(localStorage.getItem("user")).id
      },
      orderList:[],
      loading:false,
      finished:false
    }
  },
  computed:{
    waitPay() {
      return waitPay
    }
  },
  created(){
    setRem(document, window);
    this.initData()
  },
  mounted(){},
  methods:{
    goBack(){
      const url = document.referrer
      //表示是从订单页面跳转过来的
      if(url.includes('success')){
        window.requestAnimationFrame(()=>{
          window.location.href= '#/front/page/mendian'
        })
      }else{
        history.go(-1)
      }
    },
    initData(){
      this.getList()
    },
    async getList(){
      if(this.finished){
        this.loading = false;
        return
      }

      const res = await orderPagingApi(this.paging)
      if(res.code === 1){
        this.orderList.push(...res.data.records)
        this.orderList.sort((a, b) => a.status - b.status);
        let records = res.data.records
        if(records && Array.isArray(records)){
          records.forEach(item=>{
            let number = 0
            // item.orderDetails.forEach(ele=>{
            //   number += ele.number
            // })
            item.sumNum = number
          })
        }
        this.loading = false;
        if(this.paging.page >= res.data.pages){
          this.finished = true;
        }
        this.paging.page = this.paging.page + 1
      }else{
        this.$notify({ type:'warning', message:res.msg});
      }
    },
    async waitpay(order){
      if (order.status===1){
        //调整到支付页面
        this.$router.push({path:'/front/waitpay',query:{id:order.id}})
        // router.push({name: )
      }
      if(order.status===2){
        Toast({
          message: '正在派送中！',
          icon: myCustomImage,
        });
      }
      if(order.status==3){
        Toast({
          message: '可以取餐啦！',
          icon: myCustomImage,
        });
      }
      if(order.status===4){
        Toast({
          message: '这个订单完成啦！',
          icon: myCustomImage,
        });
      }
    }
  }
}
</script>


<style scoped lang="less">
@import "@/styles/front/address.css";
#test{
  width: 10px;
  position: relative;
  right: 200px;
  background-color: #5a5e66;
  border-radius: 0px;
  border-color: #5a5e66;
}
#order .divHead {
  width: 100%;
  height: 50rem;
  opacity: 1;
  background: #333333;
  position: relative;
}

#order .divHead .divTitle {
  font-size: 18rem;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  line-height: 25rem;
  letter-spacing: 0;
  position: absolute;
  bottom: 13rem;
  width: 100%;
}

#order .divHead .divTitle i {
  position: absolute;
  left: 16rem;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
