import { getProductDetail } from '@/api';
import { getUuidToken } from '@/utils/uuidToken';

export default {
  namespaced: true,
  state: {
    productDetail: {},
    uuidToken: getUuidToken(),
  },
  mutations: {
    DETAIL(state, productDetail) {
      state.productDetail = productDetail;
    },
  },
  actions: {
    detail({ commit }, data = {}) {
      getProductDetail(data).then((res) => {
        if (res.code === 200) {
          let productDetail = res.data;
          commit('DETAIL', productDetail);
        }
      });
    },
  },
};
