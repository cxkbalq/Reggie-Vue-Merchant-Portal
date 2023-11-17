<template>
  <div class="dashboard-container" id="category-app">
    <div class="container">
      <div
        class="tableBar"
        style="display: inline-block"
      >
        <el-button
          type="primary"
          class="continue"
          @click="addClass('class')"
        >
          + 新增菜品分类
        </el-button>
        <el-button
          type="primary"
          @click="addClass('meal')"
        >
          + 新增套餐分类
        </el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        class="tableBox"
        v-loading=this.$store.state.obj.loading
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column
          prop="name"
          label="分类名称"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="分类类型"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.type == '1' ? '菜品分类': '套餐分类' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="操作时间"
        >
          <template slot-scope="scope">
            {{scope.row.updateTime}}
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
        ></el-table-column>
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
              @click="editHandle(scope.row)"
            >
              修改
            </el-button>
            <el-button
              type="text"
              size="small"
              class="delBut non"
              @click="deleteHandle(scope.row.id)"
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
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog
      :title="classData.title"
      :visible.sync="classData.dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="分类名称：">
          <el-input
            v-model="classData.name"
            placeholder="请输入分类名称"
            maxlength="14"
          />
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="classData.sort"  type="number" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="medium"
          @click="classData.dialogVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          size="medium"
          @click="submitForm()"
        >确 定</el-button>
        <el-button
          v-if="action != 'edit'"
          type="primary"
          size="medium"
          class="continue"
          @click="submitForm('go')"
        > 保存并继续添加 </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {addCategory,deleCategory,editCategory,getCategoryPage,queryCategoryById} from "@/api/backend/category"
export default {
  name: 'CategoryIndex',
  data() {
    return {
      action: '',
      counts: 0,
      page: 1,
      pageSize: 10,
      tableData: [],
      type :'',
      classData: {
        'title': '添加菜品分类',
        'dialogVisible': false,
        'categoryId': '',
        'name': '',
        'sort': ''
      }
    }
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    async init () {
      await getCategoryPage({'page': this.page, 'pageSize': this.pageSize}).then(res => {
        if (String(res.code) === '1') {
          this.tableData = res.data.records
          this.counts = Number(res.data.total)
        } else {
          this.$message.error(res.msg || '操作失败')
        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })
    },
    handleQuery() {
      this.page = 1;
      this.init();
    },
    // 添加
    addClass(st) {
      if (st == 'class') {
        this.classData.title = '新增菜品分类'
        this.type = '1'
      } else {
        this.classData.title = '新增套餐分类'
        this.type = '2'
      }
      this.action = 'add'
      this.classData.name = ''
      this.classData.sort = ''
      this.classData.dialogVisible = true
    },
    editHandle(dat) {
      this.classData.title = '修改分类'
      this.action = 'edit'
      this.classData.name = dat.name
      this.classData.sort = dat.sort
      this.classData.id = dat.id
      this.classData.dialogVisible = true
    },
    // 关闭弹窗
    handleClose(st) {
      this.classData.dialogVisible = false
    },
    //删除
    deleteHandle(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        console.log("删除的id为：")
        console.log(id)
        deleCategory(id).then(res => {
          if (res.code === 1) {
            this.$message.success('删除成功！')
            this.handleQuery()
          } else {
            this.$message.error(res.msg || '操作失败')
          }
        }).catch(err => {
          this.$message.error('请求出错了：' + err)
        })
      })
    },
    //数据提交
    submitForm(st) {
      const classData = this.classData
      const valid = (classData.name === 0 ||classData.name)  && (classData.sort === 0 || classData.sort)
      if (this.action === 'add') {
        if (valid) {
          const reg = /^\d+$/
          if (reg.test(classData.sort)) {
            addCategory({'name': classData.name,'type':this.type, sort: classData.sort}).then(res => {
              console.log(res)
              if (res.code === 1) {
                this.$message.success('分类添加成功！')
                if (!st) {
                  this.classData.dialogVisible = false
                } else {
                  this.classData.name = ''
                  this.classData.sort = ''
                }
                this.handleQuery()
              } else {
                this.$message.error(res.msg || '操作失败')
              }
            }).catch(err => {
              this.$message.error('请求出错了：' + err)
            })
          } else {
            this.$message.error('排序只能输入数字类型')
          }

        } else {
          this.$message.error('请输入分类名称或排序')
        }
      } else if (valid) {
        const reg = /^\d+$/
        if (reg.test(this.classData.sort)) {
          this.classData.dialogVisible = false
          editCategory({'id':this.classData.id,'name': this.classData.name, sort: this.classData.sort}).then(res => {
            if (res.code === 1) {
              this.$message.success('分类修改成功！')

              this.handleQuery()
            } else {
              this.$message.error(res.msg || '操作失败')
            }
          }).catch(err => {
            this.$message.error('请求出错了：' + err)
          })
        } else {
          this.$message.error('排序只能输入数字类型')
        }
      } else {
        this.$message.error('请输入分类名称或排序')
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.page = val
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/backend/page.css";
</style>
