<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}广告</h1>
    <!-- 原生表单时间navtive -->
    <el-form label-width="120px" :rules="rules" ref="ruleForm" :model="model">
      <el-form-item label="广告名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-tabs type="border-card">
          <el-tab-pane label="广告">
            <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告 </el-button>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col :md="12" v-for="(item, index) in model.items" :key="index">
                <el-form-item label="广告链接">
                  <el-input v-model="item.resetUploader"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="avatar">
                  <el-upload
                    class="avatar-uploader"
                    :action="$axios.defaults.baseURL + '/upload'"
                    :headers="getAutheaders()"
                    :show-file-list="false"
                    :on-success="
                      (res) => {
                        item.image = res.url
                      }
                    "
                  >
                    <img v-if="item.image" :src="item.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="danger"
                    size="small"
                    @click="
                      () => {
                        model.items.splice(index, 1)
                      }
                    "
                    >移除</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ this.id ? '编辑' : '保存' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'adsEdit',
  created() {},
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
        items: [],
      },
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
            res = await this.$axios.put(`/rest/ads/${this.id}`, this.model)
            this.$message({
              type: 'success',
              message: '编辑成功',
            })
          } else {
            res = this.$axios.post('/rest/ads/create', this.model)
            this.$message({
              type: 'success',
              message: '保存成功',
            })
          }

          if (res) {
            this.$router.push('/ads/list')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 根据id获取详情分类数据
    async getCategoryId(id) {
      let res = await this.$axios.get(`/rest/ads/${id}`)
      this.model = res
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
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
