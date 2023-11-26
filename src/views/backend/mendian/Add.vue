<template>
  <div class="addBrand-container" id="food-add-app">
    <div class="container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :inline="true"
        label-width="180px"
        class="demo-ruleForm"
      >
        <div>
          <el-form-item
            label="门店名称:"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              placeholder="请填写门店名称"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item
            label="更换/添加负责人:"
            prop="supermd"
          >
            <el-select
              v-model="ruleForm.supermd"
              placeholder="请选择新的负责人"
            >
              <el-option
                v-for="(item, index) in supermdList"
                :key="index"
                :label="item.name + '-------------------所属门店id：' + item.mendianId"
                :value="item.id"
                :style="{ color: item.root === 2 ? 'rgba(10,255,2,0.27)' : '' }"
              />
            </el-select>
          </el-form-item>

        </div>
        <div>
          <el-form-item
            label="修改地址:"
            prop="address"
          >
            <el-input
              v-model="ruleForm.address"
              placeholder="请填写新的地址"
            />
          </el-form-item>
          <el-form-item
            label="修改状态:"
            prop="statusTest"
          >
            <el-radio-group v-model="statusTest">
              <el-radio label="上线"></el-radio>
              <el-radio label="下线"></el-radio>
            </el-radio-group>
          </el-form-item>
          <br>


        </div>
        <div>
        </div>
        <div>
          <el-form-item
            label="菜品图片:"
            prop="region"
            class="uploadImg"
          >
            <el-upload
              class="avatar-uploader"
              action="/common/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="onChange"
              ref="upload"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
        </div>
        <div class="address">
          <el-form-item
            label="门店描述:"
            prop="jianjie"
          >
            <el-input
              v-model="ruleForm.jianjie"
              type="textarea"
              :rows="3"
              placeholder="门店描述，最长200字"
              maxlength="200"
            />
          </el-form-item>
        </div>
        <div class="subBox address">
          <el-form-item>
            <el-button @click="goBack()">
              取消
            </el-button>
            <el-button
              type="primary"
              @click="submitForm(ruleForm)"
            >
              保存
            </el-button>
            <el-button
              v-if="actionType == 'add'"
              type="primary"
              class="continue"
              @click="submitForm(ruleForm,1)"
            >
              保存并继续添加菜品
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {querymendianById, querysupersonList, savemendian,update} from "@/api/backend/mendian";
import {getCategoryList} from "@/api/backend/combo";
import {addDish, editDish} from "@/api/backend/food";

export default {
  name: "MendianAdd",
  data() {
    return {
      id: '',
      restKey: 0,
      textarea: '',
      value: '',
      imageUrl: '',
      actionType: '',
      vueRest: '1',
      index: 0,
      supersonList: [],
      supermdList: [],
      inputStyle: {'flex': 1},
      statusTest:'上线',
      ruleForm: {
        id: '',
        name: '',
        address: '',
        stastus: '1',
        todaymony: '',
        allmony: '',
        crateuser: '',
        image: '',
        jianjie: '',
      },
      mak: false
    }
  },
  computed: {
    rules() {
      return {
        'name': [
          {'required': true, 'message': '请填写菜品名称', 'trigger': 'blur'}
        ],
        'categoryId': [
          {'required': true, 'message': '请选择菜品分类', 'trigger': 'change'}
        ],
        'price': [
          {
            'required': true,
            // 'message': '请填写菜品价格',
            validator: (rules, value, callback) => {
              if (!value) {
                callback(new Error('请填写菜品价格'))
              } else {
                const reg = /^\d+(\.\d{0,2})?$/
                if (reg.test(value)) {
                  if (value < 10000) {
                    callback()
                  } else {
                    callback(new Error('菜品价格小于10000'))
                  }
                } else {
                  callback(new Error('菜品价格格式只能为数字,且最多保留两位小数'))
                }
              }
            },
            'trigger': 'blur'
          }
        ],
      }
    }
  },
  created() {
    this.id = this.$store.state.obj.pathid
    if(this.id===0){
      this.actionType='add'
    }else {
      this.actionType = 'edit'
      this.getsupersonList()
      this.init()
    }
  },
  mounted() {
  },
  methods: {
    async init() {
      querymendianById(this.id).then(res => {
        console.log(res)
        if (String(res.code) === '1') {
          this.ruleForm = {...res.data}
          this.ruleForm.status = res.data.status == '1'
          if(res.data.stastus===1){
            this.statusTest="上线"
          }else {
            this.statusTest="下线"
          }
          this.imageUrl = `/common/download?name=${res.data.image}`
        } else {
          this.$message.error(res.msg || '操作失败')
        }
      })
    },

    selectHandle(val, key, ind) {
      const arrDate = [...this.dishFlavors]
      arrDate[key] = JSON.parse(JSON.stringify(this.dishFlavorsData[ind]))
      this.dishFlavors = arrDate
    },

    async  submitForm(formName,st) {
      if(!this.Rules(formName)){
        return;
      }
      //更新操作
      if(this.actionType == 'edit'){
        formName.supersonId=formName.supermd
        await update(formName).then(res=>{
          if (String(res.code) === '1') {
            this.$message.success(res.msg||"数据更新成功")
            this.$store.commit("update","MendainIndex")
          } else {
            this.$message.error(res.msg || '操作失败')
          }
        }).catch(err=>{
          this.$message.error(res.msg+err || '操作失败')
        })
      }
      //添加操作
      else {
        if(st===1){
          await savemendian(formName).then(res=>{
            if (String(res.code) === '1') {
              this.$message.success(res.msg||"添加成功")
            } else {
              this.$message.error(res.msg || '操作失败')
            }
          })
          this.supermdList=[]
        }else {
          await savemendian(formName).then(res=>{
            if (String(res.code) === '1') {
              this.$message.success(res.msg||"添加成功")
              this.$store.commit("update","MendainIndex")
            } else {
              this.$message.error(res.msg || '操作失败')
            }
          })
        }
      }

    },

    handleAvatarSuccess(response, file, fileList) {
      // 拼接down接口预览
      if (response.code === 0 && response.msg === '未登录') {
        window.top.location.href = '/backend/page/login/login.html'
      } else {
        this.imageUrl = `/common/download?name=${response.data}`
        this.ruleForm.image = response.data
      }
    },

    onChange(file) {
      if (file) {
        const suffix = file.name.split('.')[1]
        const size = file.size / 1024 / 1024 < 2
        if (['png', 'jpeg', 'jpg'].indexOf(suffix) < 0) {
          this.$message.error('上传图片只支持 png、jpeg、jpg 格式！')
          this.$refs.upload.clearFiles()
          return false
        }
        if (!size) {
          this.$message.error('上传文件大小不能超过 2MB!')
          return false
        }
        return file
      }
    },

    goBack() {
      this.$store.commit("update","MendainIndex")
    },
    //显示图片
    getImage(image) {
      return `/common/download?name=${image}`;
    },
    //验证表单是否满足条件，不为空
    Rules(t){
      if(t.image===''){
        this.$message.error("你还未上传图片")
        return false
      }
      if(t.length<3||t.length>=15){
        this.$message.error("门店名称不合法")
        return false
      }
      if(t.address.length<=3||t.address.length>=65){
        this.$message.error("地址不合法")
        return false
      }
      if(t.jianjie.length<=3||t.jianjie.length>=65){
        this.$message.error("简介不合法")
        return false
      }
      return true
    },

    // 获得门下所有员工
    getsupersonList(){
      //根据id查讯创建人id
      //获得全部员工信息
      querysupersonList(this.id).then(res => {
        if (res.code === 1) {
          // this.supermdList = res.data
          //去除权限等于1的
          this.supermdList= res.data.filter(item => item.root !== 1);
        } else {
          this.$message.error(res.msg || '操作失败')
        }
      })
    },
    // 获得门下所有门店
    getsupersonList1(){
      //根据id查讯创建人id
      //获得全部员工信息
      this.supersonList=querysupersonList(this.id)
    }
  }
}
</script>
<style scoped lang="less">
@import "@/styles/backend/page.css";
.selectInput {
  position: relative;
  width: 100%;
  min-width: 100px;
}

.selectInput .flavorSelect {
  position: absolute;
  width: 100%;
  padding: 0 10px;
  border-radius: 3px;
  border: solid 1px #FF903D;
  line-height: 30px;
  text-align: center;
  background: #fff;
  top: 50px;
  z-index: 99;
}

.selectInput .flavorSelect .items {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  line-height: 35px;
  border-bottom: solid 1px #f4f4f4;
  color: #666;
}

.selectInput .flavorSelect .none {
  font-size: 14px;
}

#food-add-app .uploadImg .el-form-item__label::before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
</style>
