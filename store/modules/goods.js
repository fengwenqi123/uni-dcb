const goods = {
  state: {
    goodsData: [],
    selectFoods: [],
    totalPrice: null
  },
  mutations: {
    _getGoods(state, obj) {
      state.goodsData = obj
      console.log(state.goodsData)
    },
    _getSelectFoods(state, obj) {
      state.selectFoods = obj
      console.log(state.selectFoods)
    },
    _getTotalPrice(state, obj) {
      state.totalPrice = obj
      console.log(state.totalPrice)
    }
  }
}

export default goods
