import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'

// 安装插件
Vue.use(Vuex)

const state = {
  carts: localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : [],
  orderList: [],
  addressList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store
