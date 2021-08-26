const getters = {
  // 购物车商品数量
  cartLength(state) {
    return state.carts.length
  },
  
  // 地址列表
  addressList(state) {
    return state.addresses.map(item => ({
      id: item.id,
      name: item.name,
      tel: item.tel,
      address: item.province + item.city + item.county + item.addressDetail,
      isDefault: item.isDefault
    }));
  },

  // 默认地址
  defaultAddress(_, getters) {
    return getters.addressList.find(item => item.isDefault === true);
  }
}

export default getters
