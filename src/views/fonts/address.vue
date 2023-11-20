
<template>
  <div id="address" class="app">
    <div class="divHead">
      <div class="divTitle">
        <i class="el-icon-arrow-left" @click="goBack"></i>地址管理
      </div>
    </div>
    <div class="divContent">
      <div class="divItem" v-for="(item,index) in addressList" :key="index" @click.capture="itemClick(item)">
        <div class="divAddress">
          <span :class="{spanCompany:item.label === '公司',spanHome:item.label === '家',spanSchool:item.label === '学校'}">{{item.label}}</span>
          {{item.detail}}
        </div>
        <div class="divUserPhone">
          <span>{{item.consignee}}</span>
          <span>{{item.sex === '0' ? '女士' : '先生'}}</span>
          <span>{{item.phone}}</span>
        </div>
        <img src="@/images/front/edit.png" @click.stop.prevent="toAddressEditPage(item)"/>
        <div class="divSplit"></div>
        <div class="divDefault" >
          <img src="@/images/front/checked_true.png" v-if="item.isDefault === 1">
          <img src="@/images/front/checked_false.png" @click.stop.prevent="setDefaultAddress(item)" v-else>设为默认地址
        </div>
      </div>
    </div>
    <div class="divBottom" @click="toAddressCreatePage">+ 添加收货地址</div>
  </div>
</template>

<script>
import setRem from "@/js/base";
import {addAddressApi,addressFindOneApi,addressLastUpdateApi,addressListApi,deleteAddressApi,getDefaultAddressApi,setDefaultAddressApi,updateAddressApi} from "@/api/front/address"
export default {
  name: "AddressFonts",
  data(){
    return {
      addressList:[
      ],
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
      history.go(-1)
    },
    toAddressEditPage(item){
      window.requestAnimationFrame(()=>{
        this.$store.commit("updateAddressid",item.id)
        window.location.href= `#/front/page/address-edit`
      })
    },
    toAddressCreatePage(){
      window.requestAnimationFrame(()=>{
        window.location.href= `#/front/page/address-edit`
      })
    },
    async initData(){
      const res = await addressListApi()
      if(res.code === 1){
        this.addressList = res.data
      }else{
        this.$message.error(res.msg)
      }
    },
    async setDefaultAddress(item){
      if(item.id){
        const res = await setDefaultAddressApi({id:item.id})
        if(res.code === 1){
          this.initData()
        }else{
          this.$message.error(res.msg)
        }
      }
    },
    itemClick(item){
      const url = document.referrer
      //表示是从订单页面跳转过来的
      if(url.includes('order')){
        this.setDefaultAddress(item)
        history.go(-1)
      }
    }

  }
}
</script>



<style scoped lang="less">
@import "@/styles/front/address.css";
</style>
