<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />
    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="objlist.goodsName"
      show-action
      @click="$router.push('/front/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click="xianshi(0)">综合</div>
      <div class="sort-item" @click="xianshi(1)">销量</div>
      <div class="sort-item" @click="xianshi(2)">价格 </div>
    </div>

    <div class="goods-list">
      <h5 v-if="list===null|| list.length === 0" id="xianshi">为查询到商品</h5>
      <GoodsItem v-else v-for="item in list" :key="item.imgUrl" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { Toast } from 'vant';
import {getmendiansearch} from "@/api/front/mendian";
export default {
  name: 'SearchList',
  data(){
    return{
      objlist:{
        goodsName:this.$route.query.search,
        page:'1',
        sortType:'all',
        sort:'1',
        categoryId:''
    },
      list:[]
    }
  },
  async created () {
    if(!this.objlist.goodsName){
      Toast("抱歉未搜索到商品")
    }else {
      const params = {
        name: this.objlist.goodsName
      };
      var res=  await getmendiansearch(params).then(res=>{
        if (String(res.code) === '1') {
          this.list=res.data
        }else {
          Toast(res.msg)
        }
      }).catch(err => {
        Toast('请求出错了：' + err)
      })

    }
    this.proList = list.data
  },
  components: {
    GoodsItem
  },
  methods:{
    async  xianshi(sz){
      if(sz==0){
        this.objlist={
          goodsName:this.$route.query.search,
          page:1,
          sortType:'all',
          sort:0
        }
        var res=  await getproList(this.objlist)
        this.list=res.data.list.data
      }
      if(sz==1){
        this.objlist={
          goodsName:this.$route.query.search,
          page:1,
          sortType:'sales',
          sort:0

        }
        var res=  await getproList(this.objlist)
        this.list=res.data.list.data
      }if(sz==2){
        this.objlist={
          goodsName:this.$route.query.search,
          page:1,
          sortType:'price',
          sort:0
        }
        var res=  await getproList(this.objlist)
        this.list=res.data.list.data
      }
    }
  },
  computed:{
    // searchNr(){
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   return  this.$route.query.search
    // }
  }
}
</script>

<style lang="less" scoped>
#xianshi{
  background-color: white;
  position: absolute;
  top: 50%;
  left: 40%;
}
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
