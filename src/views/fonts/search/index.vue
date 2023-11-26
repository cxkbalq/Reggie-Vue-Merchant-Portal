
<template>
  <div class="search">
    <van-nav-bar title="搜索一下" left-arrow @click-left="$router.go(-1)" />

    <van-search show-action placeholder="请输入搜索关键词" clearable
                v-model="serchsr">
      <template #action>
        <div @click="gosearch(serchsr)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="remf" />
      </div>
      <div class="list" >
        <div class="list-item" @click="gosearch(item)" v-for="(item,index) in serchlist" :key="index">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router'
import { Toast } from 'vant';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',

  data(){
    return{
      serchlist:[],
      serchsr:'',
      search:'search',
    }
  },
  methods:{
    router () {
      return router
    },
    SerchUp(sr){
        var number = this.serchlist.indexOf(sr)
      if(number!=-1){
        //从那里开始，哪里结束
        this.serchlist.splice(number,1)
      }
      this.serchlist.unshift(sr)
      localStorage.removeItem(this.search)
      localStorage.setItem(this.search,JSON.stringify(this.serchlist))
    },
    gosearch(sr){
      if(sr==''){
        Toast("当前内容为空，请重新输入")
        return
      }
      this.SerchUp(sr)
      //跳转连接
      this.$router.push(`/front/searchlist?search=${sr}`)
    },
    remf(){
      localStorage.removeItem(this.search)
      this.serchlist=[]
    }
  },created () {
    const def=[]
    const res=localStorage.getItem('search')
    res? this.serchlist=JSON.parse(res):this.serchlist=[]
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
