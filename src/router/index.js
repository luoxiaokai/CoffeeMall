import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),

    //二级路由
    children: [
      {
        path: 'home',
        //别名
        alias: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),
      },
      {
        path: 'shopbag',
        name: 'Shopbag',
        component: () => import('../views/Shopbag.vue'),
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue'),
      }
    ]
  },

  {
    path: '/detail/:pid',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/sousuo',
    name: 'Sousuo',
    component: () => import('../views/Sousuo.vue'),
  },
  {
    path: '/personaldata',
    name: 'Personaldata',
    component: () => import('../views/Personaldata.vue'),
  },
  {
    path: '/myorder',
    name: 'Myorder',
    component: () => import('../views/Myorder.vue'),
  },
  {
    path: '/mycollection',
    name: 'Mycollection',
    component: () => import('../views/Mycollection.vue'),
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address.vue'),
  },
  {
    path: '/newaddress',
    name: 'Newaddress',
    component: () => import('../views/Newaddress.vue'),
  },
  {
    path: '/securitycenter',
    name: 'Securitycenter',
    component: () => import('../views/Securitycenter.vue'),
  },
  {
    path: '/deleteselected',
    name: 'Deleteselected',
    component: () => import('../views/Deleteselected.vue'),
  },
  {
    path: '/ordersettlement',
    name: 'Ordersettlement',
    component: () => import('../views/Ordersettlement.vue'),
  },

  
]

const router = new VueRouter({
  routes
})

export default router
