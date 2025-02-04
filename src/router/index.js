import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/LoginVue.vue'
import Home from '../components/HomePage.vue'
import Welcome from '../components/WelcomePage.vue'
import Users from '../components/user/UsersPage.vue'
import Rights from '../components/power/RightsPage.vue'
import Roles from '../components/power/RolesPage.vue'
import Cate from '../components/goods/CatePage.vue'
import Params from '../components/goods/ParamsPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: 'welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //  next()  放行  next('/login') 强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
