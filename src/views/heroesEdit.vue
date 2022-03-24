<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <!-- 原生表单时间navtive -->
    <el-form label-width="120px" :rules="rules" :model="model" ref="ruleForm">
      <el-tabs type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="英雄名称" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="英雄称号" prop="name">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="英雄图片" prop="avatar">
            <el-upload class="avatar-uploader" :action="$axios.defaults.baseURL + '/upload'" :show-file-list="false" :on-success="handleSuccess">
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="英雄类型">
            <el-select v-model="model.categories" label="英雄类型" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="英雄难度">
            <el-rate :max="9" v-model="model.scores.difficult" show-score style="margin-top: 0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="英雄技能">
            <el-rate :max="9" v-model="model.scores.skills" show-score style="margin-top: 0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="英雄攻击">
            <el-rate :max="9" v-model="model.scores.attack" show-score style="margin-top: 0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="英雄生存">
            <el-rate :max="9" v-model="model.scores.survive" show-score style="margin-top: 0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items_one" label="英雄类型" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items_two" label="英雄类型" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能">
          <el-button size="small" @click="model.skills.push({})"> <i class="el-icon-plus"></i>添加技能 </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="avatar">
                <el-upload
                  class="avatar-uploader"
                  :action="$axios.defaults.baseURL + '/upload'"
                  :headers="getAutheaders()"
                  :show-file-list="false"
                  :on-success="
                    (res) => {
                      item.icon = res.url
                    }
                  "
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  size="small"
                  @click="
                    () => {
                      model.skills.splice(index, 1)
                    }
                  "
                  >移除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 2rem">
        <el-button type="primary" @click="submitForm('ruleForm')">{{ this.id ? '编辑' : '保存' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'heroesEdit',
  props: {
    id: {},
  },
  created() {
    this.getCategories()
    this.getItems()
    this.id && this.getCategoryId(this.id)
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
      // 英雄类型
      categories: [],
      // 装备分类数据
      items: [],

      model: {
        // 英雄名称
        name: '',
        // 英雄头像
        avatar: '',
        // 称号
        title: '',
        // 英雄难度
        scores: {
          difficult: 1,
          skills: 1,
          attack: 1,
          survive: 1,
        },
        // 使用技巧
        usageTips: '',
        // 对抗技巧
        battleTips: '',
        // 团战思路
        teamTips: '',
        // 技能
        skills: [],
      },

      rules: {
        name: [{ validator: validaterulename, trigger: 'blur' }],
        avatar: [{ validator: validateruleicon, trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 图片上传成功回调
    handleSuccess(res) {
      this.model.avatar = res.url
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res
          // 如果存在则进行修改
          if (this.id) {
            res = await this.$axios.put(`/rest/heroes/${this.id}`, this.model)
            this.$message({
              type: 'success',
              message: '编辑成功',
            })
          } else {
            res = this.$axios.post('/rest/heroes/create', this.model)
            this.$message({
              type: 'success',
              message: '保存成功',
            })
          }

          if (res) {
            this.$router.push('/heroes/list')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 根据id获取详情分类数据
    async getCategoryId(id) {
      let res = await this.$axios.get(`/rest/heroes/${id}`)
      this.model = res
    },

    // 获取到类型数据
    async getCategories() {
      let res = await this.$axios.get('rest/categories/list')
      this.categories = res
    },

    // 获取到物品数据
    async getItems() {
      let res = await this.$axios.get('/rest/item/list')
      this.items = res
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
