<template>
  <div class="container">
    <h1>分类列表</h1>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID" width="400px"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="removeClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'heroesList',
  created() {
    this.getCategoryList()
  },
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    // 获取分裂列表数据
    async getCategoryList() {
      const res = await this.$axios.get('/rest/heroes/list')
      this.tableData = res
    },

    // 点击编辑跳转
    handleClick(id) {
      this.$router.push(`/heroes/edit/${id}`)
    },

    // 根据id删除分类
    removeClick(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', `${row.name}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        let res = await this.$axios.delete(`/rest/heroes/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        if (res.success) {
          this.getCategoryList()
        }
      })
    },
  },
}
</script>

<style></style>
