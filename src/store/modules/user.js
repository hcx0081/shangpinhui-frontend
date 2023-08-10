import { getUserInfo, login, logout, registerUser } from '@/api';
import { getToken, removeToken, setToken } from '@/utils/token';

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    USER_LOGIN(state, token) {
      state.token = token;
    },
    USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    USER_LOGOUT(state) {
      state.token = '';
      state.userInfo = {};
      removeToken();
    },
  },
  actions: {
    userRegister(_, { phone, password, code }) {
      return new Promise((resolve, reject) => {
        registerUser({ phone, password, code }).then(res => {
          if (res.code === 200) {
            return resolve('注册成功');
          } else {
            return reject('注册失败');
          }
        });
      });
    },
    async userLogin({ commit }, { phone, password }) {
      let result = await login({ phone, password });
      if (result.code === 200) {
        let token = result.data.token;
        commit('USER_LOGIN', token);

        // 持久化存储
        setToken(result.data.token);
        return Promise.resolve('登录成功');
      } else {
        return Promise.reject('登录失败');
      }
    },
    async userInfo({ commit }) {
      let result = await getUserInfo();

      if (result.code === 200) {
        let userInfo = result.data;
        commit('USER_INFO', userInfo);
        return Promise.resolve('获取用户信息成功');
      } else {
        return Promise.reject('获取用户信息失败');
      }
    },
    async userLogout({ commit }) {
      // 通知服务器清除token
      let result = await logout();
      if (result.code === 200) {
        commit('USER_LOGOUT');
      }
    },
  },
};
