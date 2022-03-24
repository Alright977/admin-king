<template>
  <div class="container">
    <el-card class="container-card" header="请先登陆">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input type="text" v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'userLogin',
  data() {
    return {
      model: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      let res = await this.$axios.post('/login', this.model)
      if (res) {
        sessionStorage.token = res.token
        this.$router.push('/')
        sessionStorage.userId = res.userId
        this.$message({
          type: 'success',
          message: `欢迎你 ${res.userId}`,
        })
      }
    },
  },
}
</script>

<style style="scss" scoped>
.container {
  width: 30%;
  margin: 10rem auto;
}
</style>
