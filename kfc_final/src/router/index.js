import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/home', //页面访问路径
  //   name: 'Home', //这个页面叫什么名字，名字要大写
  //   component: Home
  // },
  {
    path: '/login', //页面访问路径
    name: 'Login', //这个页面叫什么名字，名字要大写
    component: () => import('../views/Login') //这种导入方式为懒加载,第一个页面一般不用懒加载，会自动加载进去
    //第二种方式为外面导入，import Login from '../views/Login'
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main'),
    //二级路由
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/My'),
      },
    ]
  },
  //重定向 当我访问 / 的时候 就重定向到home页面
  // * 除了上面已经定义的路径 会自动跳转到你想要的路由
  {
    path: '/',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail')
  },
  {
    path: '/detail2',
    name: 'Detail2',
    component: () => import('../views/Detail2')
  },
  {
    path: '/car',
    name: 'Car',
    component: () => import('../views/Car')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/Pay')
  },
  {
    path: '/newAddress',
    name: 'NewAddress',
    component: () => import('../views/NewAddress')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order')
  },


]

// vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
// 如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
