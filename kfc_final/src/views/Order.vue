<template>
  <div class="order">
    <!-- 头部 -->
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />

    <div class="bg-red"></div>

    <!-- 大盒子 -->
    <div class="big-box">
      <!-- 三个选项 -->
      <div class="three-choose">
        <van-tabs v-model="active" @change="changeThree">
          <van-tab title="全部" name="2"></van-tab>
          <van-tab title="进行中" name="0"></van-tab>
          <van-tab title="已完成" name="1"></van-tab>
        </van-tabs>
      </div>

      <!-- 产品内容 -->
      <div class="pro-box" v-for="item in order" :key="item.orderId">
        <div class="num-box">
          <div class="no">NO {{ item.orderNo }}</div>
          <div
            class="status"
            v-if="item.stutas == 0"
            @click="take(item.orderId)"
          >
            待收货
          </div>
          <div class="status" v-else @click="deleteOrder(item.orderId)">
            <div>已完成</div>
            <div><van-icon size="20" name="delete-o" /></div>
          </div>
        </div>

        <!-- 产品信息 -->
        <div class="product-box" v-for="k in item.product" :key="k.carId">
          <img :src="k.product.smallImg" alt="" />
          <div class="product-right">
            <div class="title">{{ k.product.name }}</div>
            <div class="price-count">
              <div class="price">￥{{ k.product.Price }}元</div>
              <div class="count">×{{ k.count }}</div>
            </div>
          </div>
        </div>

        <!-- 底部信息 -->
        <div class="footer">
          <div class="time">{{ item.created_at }}</div>
          <div class="count-all">
            <div class="count">共计{{ item.product.length }}件</div>
            <div class="all">合计￥{{ item.allPrice }}元</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结束 -->
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      active: 2,
      //装订单数据
      order: [],
    };
  },
  created() {
    this.getOrder();
  },

  methods: {
    //左边按钮
    onClickLeft() {
      //   this.$router.go(-2);
      this.$router.push({ name: "My" });
    },
    getOrder() {
      //请求订单
      this.axios({
        methods: "get",
        url: "/getOrder",
        params: {
          id: localStorage.getItem("token"),
          stutas: this.active,
        },
      })
        .then((res) => {
          console.log(res);
          //每次赋值之前都清一下
          this.order = [];
          this.order = res.data.data.reverse();
          console.log("订单信息", this.order);
        })
        .catch((err) => {});
    },

    //修改订单的状态
    take(orderId) {
      this.axios({
        method: "get",
        url: "/take",
        params: {
          id: localStorage.getItem("token"),
          orderId, //es6语法简写
        },
      })
        .then((res) => {
          if (res.data.stutas == 1311) {
            this.getOrder();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //删除订单信息
    deleteOrder(orderId) {
      this.axios({
        method: "post",
        url: "/delectOrder",
        data: {
          id: localStorage.getItem("token"),
          orderId, //es6语法简写
        },
      })
        .then((res) => {
          if (res.data.stutas == 502) {
            this.getOrder();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //改变状态
    changeThree() {
      console.log(this.active);
      this.getOrder();
    },
  },
};
</script>

<style lang="less" scoped>
.bg-red {
  height: 100px;
  margin-top: 46px;
  background: #eb3941;
}
.big-box {
  padding: 10px;
  .three-choose {
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    position: relative;
    top: -30px;
  }
}
.pro-box {
  position: relative;
  top: -30px;
  //后面要去掉
  //   height: 300px;
  background: white;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  margin-top: 10px;

  .status {
    display: flex;
    justify-content: space-between;
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .product-box {
    height: 100px;
    // background: pink;
    margin: 10px 0;
    display: flex;

    img {
      width: 100px;
      height: 100px;
    }

    .product-right {
      flex: 1;
      //   background: skyblue;
      padding: 10px;
    }

    .title {
      height: 40px;
      font-size: 16px;
      width: 195px;
      /* 多行文本溢出 */
      text-overflow: ellipsis;
      word-wrap: break-word;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /*行数*/
      -webkit-box-orient: vertical;
    }

    .price-count {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: red;
    }
  }

  .footer {
    // height: 100px;
    background: white;
    padding: 10px;
    border-top: 1px dashed gray;
  }

  .count-all {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>