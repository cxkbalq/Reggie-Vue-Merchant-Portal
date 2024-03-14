<template>
  <div>hahahhahahahahha</div>
</template>


<script>
import store from '@/store/'

export default {
  name: "GaoDe",
  data() {
    return {}
  },
  mounted() {
    //初始化websocket
    this.initWebSocket()
    // this.websocketonopen()
    // this.websocketsend("agdggs")
  },
  destroyed: function () { // 离开页面生命周期函数
    // this.websocketclose();
  },
  methods: {
    initWebSocket: function () { // 建立连接
                                 // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      // var userId = store.getters.userInfo.id;
      // var url = window._CONFIG['domianURL'].replace("https://", "wss://").replace("http://", "ws://") + "/websocket/" + userId;
      this.websock = new WebSocket('ws://127.0.0.1:8080/api/ws');
      this.websock.onopen = this.websocketonopen;
      this.websock.send = this.websocketsend;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    // 连接成功后调用
    websocketonopen: function () {
      console.log("WebSocket连接成功");
    },
    // 发生错误时调用
    websocketonerror: function (e) {
      console.log("WebSocket连接发生错误");
    },
    // 给后端发消息时调用
    websocketsend: function (e) {
      console.log("WebSocket信息发生完成");
    },
    // 接收后端消息
    // vue 客户端根据返回的cmd类型处理不同的业务响应
    websocketonmessage: function (e) {
      var data = eval("(" + e.data + ")");
      //处理订阅信息
      if (data.cmd == "topic") {
        console.log(JSON.stringify(e.data))
        //TODO 系统通知

      } else if (data.cmd == "user") {
        console.log(JSON.stringify(e.data))
        //TODO 用户消息

      }
    },
    // 关闭连接时调用
    websocketclose: function (e) {
      console.log("connection closed (" + e.code + ")");
    }
  }
}
</script>

<style scoped lang="less">
</style>
