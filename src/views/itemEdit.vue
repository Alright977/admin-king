<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <!-- 原生表单时间navtive -->
    <el-form label-width="120px" :rules="rules" ref="ruleForm" :model="model">
      <el-form-item label="物品名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="物品图片" prop="icon">
        <el-upload class="avatar-uploader" :action="$axios.defaults.baseURL + '/upload'" :headers="getAutheaders()" :show-file-list="false" :on-success="handleSuccess">
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ this.id ? '编辑' : '保存' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.getAutheaders())
  },
  name: 'itemEdit',
  props: {
    id: {},
  },
  data() {
    var validaterulename = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名称不能为空'))
      } else {
        callback()
      }
    }
    var validateruleicon = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('图片不能为空'))
      } else {
        callback()
      }
    }
    return {
      model: {
        // 物品名称
        name: '',
        // 物品图标
        icon: '',
      },
      rules: {
        name: [{ validator: validaterulename, trigger: 'blur' }],
        icon: [{ validator: validateruleicon, trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.id && this.getCategoryId(this.id)
  },
  methods: {
    // 图片上传成功回调
    handleSuccess(res) {
      this.model.icon = res.url
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res
          // 如果存在则进行修改
          if (this.id) {
            res = await this.$axios.put(`/rest/item/${this.id}`, this.model)
            this.$message({
              type: 'success',
              message: '编辑成功',
            })
          } else {
            res = this.$axios.post('/rest/item/create', this.model)
            this.$message({
              type: 'success',
              message: '保存成功',
            })
          }

          if (res) {
            this.$router.push('/items/list')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 根据id获取详情分类数据
    async getCategoryId(id) {
      let res = await this.$axios.get(`/rest/item/${id}`)
      this.model.name = res.name
      this.model.icon = res.icon
    },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
