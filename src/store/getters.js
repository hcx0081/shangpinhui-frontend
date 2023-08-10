export default {
  categoryList: state => state.typeNav.categoryList,

  productList: state => state.search.productList,

  categoryView: state => state.detail.productDetail.categoryView || {},
  skuInfo: state => state.detail.productDetail.skuInfo || [{}],
  spuSaleAttrList: state => state.detail.productDetail.spuSaleAttrList || [],

  shoppingCartList: state => state.shoppingCart.shoppingCartList[0] || [],

  userInfo: state => state.user.userInfo || {},

  addressInfoList: state => state.trade.addressInfoList || [],
  tradeInfo: state => state.trade.tradeInfo || {},
};
