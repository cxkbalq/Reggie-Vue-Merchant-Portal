<template>
  <div class="dashboard-container" id="combo-app">
    <div class="container">
      <div class="tableBar">
        <el-input
          v-model="input"
          placeholder="请输入套餐名称"
          style="width: 250px"
          clearable
          @keyup.enter.native="handleQuery"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
            style="cursor: pointer"
            @click="init"
          ></i>
        </el-input>
        <div class="tableLab">
          <span class="span-btn delBut non" @click="deleteHandle('批量')">批量删除</span>
          <span class="span-btn blueBug non" @click="statusHandle('1')">批量启售</span>
          <span
            style="border:none;"
            class="span-btn delBut non"
            @click="statusHandle('0')"
          >批量停售</span>
          <el-button
            type="primary"
            @click="addSetMeal('add')"
          >
            + 新建套餐
          </el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        class="tableBox"
        @selection-change="handleSelectionChange"
        v-loading=this.$store.state.obj.loading
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column
          type="selection"
          width="25"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="套餐名称"
        ></el-table-column>
        <el-table-column prop="image" label="图片"  align="center">
          <template slot-scope="{ row }">
            <el-image style="width: auto; height: 40px; border:none;cursor: pointer;" :src="getImage(row.image)" :preview-src-list="[ `/common/download?name=${row.image}` ]" >
              <div slot="error" class="image-slot">
                <img src="../../../images/noImg.png" style="width: auto; height: 40px; border:none;" >
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="套餐分类"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="套餐价"
        >
          <template slot-scope="scope">
            <span>￥{{ scope.row.price/100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="售卖状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status == '0' ? '停售' : '启售' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后操作时间"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="blueBug"
              @click="addSetMeal(scope.row.id)"
            >
              修改
            </el-button>
            <el-button
              type="text"
              size="small"
              class="blueBug"
              @click="statusHandle(scope.row)"
            >
              {{ scope.row.status == '0' ? '启售' : '停售' }}
            </el-button>
            <el-button
              type="text"
              size="small"
              class="delBut non"
              @click="deleteHandle('单删', scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageList"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
        @size-change="handleSizeChange"
        :current-page.sync="page"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getSetmealPage, deleteSetmeal, setmealStatusByStatus,addSetmeal,editSetmeal,querySetmealById} from '@/api/backend/combo';
import {rootpanduan} from "@/api/utils";

export default {
  name: 'ComboIndex',
  data() {
    return {
      input: '',
      counts: 0,
      page: 1,
      pageSize: 10,
      tableData: [],
      dishState: '',
      checkList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.input ? this.input : undefined,
      };
      await getSetmealPage(params)
        .then((res) => {
          if (String(res.code) === '1') {
            this.tableData = res.data.records || [];
            this.counts = res.data.total;
          }
        })
        .catch((err) => {
          this.$message.error('请求出错了：' + err);
        });
    },
    getImage(image) {
      return `http://123.60.129.35:8080/common/download?name=${image}`;
    },
    handleQuery() {
      this.page = 1;
      this.init();
    },
    //添加套餐
    addSetMeal(st) {
      if (rootpanduan()) {
        return;
      }
      if (st === 'add'){
        //跳转添加页面
        this.$store.commit("updateflag",2)
        this.$store.commit("updateid",0)
        console.log("状态为")
        this.$store.commit("update","ComboAdd")
      } else {
        //跳转修改页面
        //在store里设置需要更改的id
        this.$store.commit("updateid",st)
        console.log(this.$store.state.obj.pathid)
        this.$store.commit("update","ComboAdd")
      }
    },
    deleteHandle(type, id) {
      if (rootpanduan()) {
        return;
      }
      if (type === '批量' && id === null) {
        if (this.checkList.length === 0) {
          return this.$message.error('请选择删除对象');
        }
      }
      this.$confirm('确定删除该套餐, 是否继续?', '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          deleteSetmeal(type === '批量' ? this.checkList.join(',') : id)
            .then((res) => {
              if (res.code === 1) {
                this.$message.success('删除成功！');
                this.handleQuery();
              } else {
                this.$message.error(res.msg || '操作失败');
              }
            })
            .catch((err) => {
              this.$message.error('请求出错了：' + err);
            });
        })
        .catch(() => {});
    },
    statusHandle(row) {
      if (rootpanduan()) {
        return;
      }
      let params = {};
      if (typeof row === 'string') {
        if (this.checkList.length == 0) {
          this.$message.error('批量操作，请先勾选操作菜品！');
          return false;
        }
        params.ids = this.checkList.join(',');
        params.status = row;
      } else {
        params.ids = row.id;
        params.status = row.status ? '0' : '1';
      }
      this.$confirm('确认更改该套餐状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          setmealStatusByStatus(params)
            .then((res) => {
              if (res.code === 1) {
                this.$message.success('套餐状态已经更改成功！');
                this.handleQuery();
              } else {
                this.$message.error(res.msg || '操作失败');
              }
            })
            .catch((err) => {
              this.$message.error('请求出错了：' + err);
            });
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      if (rootpanduan()) {
        return;
      }
      let checkArr = [];
      val.forEach((n) => {
        checkArr.push(n.id);
      });
      this.checkList = checkArr;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
//@import "../../styles/common.css";
@import "@/styles/backend/page.css";;
/* 样式 */
</style>
