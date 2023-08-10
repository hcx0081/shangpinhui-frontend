<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 未登录 -->
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!--已登录-->
          <p v-else>
            <span>{{ userInfo.name }}</span>
            <a class="register" @click="logout">退出登录</a>
          </p>

        </div>
        <div class="typeList">
          <router-link to="/center/myOrder">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!-- 头部第二行 搜索区域 -->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img alt="" src="./images/logo.png">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input id="autocomplete" v-model="keyword" class="input-error input-xxlarge" type="text"/>
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="search">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  mounted() {
    this.$bus.$on('clearKeyword', () => {
      this.keyword = undefined;
    });
  },
  beforeDestroy() {
    this.$bus.$off('clearKeyword');
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      keyword: ''
    };
  },
  methods: {
    search() {
      let to = {
        name: 'search',
        params: {
          keyword: this.keyword
        }
      };
      // 合并路由参数
      if (this.$route.query) {
        to.query = this.$route.query;
      }
      this.$router.push(to);
    },
    async logout() {
      await this.$store.dispatch('user/userLogout');
      await this.$router.push('/home');
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }

        a:hover {
          cursor: pointer;
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
