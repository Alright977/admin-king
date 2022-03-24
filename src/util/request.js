import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'

let instance = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
  timeout: 80000,
})

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearar ' + sessionStorage.token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (config) => {
    return config.data
  },
  (error) => {
    if (error.response.data.message) {
      // 做一个全局的错误消息处理
      Vue.prototype.$message({
        type: 'error',
        message: error.response.data.message,
      })
    }
    if (error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
