import { addOrUpdateCart, getCart } from '@/api';

export default {
  namespaced: true,
  state: {
    shoppingCartList: []
  },
  mutations: {
    GET_SHOPPING_CART(state, data) {
      state.shoppingCartList = data;
    },
  },
  actions: {
    async addOrUpdateShoppingCart({ commit }, data = {}) {
      // addOrUpdateCart(data).then((res) => {
      //   if (res.code === 200) {
      //     let shoppingCart = res.data;
      //     commit('ADD_OR_UPDATE_SHOPPINGCART', shoppingCart);
      //   }
      // });
      let result = await addOrUpdateCart(data);
      if (result.code === 200) {
        return Promise.resolve('ok');
      } else {
        return Promise.reject('no ok');
      }
    },
    getShoppingCart({ commit }) {
      getCart().then(res => {
        commit('GET_SHOPPING_CART', res.data);
      });
    },
  },
};
