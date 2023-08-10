import { getAddressInfo, getTradeInfo } from '@/api';

export default {
  namespaced: true,
  state: {
    addressInfoList: [],
    tradeInfo: {}
  },
  mutations: {
    LIST(state, addressInfoList) {
      state.addressInfoList = addressInfoList;
    },
    INFO(state, tradeInfo) {
      state.tradeInfo = tradeInfo;
    },
  },
  actions: {
    list({ commit }, data = {}) {
      getAddressInfo(data).then((res) => {
        let addressInfoList = res.data;
        commit('LIST', addressInfoList);
      });
    },
    info({ commit }, data = {}) {
      getTradeInfo(data).then((res) => {
        let tradeInfo = res.data;
        commit('INFO', tradeInfo);
      });
    },
  },
};
