<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>

<script>
export default {
  created() {
    // this.checkDeviceAndRedirect();
  },
  methods: {
    isMobileDevice() {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    },
    checkDeviceAndRedirect() {
      if (this.isMobileDevice()) {
        // 手机端打开
        console.log("当前为手机端");
        this.$router.push("/login")
      } else {
        // 电脑端打开
        console.log("当前为电脑端");
        //避免重复跳转，报错
        if (this.$route.path === '/backend') {
          // 当前已经在'/backend'路由下，不需要再次跳转
        } else {
          this.$router.push('/backend');
        }

      }
    }
  }
}
</script>
