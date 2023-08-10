import { getBaseCategoryList } from '@/api';

export default {
  namespaced: true,
  state: {
    categoryList: []
  },
  mutations: {
    LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
  },
  actions: {
    list({ commit }) {
      getBaseCategoryList().then((res) => {
        let categoryList = res.data;
        commit('LIST', categoryList);
      });
    },
  },
};
