<template>
  <div id="login" v-loading="loading">
    <div class="divHead">登录</div>
    <div class="divContainer">
      <el-input placeholder=" 请输入手机号码" v-model="form.phone"  maxlength='20'/>
      <div class="divSplit"></div>
      <el-input placeholder=" 请输入验证码" v-model="form.code" @click="getCode" maxlength='20'/>
      <span @click='getCode'>"获取验证码"</span>

    </div>
    <div class="divMsg" v-if="msgFlag">手机号输入不正确，请重新输入</div>
    <el-button type="primary" :class="{btnSubmit:1===1,btnNoPhone:!form.phone,btnPhone:form.phone}" @click="btnLogin">登录</el-button>
  </div>
</template>
<script>
import setRem from "@/js/base";
import {loginoutApi,loginApi,sendMsgApi} from "@/api/front/login";
import FrontRequst from "@/js/FrontRequst";

export default {
  name: "FrontLogin",
  data(){
    return {
      form:{
        phone:'17856796238',
        code:'1234'
      },
      msgFlag:false,
      loading:false
    }
  },
  computed:{},
  created(){
    setRem(document, window);
  },
  mounted(){},
  methods:{
    getCode(){
      this.form.code = ''
      const regex = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
      if (regex.test(this.form.phone)) {
        this.msgFlag = false
        //this.form.code = (Math.random()*1000000).toFixed(0)
        return FrontRequst({
          'url': '/user/sendMsg',
          'method': 'post',
          data:{phone:this.form.phone}
        }),
          //alert("获取验证码成功")
          this.$message({
            message: '验证码发送成功啦，请注意查收哦！',
            type: 'success'
          });
        // sendMsgApi({phone:this.form.phone})
      }else{
        this.msgFlag = true
        this.$message.error('验证码发送错误，请重新刷新网页试试哦！');
      }
    },
    async btnLogin(){
      if(this.form.phone && this.form.code){
        this.loading = true
        const res = await loginApi(this.form)
        this.loading = false
        if(res.code === 1){
          sessionStorage.setItem("userPhone",this.form.phone)
          localStorage.setItem("user",JSON.stringify(res.data))
          window.location.assign('#/front/index');
        }else{
          this.$notify({ type:'warning', message:res.msg});
        }
      }else{
        this.$notify({ type:'warning', message:'请输入手机号码'});
      }
    }
  }
}
</script>
<style scoped lang="less">
@import "@/styles/front/login.css";
</style>
