<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul v-for="cartInfo in shoppingCartList.cartInfoList" :key="cartInfo.id" class="cart-list">
          <li class="cart-list-con1">
            <input :checked="cartInfo.isChecked" name="chk_list" type="checkbox"
                   @click="handleChecked(cartInfo.skuId,cartInfo.isChecked)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <!--<li class="cart-list-con3">-->
          <!--  <div class="item-txt">语音升级款</div>-->
          <!--</li>-->
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handleNum('-',cartInfo)">-</a>
            <input :value="cartInfo.skuNum" autocomplete="off" class="itxt" minnum="1" type="text"
                   @change="handleNum('change',cartInfo,$event.target.value-cartInfo.skuNum)">
            <a class="plus" @click="handleNum('+',cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delCartById(cartInfo.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input :checked="isAllChecked" class="chooseAll" type="checkbox" @click="handleAllChecked(isAllChecked)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delCheckedCartById">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span> {{ checkedNum }} </span> 件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { delCart, updateCartProdStatus } from '@/api';

export default {
  name: 'ShopCart',
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters(['shoppingCartList']),
    // 总价
    totalPrice() {
      return this.shoppingCartList.cartInfoList?.reduce((prev, curr) => {
        return prev + (curr.cartPrice * curr.skuNum);
      }, 0);
    },
    isAllChecked() {
      return this.shoppingCartList.cartInfoList?.every((el) => el.isChecked === 1);
    },
    checkedNum() {
      return this.shoppingCartList.cartInfoList?.reduce((prev, curr) => {
        if (curr.isChecked === 1) {
          return prev + 1;
        } else {
          return prev + 0;
        }
      }, 0);
    },
  },
  methods: {
    getList() {
      this.$store.dispatch('shoppingCart/getShoppingCart');
    },

    async handleNum(type, cartInfo, chNum) {
      console.log(chNum);

      if (type === '-') {
        if (cartInfo.skuNum === 0) {
          return;
        }
        chNum = -1;
      }
      if (type === '+') {
        chNum = +1;
      }
      if (type === 'change') {
        if (isNaN(chNum) || chNum < 0 || !Number.isInteger(chNum)) {
          alert('输入错误');
          return;
        }
        chNum = chNum;
      }
      try {
        await this.$store.dispatch('shoppingCart/addOrUpdateShoppingCart', { skuId: cartInfo.skuId, skuNum: chNum });

        this.getList();
      } catch (e) {
        alert(e);
      }
    },
    delCartById(skuId) {
      delCart(skuId).then(res => {
        alert(res.msg);
        this.getList();
      });
    },
    delCheckedCartById() {
      let pArr = [];
      this.shoppingCartList.cartInfoList.forEach(cartInfo => {
        pArr.push(new Promise((resolve) => {
          if (cartInfo.isChecked === 1) {
            delCart(cartInfo.skuId).then(res => {
              resolve(res.message);
            });
          }
        }));
      });
      Promise.all(pArr).then(() => {
        alert('删除成功');
        this.getList();
      });
    },
    async handleChecked(skuId, isChecked) {
      isChecked = isChecked === 0 ? 1 : 0;
      await updateCartProdStatus(skuId, isChecked);
      await this.getList();
    },
    handleAllChecked(isAllChecked) {
      // 如果是全选状态 -》 全不选
      if (isAllChecked === true) {
        let pArr = [];
        this.shoppingCartList.cartInfoList.forEach(cartInfo => {
          pArr.push(new Promise((resolve) => {
            if (cartInfo.isChecked === 1) {
              updateCartProdStatus(cartInfo.skuId, 0).then(res => {
                resolve(res.message);
              });
            }
          }));
        });
        Promise.all(pArr).then(() => {
          this.getList();
          alert('修改成功');
        });
      }
      // 如果是全不选状态 -》 全选
      if (isAllChecked === false) {
        let pArr = [];
        this.shoppingCartList.cartInfoList.forEach(cartInfo => {
          pArr.push(new Promise((resolve) => {
            if (cartInfo.isChecked === 0) {
              updateCartProdStatus(cartInfo.skuId, 1).then(res => {
                resolve(res.message);
              });
            }
          }));
        });
        Promise.all(pArr).then(() => {
          this.getList();
          alert('修改成功');
        });
      }

    },
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
