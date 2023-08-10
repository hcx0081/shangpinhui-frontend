import { getProductList } from '@/api';

export default {
  namespaced: true,
  state: {
    productList: []
  },
  mutations: {
    LIST(state, productList) {
      state.productList = productList;
    },
  },
  actions: {
    list({ commit }, data = {}) {
      getProductList(data).then((res) => {
        let productList = res.data;
        commit('LIST', productList);
      });
    },
  },
};
