<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="orders">

        <table v-for="record in orderInfo.records" :key="record.id" class="order-item">
          <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle">
                {{ record.createTime }}　订单编号：{{ record.outTradeNo }}
                <span class="pull-right delete"><img src="../images/delete.png"></span>
              </span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(orderDetail,index) in record.orderDetailList" :key="orderDetail.id">
            <td width="60%">
              <div class="typographic">
                <img :src="orderDetail.imgUrl" width="100px">
                <a class="block-text" href="#">{{ orderDetail.skuName }}</a>
                <span>x{{ orderDetail.skuNum }}</span>
                <a class="service" href="#">售后申请</a>
              </div>
            </td>

            <td v-if="index===0" :rowspan="record.orderDetailList.length" class="center" width="8%">{{
                record.consignee
              }}
            </td>
            <td v-if="index===0" :rowspan="record.orderDetailList.length" class="center" width="13%">
              <ul class="unstyled">
                <li>总金额¥{{ record.totalAmount }}.00</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td v-if="index===0" :rowspan="record.orderDetailList.length" class="center" width="8%">
              <a class="btn" href="#">{{ record.orderStatusName }} </a>
            </td>
            <td v-if="index===0" :rowspan="record.orderDetailList.length" class="center" width="13%">
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!--<div class="pagination">
          <ul>
            <li class="prev disabled">
              <a href="javascript:">«上一页</a>
            </li>
            <li class="page actived">
              <a href="javascript:">1</a>
            </li>
            <li class="page">
              <a href="javascript:">2</a>
            </li>
            <li class="page">
              <a href="javascript:">3</a>
            </li>
            <li class="page">
              <a href="javascript:">4</a>
            </li>

            <li class="next disabled">
              <a href="javascript:">下一页»</a>
            </li>
          </ul>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;共{{ orderInfo.pages }}页&nbsp;</span>
          </div>
        </div>-->
        <Pagination :continues="4"
                    :pageNo="page"
                    :pageSize="limit"
                    :totalCount="orderInfo.total"
                    :totalPages="orderInfo.pages"
                    @handlePage="handlePage"></Pagination>
      </div>
    </div>
    &lt;!&ndash;猜你喜欢&ndash;&gt;
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png"/>
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png"/>
          </div>
          <div class="attr">
            Apple苹果iPhone 6s/6s Plus 16G 64G 128G
          </div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png"/>
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png"/>
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api';

export default {
  name: 'MyOrder',
  mounted() {
    this.getList();
  },
  data() {
    return {
      page: 1,
      limit: 4,
      orderInfo: {}
    };
  },
  methods: {
    getList() {
      const { page, limit } = this;
      getOrderList(page, limit).then(res => {
        this.orderInfo = res.data;
      });
    },
    handlePage(pageNo) {
      this.page = pageNo;
      this.getList();
    },
  }
};
</script>

<style scoped>

</style>
