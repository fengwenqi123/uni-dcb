const unConfirmed = {
  state: {
    unConfirmedDetails: null
  },
  mutations: {
    _getDetails(state, obj) {
      state.unConfirmedDetails = obj
      console.log(state.unConfirmedDetails)
    }
  }
}

export default unConfirmed
