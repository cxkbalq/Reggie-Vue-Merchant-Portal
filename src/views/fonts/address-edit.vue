<template>
  <div id="address_edit" class="app">
    <div class="divHead">
      <div class="divTitle">
        <i class="el-icon-arrow-left" @click="goBack"></i>{{title}}
      </div>
    </div>
    <div class="divContent">
      <div class="divItem">
        <span>联系人：</span>
        <el-input placeholder=" 请填写收货人的姓名" v-model="form.consignee"  maxlength='10' class="inputUser"/>
        <span class="spanChecked" @click="form.sex = '1'">
                    <i :class="{iActive:form.sex === '1'}"></i>
                    先生
                   </span>
        <span class="spanChecked" @click="form.sex = '0'">
                    <i :class="{iActive:form.sex === '0'}"></i>
                    女士
                </span>
      </div>
      <div class="divItem">
        <span>手机号：</span>
        <el-input placeholder=" 请填写收货人手机号码" v-model="form.phone"  maxlength='20' style="width: calc(100% - 80rem);"/>
      </div>
      <div class="divItem">
        <span>收货地址：</span>
        <el-input placeholder=" 请输入收货地址" v-model="form.detail"  maxlength='140'/>
      </div>
      <div class="divItem ">
        <span>标签：</span>
        <span v-for="(item,index) in labelList" :key="index" @click="form.label = item;activeIndex = index" :class="{spanItem:true,spanActiveSchool:activeIndex === index}">{{item}}</span>
      </div>
      <div class="divSave" @click="saveAddress">保存地址</div>
      <div class="divDelete" @click="deleteAddress" v-if="id">删除地址</div>
    </div>
  </div>
</template>

<script>
import setRem from "@/js/base";
import {addAddressApi,addressFindOneApi,addressLastUpdateApi,addressListApi,deleteAddressApi,getDefaultAddressApi,setDefaultAddressApi,updateAddressApi} from "@/api/front/address"
import {parseUrl} from "@/api/front/common";
export default {
  name: "AddressEdit",
  data(){
    return {
      title:'新增收货地址',
      form:{
        consignee:'',//联系人
        phone:undefined,//手机号
        sex:'1',//0表示女 1 表示男
        detail:'',//收货地址
        label:'公司',//标签
      },
      labelList:[
        '无','公司','家','学校'
      ],
      id:undefined,
      activeIndex :0
    }
  },
  computed:{},
  created(){
    setRem(document, window);
    this.initData()
  },
  mounted(){
  },
  //在实列销毁前调用
  beforeDestroy(){
    //还原地址id数据
    this.$store.commit("updateAddressid",0)
  },
  methods:{
    goBack(){
      history.go(-1)
    },
    async initData(){
      const params = this.$store.state.ObjPhone
      this.id = params.id;
      console.log("当前id为：")
      console.log(params.id)
      if(params.id){
        this.title = '编辑收货地址'
        const res = await addressFindOneApi(params.id)
        if(res.code === 1){
          this.form = res.data
        }else{
          this.$notify({ type:'warning', message:res.msg});
        }
      }
    },
    async saveAddress(){
      const form = this.form
      if(!form.consignee){
        this.$notify({ type:'warning', message:'请输入联系人'});
        return
      }
      if(!form.phone){
        this.$notify({ type:'warning', message:'请输入手机号'});
        return
      }
      if(!form.detail){
        this.$notify({ type:'warning', message:'请输入收货地址'});
        return
      }
      const reg = /^1[3|4|5|7|8][0-9]{9}$/
      if(!reg.test(form.phone)){
        this.$notify({ type:'warning', message:'手机号码不合法'});
        return
      }
      let res= {}
      if(this.id){
        res = await updateAddressApi(this.form)
      }else{
        res = await addAddressApi(this.form)
      }

      if(res.code === 1){
        window.requestAnimationFrame(()=>{
          window.location.replace('#/front/page/address')
        })
      }else{
        this.$notify({ type:'warning', message:res.msg});
      }
    },
    deleteAddress(){
      this.$dialog.confirm({
        title: '确认删除',
        message: '确认要删除当前地址吗？',
      })
        .then( async () => {
          const res = await deleteAddressApi({ids:this.id })
          if(res.code === 1){
            window.requestAnimationFrame(()=>{
              window.location.replace('#/front/page/address')
            })
          }else{
            this.$notify({ type:'warning', message:res.msg});
          }
        })
        .catch(() => {
        });
    },
  }
}
</script>



<style scoped lang="less">
@import "@/styles/front/address-edit.css";

</style>
