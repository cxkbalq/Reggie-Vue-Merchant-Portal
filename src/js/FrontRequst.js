import axios from 'axios'
import Vue from 'vue'; // 确保导入 Vue
import store from "@/store";
import {Notify, Toast} from 'vant';
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080/',
  // baseURL: 'http://123.60.129.35:8080/',
  timeout:16000,
});

instance.interceptors.request.use(
  (config) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration:0
    });
    //判断当前是否点击了店面，如果是，那么添加一个请求头，告诉后端，无需登录的jwt验证，直接放行
    if(store.state.stater!==0){
      //添加当前门店的id
      config.headers['mendian'] =store.state.stater;
    }
    const jwtToken = localStorage.getItem('dengliObj');
    // 在这里可以动态设置请求头部
    config.headers['jwtToken'] = jwtToken;
    //解决第一次登录没有本地储存发送的id读取错误
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.id) {
      console.log(userInfo.id);
      config.headers['employee'] = userInfo.id;
    }
    //解决第一次登录没有本地储存发送的id读取错误
    const userInfo1 = JSON.parse(localStorage.getItem('user'));
    if (userInfo1 && userInfo1.id) {
      console.log(userInfo1.id);
      config.headers['user'] = userInfo1.id;
    }
    // 在这里可以进行一些请求前的操作
    let a=store.state.obj.loading
    console.log(a)
    store.commit('updateloading',true)
    if (config.method === 'get' && config.params) {
      let url = config.url + '?';
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof(value) !== "undefined") {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              let params = propName + '[' + key + ']';
              var subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config
  }, error => {
    Promise.reject(error)}
);

instance.interceptors.response.use(
  (response) => {
      Toast.clear()
    const msg = response.data.msg;
    store.commit('updateloading',false)
    if (msg == 'NOT_LOGIN') {
      localStorage.removeItem('userInfo');
      // 消息提示
      Vue.prototype.$message({
        message: "当前登录过期，正在为你跳转到登录页面",
        type: 'error',
        duration: 1000,
      })
      // 添加延迟 2秒后执行的操作,优化用户体验
      setTimeout(() => {
        window.requestAnimationFrame(()=>{
          window.location.href= '#/front/login'
        })
      }, 0);
      store.commit('updateloading',false)
      return response.data;
    } else {
      store.commit('updateloading',false)
      return response.data;
    }
  },
  (error) => {
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Notify({
      message: message,
      type: 'warning',
      duration: 5000
    });
    //window.top.location.href = '/front/page/no-wify.html'
    return Promise.reject(error)
  }
);
export default instance
