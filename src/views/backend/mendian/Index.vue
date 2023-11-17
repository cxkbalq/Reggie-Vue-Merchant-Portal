<template>
  <div class="addBrand-container" id="combo-add-app">
    <div class="container">
      <!-- 表格 -->
      <el-table :data="tableData" :key="generateKey" style="width: 100%"
                v-loading=this.$store.state.obj.loading
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- 门店信息展开部分 -->
              <el-form-item label="门店名称:">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属父门店:">
                <span>{{ props.row.supermd }}</span>
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
              <el-form-item label="创建人:">
                <span>{{ props.row.createUser }}</span>
              </el-form-item>
              <el-form-item label="负责人电话:">
                <span>{{ props.row.suphone }}</span>
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
    </div>
  </div>
</template>

<script>
import {querysupersonList,getmendianPage,enableOrDisableEmployee,querymendianById} from '@/api/backend/mendian'
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

    //门店状态更改
    statusHandle (row) {
      this.id = row.id
      this.stastus = row.stastus
      this.$confirm('确认调整该账号的状态?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        enableOrDisableEmployee({ 'id': this.id, 'stastus': !this.stastus ? 1 : 0 }).then(res => {
          console.log('enableOrDisableEmployee',res)
          if (String(res.code) === '1') {
            this.$message.success('状态更改成功！')
            this.init()
          }
        }).catch(err => {
          this.$message.error('请求出错了：' + err)
          this.init()
        })
      })
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
</style>
