<template #default="timeData">
  <div class="main">
    <div class="divHead">
      <div class="divTitle">
        <i class="el-icon-arrow-left" @click="goBack"></i>菩提阁
      </div>
    </div>
    <h2 class="wz1">请及时支付</h2>
    <p class="wz2">{{ formatTime }}</p>
    <!--    <van-count-down ref="countDown" class="wz2" :time="time" format="mm 分 ss 秒" />-->
    <van-button type="info" class="zf1" @click="goToPayerror()" style="background-color: burlywood" >取消订单</van-button>
    <van-button type="info" class="zf2" @click="goToPaySuccess()" style="background-color: darkseagreen">立即支付</van-button>
  </div>
</template>

<style scoped lang="less">
.main .wz1 {
  font-size: 20px;
  margin-top: 130rem;
}

.main .wz2 {
  font-size: 30px;
  margin-top: 0rem;
  margin-bottom: 0rem;
}

.main .zf1 {
  margin-top: 20rem;
  margin-left: 15rem;
  border: 1px solid burlywood;
}
.main .zf2 {
  margin-top: 20rem;
  margin-left: 15rem;
  border: 1px solid darkseagreen;
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}

.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}

.main .divHead {
  width: 100%;
  height: 50rem;
  opacity: 1;
  background: #333333;
  position: relative;
}

.main .divHead .divTitle {
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

.main .divHead .divTitle i {
  position: absolute;
  left: 16rem;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
<script>
import setRem from "@/js/base";
import {getOredesTime, payOredes,errorOredes} from "@/api/front/order";
import async from "async";
import {Dialog} from "vant";
import order from "@/views/fonts/order.vue";

export default {
  name: "WaitPay",
  data() {
    return {
      time: 60*15, // 倒计时时间，单位为秒
      orderid:null,
      timer:0   //用来记录定时器id
    }
  },
  computed: {
    formatTime() {
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time % 60;
      return `${minutes} 分 ${seconds} 秒`;
    },

  },
  mounted() {
    this.startCountdown();
    this.inittime();
    //初始化websocket
    this.initWebSocket();
  },
  destroyed () { // 离开页面生命周期函数
    this.websocketclose();
  },
  beforeDestroy() {
    //解决离开页面到时间也会出弹窗的bug,销毁定时器
    clearInterval(this.timer);
  },
  methods: {
    async goToPaySuccess() {
      if ( JSON.parse(localStorage.getItem("dingdan"))=== null) {
        this.$notify({type: 'warning', message: "信息错误，即将返回"});
        window.requestAnimationFrame(() => {
          window.location.href = '#/front/page/addorder'
        })
      } else {
        var params =JSON.parse(localStorage.getItem("dingdan"))
        const res = await payOredes(this.$route.query.id)
        if (res.code === 1) {
          const div = document.createElement('divform');
          div.innerHTML = res.data; // data就是接口返回的form 表单字符串
          document.body.appendChild(div);
          let len = document.forms.length - 1
          document.forms[len].setAttribute('target', '_blank') // 新开窗口跳转
          document.forms[len].submit();
        } else {
          this.$notify({type: 'warning', message: res.msg});
        }
      }
    },
   async goToPayerror(){
     const res = await errorOredes(this.$route.query.id)
     if (res.code === 1) {
       this.$notify({type: 'success', message: "订单取消成功"});
       history.go(-1)
     } else {
       this.$notify({type: 'warning', message:"订单取消失败，请稍后重新尝试！"});
     }
    },
    //用于1页面返回
    goBack() {
      if(this.$route.query.flag==0){
        history.go(-2)
        // window.requestAnimationFrame(() => {
        //   window.location.href = '#/front/index'
        // })
      }
      else {
        history.go(-1)
      }
    },
    //用于时间初始化以及orederid初始化
    async inittime() {
      if (this.$route.query.flag==0) {
        this.time=60*15
      } else {
        this.orderid = this.$route.query.id; // 将this.$route.query.id赋给this.orderid
        const res = await getOredesTime(this.orderid);
        if (res.code === 1) {
          this.time = res.data;
        } else {
          this.$message.error("订单信息获取错误");
        }
      }
    },
    //开启倒计时
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          this.redirectToAnotherPage();
        }
      }, 1000);
    },
    //倒计时结束

    //页面跳转函数
    redirectToAnotherPage() {
      this.$notify({type: 'warning', message:"你有一笔订单未完成支付，以取消订单"});
      window.requestAnimationFrame(()=>{
        window.location.href = '#/front/page/mendian'
      })
      // 在这里执行页面跳转操作，例如使用Vue Router的编程式导航
    },
    //ws初始化链接
  initWebSocket () { // 建立连接
    // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https

    // var url = window._CONFIG['domianURL'].replace("https://", "wss://").replace("http://", "ws://") + "/websocket/" + userId;
    // this.websock = new WebSocket(`ws://localhost/ws/${this.$route.query.id}`);
    var userId = this.$route.query.id;
    this.websock = new WebSocket('ws://123.60.129.35:8082/api/ws/'+userId);
    this.websock.onopen = this.websocketonopen;
    this.websock.send = this.websocketsend;
    this.websock.onerror = this.websocketonerror;
    this.websock.onmessage = this.websocketonmessage;
    this.websock.onclose = this.websocketclose;
  },
  // 连接成功后调用
  websocketonopen () {
    console.log("WebSocket连接成功");
  },
  // 发生错误时调用
  websocketonerror (e) {
    console.log("WebSocket连接发生错误");
  },
  // 给后端发消息时调用
  websocketsend (e) {
    console.log("WebSocket信息发生完成");
  },
  // 接收后端消息
  // vue 客户端根据返回的cmd类型处理不同的业务响应
  websocketonmessage (e) {
    JSON.stringify(e.data)
    if(JSON.stringify(e.data)){
      window.requestAnimationFrame(()=>{
        window.location.href = '#/front/page/paysuccess'
      })
    }
    console.log(JSON.stringify(e.data))

  },
    // var data = eval("(" + e.data + ")");
    //处理订阅信息
  //   if (data.cmd == "topic") {
  //     console.log(JSON.stringify(data))
  //     //TODO 系统通知
  //
  //   } else if (data.cmd == "user") {
  //     console.log(JSON.stringify(data))
  //
  //   }
  // },
  // 关闭连接时调用
  websocketclose (e) {
    console.log("connection closed (" + e.code + ")");
  }
}
}
</script>
