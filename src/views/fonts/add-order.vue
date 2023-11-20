<template>
  <div id="add_order" class="app">
    <div class="divHead">
      <div class="divTitle">
        <i class="el-icon-arrow-left" @click="goBack"></i>菩提阁
      </div>
    </div>
    <div class="divContent">
      <div class="divAddress">
        <div @click="toAddressPage">
          <div class="address">{{address.detail}}</div>
          <div class="name">
            <span>{{address.consignee}}{{address.sex === '1' ? '先生':'女士'}}</span>
            <span>{{address.phone}}</span>
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="divSplit"></div>
        <div class="divFinishTime">预计{{finishTime}}送达</div>
      </div>
      <div class="order">
        <div class="title">订单明细</div>
        <div class="divSplit"></div>
        <div class="itemList">
          <div class="item" v-for="(item,index) in cartData" :key="index">
            <el-image :src="imgPathConvert(item.image)">
              <div slot="error" class="image-slot">
                <img src="@/images/front/noImg.png"/>
              </div>
            </el-image>
            <div class="desc">
              <div class="name">{{item.name}}</div>
              <div class="numPrice">
                <span class="num">x{{item.number}}</span>
                <div class="price">
                  <span class="spanMoney">￥</span>{{item.amount}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="note">
        <div class="title">备注</div>
        <van-field
          v-model="note"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入您需要备注的信息"
          show-word-limit
        />
      </div>
    </div>
    <div class="divCart">
      <div :class="{imgCartActive: cartData && cartData.length > 0, imgCart:!cartData || cartData.length<1}"></div>
      <div :class="{divGoodsNum:1===1, moreGoods:cartData && cartData.length > 99}" v-if="cartData && cartData.length > 0">{{ goodsNum }}</div>
      <div class="divNum">
        <span>￥</span>
        <span>{{goodsPrice}}</span>
      </div>
      <div class="divPrice"></div>
      <div :class="{btnSubmitActive: cartData && cartData.length > 0, btnSubmit:!cartData || cartData.length<1}" @click="goToPaySuccess">去支付</div>
    </div>
  </div>
</template>

<script>
import setRem from "@/js/base";
import {orderAgainApi,addOrderApi,orderListApi,orderPagingApi} from  "@/api/front/order"
import {addAddressApi,addressFindOneApi,addressLastUpdateApi,addressListApi,deleteAddressApi,getDefaultAddressApi,setDefaultAddressApi,updateAddressApi} from "@/api/front/address"
import {cartListApi} from "@/api/front/main";
import {imgPath} from "@/api/front/common";
export default {
  name: "AddOrder",
  data(){
    return {
      address:{
        phone:'',//手机号
        consignee:'',//姓名
        detail:'',//详细地址
        sex:'1',
        id:undefined
      },
      finishTime:'',//送达时间
      cartData:[],
      note:''//备注信息
    }
  },
  computed:{
    goodsNum(){
      let num = 0
      this.cartData.forEach(item=>{
        num += item.number
      })
      if(num <99){
        return num
      }else{
        return '99+'
      }
    },
    goodsPrice(){
      let price = 0
      this.cartData.forEach(item=>{
        price += (item.number * item.amount)
      })
      return price
    }
  },
  created(){
    setRem(document, window);
    this.initData()
  },
  mounted(){},
  methods:{
    goBack(){
      history.go(-1)
    },
    initData(){
      //获取默认的地址
      this.defaultAddress()
      //获取购物车的商品
      this.getCartData()
    },
    //获取默认地址
    async defaultAddress(){
      const res = await  getDefaultAddressApi()
      if(res.code === 1){
        this.address = res.data
        this.getFinishTime()
      }else{
        window.requestAnimationFrame(()=>{
          window.location.href = '#/front/page/address-edit'
        })
      }
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
    toAddressPage(){
      window.requestAnimationFrame(()=>{
        window.location.href = '#/front/page/address'
      })
    },
    //获取购物车数据
    async getCartData(){
      const res = await cartListApi({})
      if(res.code === 1){
        this.cartData = res.data
      }else{
        this.$notify({ type:'warning', message:res.msg});
      }
    },
    async goToPaySuccess(){
      const params = {
        remark:this.note,
        payMethod:1,
        addressBookId:this.address.id
      }
      const res = await addOrderApi(params)
      if(res.code === 1){
        window.requestAnimationFrame(()=>{
          window.location.replace('#/front/page/paysuccess')
        })
      }else{
        this.$notify({ type:'warning', message:res.msg});
      }
    },
    //网络图片路径转换
    imgPathConvert(path){
      return imgPath(path)
    },
  }
}
</script>



<style scoped lang="less">
@import "@/styles/front/add-order.css";
</style>
