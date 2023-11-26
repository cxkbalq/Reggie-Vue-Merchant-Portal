<template>
  <div>
    <el-dialog title="选择门店" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="门店:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择需要操作的门店" style="width: 60%">
            <el-option v-for="item in fromdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="trueflag()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import {getmendianPage} from "@/api/front/mendian";
import {getOrderDetailPage} from "@/api/backend/order";

export default {
  name: "selectIndex",
  data(){
    return{
      dialogFormVisible: true,
      form: {
        region: '',
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      fromdata:[]
    }
  },

  async created() {
    const parames={
      id:JSON.parse(localStorage.getItem("userInfo")).id
    }
     await getmendianPage(parames).then(res=>{
      if (String(res.code) === '1') {
        this.fromdata =res.data
      }
    }).catch(err => {
      this.$message.error('请求出错了：' + err)
    });
    this.$alert('你当前的权限为root权限，对门店进行操作时，必须选择门店，以进行操作', '提示', {
      confirmButtonText: '确定',
      callback: action => {
      }
    });
  },
  methods:{
    //确定
    trueflag(){
      this.dialogFormVisible=false
      const flag=JSON.parse(localStorage.getItem("userInfo"))
      flag.mendianId=this.form.region
      //删除旧值
      localStorage.removeItem("userInfo")
      //设置新的值
      localStorage.setItem("userInfo",JSON.stringify(flag))
      this.$router.push("/backend")
    },
    close(){
      this.dialogFormVisible=false
      this.$message.error('你取消了选择，正在为你跳转到登录界面，请更换账户或进行选择')
      this.$router.push("/login")
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>
<style scoped lang="less">

</style>
