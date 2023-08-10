<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="handlePage(pageNo-1)">上一页</button>

    <!-- 开头部分 -->
    <template v-if="pageNo>=continues-1">
      <button
        :class="pageNo===1?'active':''"
        @click="handlePage(1)">
        1
      </button>
      <button>
        ...
      </button>
    </template>

    <!-- 中间部分 -->
    <button v-for="(page,index) in startNumAndEndNum"
            :key="index"
            :class="pageNo===page?'active':''"
            @click="handlePage(page)">
      {{ page }}
    </button>

    <!-- 末尾部分 -->
    <template v-if="totalPages-pageNo+1>=continues-1">
      <button>
        ...
      </button>
      <button
        :class="pageNo===totalPages?'active':''"
        @click="handlePage(totalPages)">
        {{ totalPages }}
      </button>
    </template>


    <button :disabled="pageNo===totalPages" @click="handlePage(pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ totalCount }} 条，共 {{ totalPages }} 页</button>
  </div>


  <!--<div class="fr page">-->
  <!--  <div class="sui-pagination clearfix">-->
  <!--    <ul>-->
  <!--      <li class="prev disabled">-->
  <!--        <a href="#">«上一页</a>-->
  <!--      </li>-->
  <!--      <li v-for="(pageNum,index) in productList.totalPages" :key="index"-->
  <!--          :class="pageNum===productList.pageNo?'active':''">-->
  <!--        <a href="#">{{ pageNum }}</a>-->
  <!--      </li>-->
  <!--      <li class="dotted"><span>...</span></li>-->
  <!--      <li class="next">-->
  <!--        <a href="#">下一页»</a>-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--    <div><span>共{{ productList.totalPages }}页&nbsp;</span></div>-->
  <!--  </div>-->
  <!--</div>-->
</template>

<script>

export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'totalCount', 'continues', 'totalPages'],
  computed: {
    // 总页数
    // totalPages() {
    //   // 向上取整
    //   return Math.ceil(this.totalCount / this.pageSize);
    // },
    startNumAndEndNum() {
      let start = 0;
      let end = 0;
      // 如果连续页码大于总页数
      if (this.continues > this.totalPages) {
        start = 1;
        end = this.totalPages;
      } else {
        if (this.pageNo - 2 < 1) {
          start = 1;
        } else {
          start = this.pageNo - Math.floor(this.continues / 2);
        }
        if (this.pageNo + 2 > this.totalPages) {
          end = this.totalPages;
        } else {
          end = this.pageNo + Math.floor(this.continues / 2);
        }
      }
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    handlePage(pageNo) {
      this.$emit('handlePage', pageNo);
    },
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.page {
  width: 733px;
  height: 66px;
  overflow: hidden;
  float: right;

  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      width: 490px;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      float: right;
      width: 241px;
    }
  }
}
</style>
