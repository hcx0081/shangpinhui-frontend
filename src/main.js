import Vue from 'vue';
// 引入插件
import '@/plugins';

import App from './App.vue';
import router from './router';
import store from './store';

// 全局组件
import TypeNav from '@/components/TypeNav/index.vue';
import Pagination from '@/components/Pagination/index.vue';

// 引入Swiper样式
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.css';
// 引入Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/plugins/lazyload';


// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);


Vue.use(ElementUI);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),

  beforeCreate() {
    // 定义全局事件总线
    Vue.prototype.$bus = this;
  }
}).$mount('#app');
