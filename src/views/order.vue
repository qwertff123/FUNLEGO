<template>
  <div class="order">
    <div class="search-bar"></div>
    <div class="order-box">
      <div class="title">
        <div class="goods">商品</div>
        <div>单价</div>
        <div>数量</div>
        <div>总件数</div>
        <div>合计价</div>
        <div class="customer-info">收货人信息</div>
        <div>订单时间</div>
      </div>
      <div class="order-list" v-if="orderList.length != 0">
        <div class="order-item" v-for="(order,index) in orderList" :key="index">
          <div>用户ID:{{ order.userID}}</div>
          <div class="content">
            <div class="goods-list">
              <div class="goods-item" v-for="(item,index) in order.goodsInfo" :key="index">
                <div class="goods-info">
                  <img
                    :src="item.image"
                    alt=""
                  />
                  <span class="name">{{ item.name }}</span>
                </div>
                <div class="price">￥{{ item.price }}</div>
                <div class="amount">X{{ item.amount }}</div>
              </div>
            </div>
            <div>共{{ order.goodsInfo.length }}件</div>
            <div>￥{{ order.totalPrice }}</div>
            <div class="customer-info">张亮 18302020</div>
            <div>{{ order.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as orderApi from "@/api/order";
import { io } from "socket.io-client";
const socket = io("ws://10.157.117.193:3000",{
  autoConnect : true
});
export default {
  data(){
    return {
      orderList : []
    }
  },
  created(){
    orderApi.getOrderList().then(orderList=>{
      this.orderList = orderList;
      console.log(this.orderList);
    })
     
    socket.on("submitOrder",data=>{
      this.orderList.push({
        userID : data.userID,
        goodsInfo : JSON.parse(data.goodsInfo),
        time : data.time,
        totalPrice : data.totalPrice
      });
    })
  }
};
</script>
<style scoped lang="less">
@import url("~@/assets/css/order.less");
</style>
