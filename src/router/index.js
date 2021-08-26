import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home'
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
    component: () => import('@/views/home/Phone')
  },
  {
    path: '/parts',
    name: 'Parts',
    component: () => import('@/views/home/Parts')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/home/Product')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/news/News')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/news/Detail')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/Profile'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/profile/Order'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('@/views/profile/Collection'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('@/views/profile/address/Address'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/new_address',
    name: 'NewAddress',
    component: () => import('@/views/profile/address/NewAddress'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/edit_address',
    name: 'EditAddress',
    component: () => import('@/views/profile/address/EditAddress'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/profile/Cart'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/Register')
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
      next({ name:'Login' });
    }
  }
  next();
})

export default router