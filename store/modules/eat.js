const eat = {
  state: {
    eatDetails: null
  },
  mutations: {
    _getEatDetails(state, obj) {
      state.eatDetails = obj
      console.log(state.eatDetails)
    }
  }
}

export default eat
