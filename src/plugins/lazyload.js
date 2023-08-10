// 图片懒加载
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import logo from '@/assets/logo.png';

Vue.use(VueLazyload, {
  loading: logo
});
