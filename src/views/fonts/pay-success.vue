
<template>
  <div id="pay_success" class="app">
    <div class="divHead">
      <div class="divTitle">
        <i class="el-icon-arrow-left" @click="goBack"></i>
        菩提阁
        <img src="@/images/front/home.png" @click="toMainPage"/>
      </div>
    </div>
    <div class="divContent">
      <img src="@/images/front/success.png"/>
      <div class="divSuccess">下单成功</div>
      <div class="divDesc">预计{{finishTime}}到达</div>
      <div class="divDesc1">后厨正在加紧制作中，请耐心等待~</div>
      <div class="btnView" @click="toOrderPage">查看订单</div>
    </div>
  </div>
</template>

<script>
import setRem from "@/js/base";

export default {
  name: "paySuccess",
  data(){
    return {
      finishTime:''
    }
  },
  computed:{},
  created(){
    setRem(document, window);
    this.getFinishTime()
  },
  mounted(){},
  methods:{
    goBack(){
      window.requestAnimationFrame(()=>{
        window.location.replace('#/front/page/mendian')
      })
    },
    toOrderPage(){
      window.requestAnimationFrame(()=>{
        window.location.replace('#/front/page/order')
      })
    },
    toMainPage(){
      window.requestAnimationFrame(()=>{
        window.location.replace('#/front/page/mendian')
      })
    },
    //获取送达时间
    getFinishTime(){
      let now = new Date()
      let hour = now.getHours() +1
      let minute = now.getMinutes()
      if(hour.toString().length <2){
        hour = '0' + hour
      }
      if(minute.toString().length <2){
        minute = '0' + minute
      }
      this.finishTime = hour + ':' + minute
    },

  }
}
</script>



<style scoped lang="less">
@import "@/styles/front/pay-success.css";
</style>
