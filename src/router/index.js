import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const whiteList = ['/login', '/register', '/home'];

const routes = [
  {
    path: '/center',
    name: 'center',
    component: () => import('@/views/Center/index.vue'),
    meta: { isShow: true },
    children: [
      {
        path: 'myOrder',
        name: 'myOrder',
        component: () => import('@/views/Center/MyOrder/index.vue'),
        meta: { isShow: true },
      },
      {
        path: 'groupOrder',
        name: 'groupOrder',
        component: () => import('@/views/Center/GroupOrder/index.vue'),
        meta: { isShow: true },
      }
    ]
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: () => import('@/views/PaySuccess/index.vue'),
    meta: { isShow: true }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay/index.vue'),
    meta: { isShow: true },
    // 独享路由守卫
    beforeEnter(to, from, next) {
      if (from.path === '/trade') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/views/Trade/index.vue'),
    meta: { isShow: true }
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: () => import('@/views/ShopCart/index.vue'),
    meta: { isShow: true }
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: () => import('@/views/AddCartSuccess/index.vue'),
    meta: { isShow: true }
  },
  {
    path: '/detail/:skuId',
    name: 'detail',
    component: () => import('@/views/Detail/index.vue'),
    meta: { isShow: true }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: { isShow: true }
  },
  {
    // 注意此处的正则
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/views/Search/index.vue'),
    meta: { isShow: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: { isShow: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '@/views/Register/index.vue'),
    meta: { isShow: false }
  },
  {
    path: '*',
    redirect: '/home'
  }
];

const router = new VueRouter({
  routes,

  /* 滚动行为 */
  scrollBehavior() {
    return { x: 0, y: 0, behavior: 'smooth' };
  },
});

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;

  // 如果已登录
  if (token) {
    if (to.path === '/login') {
      next('/');
    } else {
      // 如果用户名存在
      if (name) {
        next();
      }
      // 如果用户名不存在
      else {
        try {
          await store.dispatch('user/userInfo');
          next();
        } catch (e) {
          alert(e);
          await store.dispatch('user/userLogout');
          next('/login');
        }
      }
    }
  }
  // 如果未登录
  else {
    // 如果是登录页面，放行
    if (whiteList.includes(to.path)) {
      next();
    } else {
      // 跳转指定路径
      next(`/login?redirect=${ to.fullPath }`);
    }
  }
});


// 重写方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {
    }, () => {
    });
  }
};
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => {
    }, () => {
    });
  }
};
export default router;
