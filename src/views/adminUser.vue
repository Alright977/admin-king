<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}管理员</h1>
    <!-- 原生表单时间navtive -->
    <el-form label-width="120px" :rules="rules" ref="ruleForm" :model="model">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="model.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ this.id ? '编辑' : '保存' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'adminUser',
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
    var validaterulepassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      model: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ validator: validaterulename, trigger: 'blur' }],
        password: [{ validator: validaterulepassword, trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.id && this.getCategoryId(this.id)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res
          // 如果存在则进行修改
          if (this.id) {
            res = await this.$axios.put(`/rest/admin_users/${this.id}`, this.model)
            this.$message({
              type: 'success',
              message: '编辑成功',
            })
          } else {
            res = this.$axios.post('/rest/admin_users/create', this.model)
            this.$message({
              type: 'success',
              message: '保存成功',
            })
          }

          if (res) {
            this.$router.push('/admin_users/list')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 根据id获取详情分类数据
    async getCategoryId(id) {
      let res = await this.$axios.get(`/rest/admin_users/${id}`)
      this.model = res
    },
  },
}
</script>

<style></style>
