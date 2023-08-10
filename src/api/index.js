import request from '@/utils/request';

export function getBaseCategoryList() {
  return request.get('/product/getBaseCategoryList');
}

export function getProductList(data) {
  return request.post('/list', data);
}

export function getProductDetail(data) {
  return request.get(`/item/${ data }`);
}

export function addOrUpdateCart({ skuId, skuNum }) {
  return request.post(`/cart/addToCart/${ skuId }/${ skuNum }`);
}

export function getCart() {
  return request.get(`/cart/cartList`);

}

export function delCart(data) {
  return request.delete(`/cart/deleteCart/${ data }`);
}

export function updateCartProdStatus(skuId, isChecked) {
  return request.get(`/cart/checkCart/${ skuId }/${ isChecked }`);
}

// 获取验证码
export function getCode(phone) {
  return request.get(`/user/passport/sendCode/${ phone }`);
}

// 注册用户
export function registerUser({ phone, password, code }) {
  return request.post(`/user/passport/register`, { phone, password, code });
}

// 获取用户信息
export function getUserInfo() {
  return request.get(`/user/passport/auth/getUserInfo`);
}

// 登录
export function login({ phone, password }) {
  return request.post(`/user/passport/login`, { phone, password });
}

// 退出登录
export function logout() {
  return request.get(`/user/passport/logout`);
}

// 获取用户地址信息
export function getAddressInfo() {
  return request.get(`/user/userAddress/auth/findUserAddressList`);
}

// 获取订单交易页信息
export function getTradeInfo() {
  return request.get(`/order/auth/trade`);
}

// 提交订单
export function submitOrder(tradeNo, data) {
  return request.post(`/order/auth/submitOrder?tradeNo=${ tradeNo }`, data);
}

// 获取订单信息
export function getOrderInfo(orderId) {
  return request.get(`/payment/weixin/createNative/${ orderId }`);
}

// 获取订单支付状态
export function getPayStatus(orderId) {
  return request.get(`/payment/weixin/queryPayStatus/${ orderId }`);
}


// 获取订单列表
export function getOrderList(page, limit) {
  return request.get(`/order/auth/${ page }/${ limit }`);
}
