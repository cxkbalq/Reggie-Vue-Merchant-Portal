<template>
  <div class="addBrand-container" id="combo-add-app">
    <div class="container">
      <el-input
        v-model="input"
        placeholder="请输入门店名称"
        style="width: 250px"
        clearable
        @keyup.enter.native="handleQuery"
      ></el-input>
      <el-button
        type="primary"
        @click="addMemberHandle('add')"
      >
        + 创建门店
      </el-button>
      <!-- 表格 -->
      <el-table :data="tableData" :key="generateKey" style="width: 100%"
                v-loading=this.$store.state.obj.loading
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :row-class-name="customRowClassName">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- 门店信息展开部分 -->
              <el-form-item label="门店名称:">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="总营业额:">
                <span>{{ props.row.allmony }}$</span>
              </el-form-item>
              <el-form-item label="店铺 ID:">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺地址:">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="所属负责人:">
                <span>{{ props.row.supersonId}}</span>
              </el-form-item>
              <el-form-item label="创建人id:">
                <span>{{ props.row.createUser }}</span>
<!--                <span>{{ props.row.createUser }}</span>-->
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="门店名称" prop="name"></el-table-column>
        <el-table-column label="图片" prop="image" align="center">
          <template slot-scope="{ row }">
            <el-image style="width: auto; height: 40px; border:none;cursor: pointer;"
                      :src="getImage(row.image)"
                      :preview-src-list="[ `/common/download?name=${row.image}` ]">
              <div slot="error" class="image-slot">
                <img src="../../../images/noImg.png" style="width: auto; height: 40px; border:none;">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="今日营业额" prop="todaymony"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="{ row }">
          <span :class="row.stastus === 0 ? 'status-red' : 'status-green'">
            {{ row.stastus === 0 ? '关闭' : '营业中' }}
          </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="{ row }">
            <el-button @click="statusHandle (row)" type="text" >
              {{ row.stastus === 1 ? '下线' : '上线' }}
            </el-button>
            <el-button
              type="text"
              @click="addMemberHandle(row.id)"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageList"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :current-page.sync="page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {querysupersonList,getmendianPage,enableOrDisableEmployee,querymendianById} from '@/api/backend/mendian'
import {rootpanduan} from "@/api/utils";
import Vue from "vue";
export default {
  name: 'MendianIndex',
  data() {
    return {
      input: '',
      counts: 0,
      page: 1,
      pageSize: 10,
      // tableData : [],
      dishState : '',
      checkList: [],
      tableData: [],
    };
  },
  computed: {},
  //这个为生命周期函数，用于数据的初始化
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    //   初始页面显示
    async init () {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.input ? this.input : undefined
      }
      await getmendianPage(params).then(res => {
        if (String(res.code) === '1') {
          this.tableData = res.data.records || []
          this.counts = res.data.total
        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })
    },
    addMemberHandle (st) {
      if (rootpanduan()) {
        return;
      }
      if(this.PuanDuanRoot()){
        return;
      }
      if (st === 'add'){
        //跳转添加页面
        this.$store.commit("updateflag",2)
        this.$store.commit("updateid",0)
        console.log("状态为")
        this.$store.commit("update","MendianAdd")
      } else {
        //跳转修改页面
        //在store里设置需要更改的id
        this.$store.commit("updateid",st)
        console.log(this.$store.state.obj.pathid)
        this.$store.commit("update","MendianAdd")
      }
    },
    //显示图片
    getImage(image) {
      return `/common/download?name=${image}`;
    },
    handleQuery() {
      this.page = 1;
      this.init();
    },
    customRowClassName({ row }) {
      // 判断 name 是否为特定值，如果是，返回对应的类名，否则返回空字符串
      return row.id === JSON.parse(localStorage.getItem("userInfo")).mendianId  ? 'special-row' : '';
    },
    //门店状态更改
    statusHandle (row) {
      if (rootpanduan()) {
        return;
      }
      this.id = row.id
      this.stastus = row.stastus
      this.$confirm('确认下线改门店?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        enableOrDisableEmployee({ 'id': this.id, 'stastus': !this.stastus ? 1 : 0 }).then(res => {
          console.log('enableOrDisableEmployee',res)
          if (String(res.code) === '1') {
            this.$message.success('状态更改成功！')
            this.init()
          }else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error('请求出错了：' + err)
          this.init()
        })
      }).catch(action => {
        this.$message.warning('你取消了操作')
      });
    },
    //对于门店添加修改，只有root才可以，限制权限2
    PuanDuanRoot(){
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo?.root == 2 || userInfo?.root == 2) {
        Vue.prototype.$message({
          message: '你的权限不足，无法进行操作',
          type: 'error',
          duration: 5 * 1000,
        });
        return true;
      }
      return false;
    }

  }
}
</script>

<style lang="less" scoped>
@import "@/styles/backend/page.css";
.demo-table-expand {
  position: relative;
  font-size: 0;
  left: 60px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
#app{
  padding-top: 25px;
  padding-left: 25px;
}
#app .notAdmin::after{
  border: 0 !important;
}

/* 添加的样式 */
.status-green {
  color: green;
}

.status-red {
  color: red;
}
::v-deep .special-row {
  background-color: rgba(102, 102, 102, 0.27);
}
</style>
