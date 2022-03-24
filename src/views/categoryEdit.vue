<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <!-- 原生表单时间navtive -->
    <el-form label-width="120px" :rules="rules" ref="ruleForm" :model="model">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <!-- 如果选中则通过vulue传值到model.parent里面 -->
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ this.id ? '编辑' : '保存' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'categroyEdit',
  created() {
    this.getCategoryList()
  },
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
    return {
      model: {
        name: '',
        // 下拉选项选中的id值
        parent: '',
      },
      rules: {
        name: [{ validator: validaterulename, trigger: 'blur' }],
      },
      // 父级分类列表
      parents: [],
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
            res = await this.$axios.put(`/rest/categories/${this.id}`, this.model)
            this.$message({
              type: 'success',
              message: '编辑成功',
            })
          } else {
            res = this.$axios.post('/rest/categories/create', this.model)
            this.$message({
              type: 'success',
              message: '保存成功',
            })
          }

          if (res) {
            this.$router.push('/categories/list')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 根据id获取详情分类数据
    async getCategoryId(id) {
      let res = await this.$axios.get(`/rest/categories/${id}`)
      this.model.name = res.name
    },

    // 获取所以父级分类
    async getCategoryList() {
      const res = await this.$axios.get('/rest/categories/list')
      this.parents = res
    },
  },
}
</script>

<style></style>
