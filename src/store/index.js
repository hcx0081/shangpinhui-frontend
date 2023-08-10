import Vue from 'vue';
import Vuex from 'vuex';
import typeNav from '@/store/modules/typeNav';
import getters from '@/store/getters';
import search from '@/store/modules/search';
import detail from '@/store/modules/detail';
import shoppingCart from '@/store/modules/shoppingCart';
import user from '@/store/modules/user';
import trade from '@/store/modules/trade';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { typeNav, search, detail, shoppingCart, user, trade },
  getters
});
// state: {
// },
// getters: {
// },
// mutations: {
// },
// actions: {
// },
// modules: {
// }
