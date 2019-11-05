const getters = {
  goodsData: state => state.goods.goodsData,
  selectFoods: state => state.goods.selectFoods,
  totalPrice: state => state.goods.totalPrice,
  remarks: state => state.remarks.remarks,
  unConfirmedDetails: state => state.unConfirmed.unConfirmedDetails,
  eatDetails: state => state.unConfirmed.eatDetails
}
export default getters
