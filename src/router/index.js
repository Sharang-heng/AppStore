import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import ShoppingCar from '../views/shoppingCar'
import Mark from '../views/Mark'
import HomePage from '../views/HomePage'
import Profile from '../views/Profile'
import ShopRegister from '../views/shopRegister'
import myShop from '../views/myShop'
// import setAccount from '../views/AccountSetting'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  //首页
  {
    path: '/home',
    component: HomePage
  },
  //个人信息页
  {
    path: '/profile',
    component: Profile
    // children: [{
    //   path: '/setAccount',
    //   component: setAccount
    // }
  // ]
  },
  {
    path: '/shoppingcar',
    component: ShoppingCar
  },
  // 收藏夹页面
  {
    path: '/mark',
    component: Mark
  },
  {
    path: '/shopRegister',
    component: ShopRegister
  },
  {
    path: '/myShop',
    component: myShop
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to代表将要访问的路径 
  // from代表从哪个路径跳转而来
  // next是一个函数表示放行
  // next()  next('/login')表示要强制跳转的路径
  if (to.path == '/register') return next();
  if (to.path == '/login') return next();
  // // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
})
export default router