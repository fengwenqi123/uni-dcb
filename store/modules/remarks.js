const remarks = {
  state: {
    remarks: ''
  },
  mutations: {
    _getRemarks(state, obj) {
      state.remarks = obj
      console.log(state.remarks)
    }
  }
}

export default remarks
