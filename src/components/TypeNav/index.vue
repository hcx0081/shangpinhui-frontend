<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="closeShow">
      <h2 class="all" @mouseenter="openShow">全部商品分类</h2>
      <!-- 三级联动 -->
      <div v-show="isShow" class="sort">
        <div class="all-sort-list2">
          <!-- 一级分类 -->
          <div v-for="(c1,index) in categoryList" :key="c1.categoryId" class="item">
            <h3 :class="c1.bgClass" @mouseenter="setBg(index)" @mouseleave="clearBg(index)">
              <a @click="goCategory({categoryName:c1.categoryName,category1Id:c1.categoryId})">{{
                  c1.categoryName
                }}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <!-- 二级分类 -->
                <dl v-for="c2 in c1.categoryChild" :key="c2.categoryId" class="fore">
                  <dt>
                    <a @click="goCategory({categoryName:c2.categoryName,category2Id:c2.categoryId})">
                      {{ c2.categoryName }}</a>
                  </dt>
                  <dd>
                    <!-- 三级分类 -->
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a @click="goCategory({categoryName:c3.categoryName,category3Id:c3.categoryId})">
                        {{ c3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TypeNav',
  data() {
    return {
      isShow: true
    };
  },
  computed: {
    ...mapGetters(['categoryList']),
  },
  methods: {
    setBg(index) {
      this.$set(this.categoryList[index], 'bgClass', 'bgClass');
    },
    clearBg(index) {
      this.$set(this.categoryList[index], 'bgClass', '');
    },
    goCategory(data) {
      let to = {
        name: 'search',
      };
      let query = { categoryName: data.categoryName };

      if (data.category1Id) {
        query.category1Id = data.category1Id;
      }
      if (data.category2Id) {
        query.category2Id = data.category2Id;
      }
      if (data.category3Id) {
        query.category3Id = data.category3Id;
      }

      // 合并路由参数
      if (this.$route.params) {
        to.params = this.$route.params;
      }

      to.query = query;
      this.$router.push(to);
    },
    openShow() {
      if (this.$route.path !== '/home') {
        this.isShow = true;
      }
    },
    closeShow() {
      if (this.$route.path !== '/home') {
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bgClass {
  background-color: skyblue
}

.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }

            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
