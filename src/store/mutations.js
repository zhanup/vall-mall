import { Dialog, Toast  } from 'vant'

import {
  ADD_TO_CART,
  ADD_COUNT,
  DEDUCT_COUNT,
  SELECT_GOODS,
  SELECT_ALL_GOODS
} from './mutations-type'

const mutations = {
  [ADD_TO_CART](state, payload) {  //加入购物车
    if (state.carts.filter(item => item.title === payload.title).length) {
      Toast('商品已存在！')
      return false
    }
    payload.count = 1
    payload.checked = true
    state.carts.push(payload)
    Toast('添加商品成功！')
    localStorage.setItem('carts', JSON.stringify(state.carts))
  },
  [ADD_COUNT](state, payload) {  //商品属性加一
    state.carts.forEach(item => {
      if (item.title === payload) {
        item.count >= 99 ? Toast('商品数量不可超过100！') : item.count++
      }
    })
    localStorage.setItem('carts', JSON.stringify(state.carts))
  },
  [DEDUCT_COUNT](state, payload) {  //商品数量减一
    state.carts.forEach(item => {
      if (item.title === payload) {
        if (item.count === 1) {
          Dialog.confirm({ title: '提示', message: `是否删除${payload}?`,})
            .then(() => {
              state.carts = state.carts.filter(item => item.title !== payload)
              localStorage.setItem('carts', JSON.stringify(state.carts))
            })
            .catch(() => {})
            return false
        } 
        item.count--
        localStorage.setItem('carts', JSON.stringify(state.carts))
      }
    })
  },
  [SELECT_GOODS](state, payload) {  //商品选择和取消
    state.carts.forEach(item => {
      if (item.title === payload) {
        item.checked = !item.checked
        localStorage.setItem('carts', JSON.stringify(state.carts))
      }
    })
  },
  [SELECT_ALL_GOODS](state) {  //取消选择和选择全部
    let len = 0;
    state.carts.forEach(item => {
      if (item.checked) len++;
    });

    if (state.carts.length === len) {
      state.carts.forEach(item => item.checked = false)
    } else {
      state.carts.forEach(item => item.checked = true)
    }

    localStorage.setItem('carts', JSON.stringify(state.carts))
  }
}

export default mutations
