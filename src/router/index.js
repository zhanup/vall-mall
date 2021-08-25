import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/phone',
    name: 'Phone',
    component: () => import('@/views/Phone')
  },
  {
    path: '/parts',
    name: 'Parts',
    component: () => import('@/views/Parts')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/Product')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/Detail')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('@/views/Collection'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('@/views/Address'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/new_address',
    name: 'NewAddress',
    component: () => import('@/views/NewAddress'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/edit_address',
    name: 'EditAddress',
    component: () => import('@/views/EditAddress'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register')
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history'
})

// 全局前置守卫
router.beforeEach((to, from, next) => { 
  if(to.meta.requireAuth) {
    if(!localStorage.getItem('user')) {
      next({ name:'Login' })
    }
  }
  next()
})

export default router