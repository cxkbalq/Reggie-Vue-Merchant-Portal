<template>
  <div class="dashboard-container" id="member-app">
    <div class="container">
      <div class="tableBar">
        <el-input
          v-model="input"
          placeholder="请输入员工姓名"
          style="width: 250px"
          clearable
          @keyup.enter.native="handleQuery"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
            style="cursor: pointer"
            @click="handleQuery"
          ></i>
        </el-input>
        <el-button
          type="primary"
          @click="addMemberHandle('add')"
        >
          + 添加员工
        </el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        class="tableBox"
        v-loading="this.$store.state.obj.loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column
          prop="name"
          label="员工姓名"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="账号"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        ></el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            {{ String(scope.row.status) === '0' ? '已禁用' : '正常' }}
          </template>
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
              @click="addMemberHandle(scope.row.id)"
              :class="{notAdmin:userRoot <=2}"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              class="delBut non"
              @click="statusHandle(scope.row)"
              v-if="userRoot <=2"
            >
              {{ scope.row.status == '1' ? '禁用' : '启用' }}
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
        :current-page.sync="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getMemberList, enableOrDisableEmployee } from "@/api/backend/member";
import { Loading } from "element-ui";

export default {
  name: "MenberMain",
  data() {
    return {
      input: "",
      counts: 0,
      page: 1,
      pageSize: 10,
      tableData: [],
      id: "",
      status: "",
    };
  },
  computed: {},
  created() {
    this.init();
    this.userRoot = JSON.parse(localStorage.getItem('userInfo')).root;
  },
  mounted() {
  },
  methods: {
    async init() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.input ? this.input : undefined
      };

      await getMemberList(params)
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
    handleQuery() {
      this.page = 1;
      this.init();
    },
    addMemberHandle(st) {
      if (this.rootpanduan()) {
        return;
      }
      if (st === 'add'){
        this.$store.commit('updateflag', 2);
        this.$store.commit('update', 'MemberAdd');
      } else {
        this.$store.commit('updateid', st);
        this.$store.commit('update', 'MemberAdd');
      }
    },
    statusHandle(row) {
      if (this.rootpanduan()) {
        return;
      }
      this.id = row.id;
      this.status = row.status;
      this.$confirm('确认调整该账号的状态?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        enableOrDisableEmployee({ 'id': this.id, 'status': !this.status ? 1 : 0 })
          .then(res => {
            if (String(res.code) === '1') {
              this.$message.success('账号状态更改成功！');
              this.handleQuery();
            }
            else {
              this.$message.warning(res.msg)
            }
          })
          .catch(err => {
            this.$message.error('请求出错了：' + err);
          });
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.init();
    },
    rootpanduan() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo?.root == 3 || userInfo?.root == 3) {
        this.$message({
          message: '你的权限不足，无法进行操作',
          type: 'error',
          duration: 5 * 1000,
        });
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="css">
@import "@/styles/backend/page.css";
#member-app .notAdmin::after {
  border: 0 !important;
}
</style>
