const getters = {
  cartLength(state) {
    return state.carts.length
  },
  addressList(state) {
    return state.addresses.map(item => ({
      id: item.id,
      name: item.name,
      tel: item.tel,
      address: item.province + item.city + item.county + item.addressDetail,
      isDefault: item.isDefault
    }));
  }
}

export default getters
