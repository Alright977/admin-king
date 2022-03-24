import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: 'categories/create',
        name: 'categoriesCreate',
        component: () => import('../views/categoryEdit.vue'),
      },
      {
        path: 'categories/list',
        name: 'categoriesList',
        component: () => import('../views/categoryList.vue'),
      },
      {
        path: 'categories/edit/:id',
        name: 'categoriesEdit',
        props: true,
        component: () => import('../views/categoryEdit.vue'),
      },
      {
        path: 'items/create',
        name: 'itemCreate',
        component: () => import('../views/itemEdit.vue'),
      },
      {
        path: 'items/list',
        name: 'itemEdit',
        component: () => import('../views/itemList.vue'),
      },
      {
        path: 'items/edit/:id',
        name: 'itemEditId',
        props: true,
        component: () => import('../views/itemEdit.vue'),
      },
      {
        path: 'heroes/create',
        name: 'heroesCreate',
        component: () => import('../views/heroesEdit.vue'),
      },
      {
        path: 'heroes/list',
        name: 'heroesEdit',
        component: () => import('../views/heroesList.vue'),
      },
      {
        path: 'heroes/edit/:id',
        name: 'heroesEditId',
        props: true,
        component: () => import('../views/heroesEdit.vue'),
      },
      {
        path: 'articles/create',
        name: 'articlesCreate',
        component: () => import('../views/articlesEdit.vue'),
      },
      {
        path: 'articles/list',
        name: 'articlesEdit',
        component: () => import('../views/articlesList.vue'),
      },
      {
        path: 'articles/edit/:id',
        name: 'articlesEditId',
        props: true,
        component: () => import('../views/articlesEdit.vue'),
      },
      {
        path: 'ads/create',
        name: 'adsCreate',
        component: () => import('../views/adsEdit.vue'),
      },
      {
        path: 'ads/list',
        name: 'adsEdit',
        component: () => import('../views/adsList.vue'),
      },
      {
        path: 'ads/edit/:id',
        name: 'adsEditId',
        props: true,
        component: () => import('../views/adsEdit.vue'),
      },

      {
        path: 'admin_users/create',
        name: 'userCreate',
        component: () => import('../views/adminUser.vue'),
      },
      {
        path: 'admin_users/list',
        name: 'userEdit',
        component: () => import('../views/adminList.vue'),
      },
      {
        path: 'admin_users/edit/:id',
        name: 'userEditId',
        props: true,
        component: () => import('../views/adminUser.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// 前端路由守卫处理
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.token) {
    next('/login')
  }
  next()
})

export default router
