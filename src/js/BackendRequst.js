import axios from 'axios'
import Vue from 'vue'; // 确保导入 Vue
import store from "@/store";
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080/',
  // baseURL: 'http://123.60.129.35:8080/',
  timeout:16000,
});

instance.interceptors.request.use(
  (config) => {

    const jwtToken = localStorage.getItem('dengliObj');
    // 在这里可以动态设置请求头部
    config.headers['jwtToken'] = jwtToken;
    //解决第一次登录没有本地储存发送的id读取错误
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.id) {
      console.log(userInfo.id);
      config.headers['employee'] = userInfo.id;
    }else {
      //直接退出到登录面
      // window.location.assign('http://localhost:8081/login');
    }
    // 在这里可以进行一些请求前的操作
    let a=store.state.obj.loading
    console.log(a)
    store.commit('updateloading',true)
    // this.$store.commit('updateloading',true)
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 在这里可以进行一些响应后的操作
    const code = response.data.code;
    const msg = response.data.msg;
    store.commit('updateloading',false)
    if (msg == 'NOT_LOGIN') {
      localStorage.removeItem('userInfo');
      //消息提示
       Vue.prototype.$message({
          message: "当前登录过期，正在为你跳转到登录页面",
          type: 'error',
          duration: 0,
        })
      // 添加延迟 2秒后执行的操作,优化用户体验
      setTimeout(() => {
        window.location.assign('http://localhost:8081/login');
      }, 1000);
      return response.data;
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log('err' + error);
    let { message } = error;
    if (message == 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }

    // 在这里可以进行一些错误处理
    Vue.prototype.$message({
      message: message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
export default instance