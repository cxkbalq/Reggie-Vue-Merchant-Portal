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
            <span>{{getStatus(order.status)}}</span>
            <!-- <span>正在派送</span> -->
          </div>
          <div class="dishList">
            <div v-for="(item,index) in order.orderDetails" :key="index" class="item">
              <span>{{item.name}}</span>
              <span>x{{item.number}}</span>
            </div>
          </div>
          <div class="result">
            <span>共{{order.sumNum}} 件商品,实付</span><span class="price">￥{{order.amount}}</span>
          </div>
          <div class="btn" v-if="order.status === 4">
            <div class="btnAgain" @click="addOrderAgain(order)">再来一单</div>
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
export default {
  name: "FrontOrder",
  data(){
    return {
      paging:{
        page:1,
        pageSize:5
      },
      orderList:[],
      loading:false,
      finished:false
    }
  },
  computed:{},
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
          window.location.href= '#/front/index'
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
    async addOrderAgain(order){
      const res = await orderAgainApi({id:order.id})
      if(res.code === 1){
        window.requestAnimationFrame(()=>{
          window.location.href= '/front/index.html'
        })
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
    }
  }
}
</script>


<style scoped lang="less">

</style>
