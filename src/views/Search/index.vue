<template>
  <div>
    <TypeNav ref="typeNav"></TypeNav>
    <div class="main">
      <div class="py-container">
        <!-- bread -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 标签 -->
          <ul class="fl sui-tag">
            <li v-if="searchParams.categoryName" class="with-x">
              {{ searchParams.categoryName }}
              <i @click="removeCategory">×</i>
            </li>
            <li v-if="$route.params.keyword" class="with-x">
              {{ $route.params.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <li v-if="searchParams.trademark" class="with-x">
              {{ searchParams.trademark.split(':')[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <li v-for="(prop,index) in searchParams.props" :key="index" class="with-x">
              {{ prop.split(':')[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>

          </ul>
        </div>

        <!-- selector -->
        <SearchSelector @goAttr="goAttr" @goTrademark="goTrademark"/>

        <!-- details -->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="includes1?'active':''">
                  <a v-if="includes1"
                     @click="searchParams.order.includes('1:asc') ?order('1:desc'):order('1:asc')">
                    {{ searchParams.order.includes('1:asc') ? '综合⬆' : '综合⬇' }}
                  </a>
                  <a v-else @click="order('1:asc')">综合</a>
                </li>
                <li :class="includes2?'active':''">
                  <a v-if="includes2"
                     @click="searchParams.order.includes('2:asc') ?order('2:desc'):order('2:asc')">
                    {{ searchParams.order.includes('2:asc') ? '价格⬆' : '价格⬇' }}
                  </a>
                  <a v-else @click="order('2:asc')">价格</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li v-for="good in productList.goodsList" :key="good.id" class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg"/></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="good.title" href="item.html"
                       target="_blank">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger" href="success-cart.html" target="_blank">加入购物车</a>
                    <a class="sui-btn btn-bordered" href="javascript:void(0);">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器 -->
          <!-- pageNo：当前页码 -->
          <!-- pageSize：一页显示的条数 -->
          <!-- totalCount：总数 -->
          <!-- continues：连续页码 -->
          <!-- totalPages：总页数 -->
          <Pagination :continues="5" :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize"
                      :totalCount="productList.total" :totalPages="productList.totalPages"
                      @handlePage="handlePage"
          ></Pagination>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SearchSelector from '@/views/Search/SearchSelector/SearchSelector.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  mounted() {
    this.$refs.typeNav.isShow = false;
  },
  data() {
    return {
      searchParams: {
        category1Id: this.$route.query.category1Id,
        category2Id: this.$route.query.category2Id,
        category3Id: this.$route.query.category3Id,
        categoryName: this.$route.query.categoryName,
        pageNo: 1,
        pageSize: 10,

        // 默认排序
        order: '1:asc',

        trademark: '',
        props: [],

        keyword: this.$route.params.keyword,
      }
    };
  },
  computed: {
    ...mapGetters(['productList']),

    includes1() {
      return this.searchParams.order.includes('1');
    },
    includes2() {
      return this.searchParams.order.includes('2');
    },
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler() {
        this.getList();

        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
      },
    }
  },
  methods: {
    getList() {
      // 合并数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.$store.dispatch('search/list', this.searchParams);
    },
    removeCategory() {
      this.searchParams.categoryName = undefined;

      if (this.$route.params) {
        this.$router.push({
          name: 'search',
          params: this.$route.params
        });
      } else {
        this.$router.push({
          name: 'search',
        });
      }
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;

      if (this.$route.query) {
        this.$router.push({
          name: 'search',
          query: this.$route.query
        });
      } else {
        this.$router.push({
          name: 'search',
        });
      }

      this.$bus.$emit('clearKeyword');
    },
    goTrademark(trademark) {
      this.searchParams.trademark = `${ trademark.tmId }:${ trademark.tmName }`;
      this.getList();
    },
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getList();
    },
    goAttr(attrId, attrName, attrValue) {
      let attr = `${ attrId }:${ attrValue }:${ attrName }`;
      if (this.searchParams.props.indexOf(attr) === -1) {
        this.searchParams.props.push(attr);
      }
      this.getList();
    },
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getList();
    },

    order(order) {
      this.searchParams.order = order;
      this.getList();
    },

    handlePage(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getList();
    },
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
