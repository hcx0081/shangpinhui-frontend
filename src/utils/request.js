import axios from 'axios';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';
import { getToken } from '@/utils/token';

// 创建Axios实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  NProgress.start();

  if (store.state.detail.uuidToken) {
    config.headers.userTempId = store.state.detail.uuidToken;
  }
  if (store.state.user.token || getToken()) {
    config.headers.token = store.state.user.token || getToken();
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((res) => {
  NProgress.done();
  return res.data;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
