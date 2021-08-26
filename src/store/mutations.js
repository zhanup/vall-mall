import { Dialog, Toast  } from 'vant';
import { v4 as uuidv4 } from 'uuid';

import {
  ADD_TO_CART,
  ADD_COUNT,
  DEDUCT_COUNT,
  SELECT_GOODS,
  SELECT_ALL_GOODS,
  ADD_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS
} from './mutations-type';

const mutations = {
  // 加入购物车
  [ADD_TO_CART](state, payload) {
    if (state.carts.filter(item => item.title === payload.title).length) {
      Toast('商品已存在！');
      return false;
    }
    payload.count = 1;
    payload.checked = true;
    state.carts.push(payload);
    Toast('添加商品成功！');
    localStorage.setItem('carts', JSON.stringify(state.carts));
  },
  // 购物车 商品数量加一
  [ADD_COUNT](state, payload) {
    state.carts.forEach(item => {
      if (item.title === payload) {
        item.count >= 99 ? Toast('商品数量不可超过100！') : item.count++;
      }
    })
    localStorage.setItem('carts', JSON.stringify(state.carts));
  },
  // 购物车 商品数量减一
  [DEDUCT_COUNT](state, payload) {
    state.carts.forEach(item => {
      if (item.title === payload) {
        if (item.count === 1) {
          Dialog.confirm({ title: '提示', message: `是否删除${payload}?`,})
            .then(() => {
              state.carts = state.carts.filter(item => item.title !== payload);
              localStorage.setItem('carts', JSON.stringify(state.carts));
            })
            .catch(() => {});
            return false;
        } 
        item.count--;
        localStorage.setItem('carts', JSON.stringify(state.carts));
      }
    });
  },
  // 购物车 商品选择和取消
  [SELECT_GOODS](state, payload) {
    state.carts.forEach(item => {
      if (item.title === payload) {
        item.checked = !item.checked;
        localStorage.setItem('carts', JSON.stringify(state.carts));
      }
    });
  },
  // 购物车 取消选择和选择全部
  [SELECT_ALL_GOODS](state) {
    let len = 0;
    state.carts.forEach(item => {
      if (item.checked) len++;
    });

    if (state.carts.length === len) {
      state.carts.forEach(item => item.checked = false);
    } else {
      state.carts.forEach(item => item.checked = true);
    }

    localStorage.setItem('carts', JSON.stringify(state.carts));
  },
  // 添加地址
  [ADD_ADDRESS](state, payload) {
    payload.id = uuidv4();
    state.addresses.push(payload);
    localStorage.setItem('addresses', JSON.stringify(state.addresses));
  },
  // 删除地址
  [DELETE_ADDRESS](state, id) {
    state.addresses = state.addresses.filter(item => item.id !== id);
    localStorage.setItem('addresses', JSON.stringify(state.addresses));
  },
  // 更新地址
  [UPDATE_ADDRESS](state, payload) {
    state.addresses = state.addresses.map(item => {
      if (item.id === payload.id) {
        return payload;
      } else {
        return item;
      }
    });
    localStorage.setItem('addresses', JSON.stringify(state.addresses));
  }
}

export default mutations
