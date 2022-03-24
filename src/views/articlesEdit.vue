<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <!-- 原生表单时间navtive -->
    <el-form label-width="120px" :rules="rules" ref="ruleForm" :model="model">
      <el-form-item label="上级分类">
        <el-select v-model="model.category">
          <!-- 如果选中则通过vulue传值到model.parent里面 -->
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ this.id ? '编辑' : '保存' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'articlesEdit',
  components: {
    VueEditor,
  },
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
        // 标题
        title: '',
        category: '',
        body: '',
      },
      // 下拉选项选中分类
      categories: [],
      rules: {
        name: [{ validator: validaterulename, trigger: 'blur' }],
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
            res = await this.$axios.put(`/rest/articles/${this.id}`, this.model)
            this.$message({
              type: 'success',
              message: '编辑成功',
            })
          } else {
            res = this.$axios.post('/rest/articles/create', this.model)
            this.$message({
              type: 'success',
              message: '保存成功',
            })
          }

          if (res) {
            this.$router.push('/articles/list')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 处理富文本图片
    handleImageAdded: async function (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      let res = await this.$axios.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.url)
      resetUploader()
    },

    // 根据id获取详情分类数据
    async getCategoryId(id) {
      let res = await this.$axios.get(`/rest/articles/${id}`)
      this.model = res
    },

    // 获取所以父级分类
    async getCategoryList() {
      const res = await this.$axios.get('/rest/categories/list')
      this.categories = res
    },
  },
}
</script>

<style></style>
