<!--  -->
<template>
  <div class="detail">
    <!-- 头部导航栏 -->
    <div class="header">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <!-- 图片内容 -->
    <div class="big-box">
      <!-- 图片内容 -->
      <div class="big-top">
        <img :src="product.largeImg" alt="" />
        <div class="icon">
          <!-- 向下图标 -->
          <div class="bg-icon" style="margin-left: 10px">
            <van-icon name="arrow-down" size="20" />
          </div>
          <!-- 聊天图标 -->
          <div class="bg-icon" style="margin-right: 10px">
            <van-icon name="chat-o" size="20" />
          </div>
        </div>

        <!-- 文字仅供参考 -->
        <div class="text">图片仅供参考，请以实物为准</div>
      </div>
      <!-- 标题和价格 -->
      <div class="big-bottom">
        <div class="title-good">
          <div class="title">{{ product.name }}</div>
          <div class="good">图标</div>
        </div>
        <div class="price">￥{{ product.Price }}元</div>
      </div>
    </div>

    <!-- 选择数量的 步进器 -->
    <div class="choose-count">
      <!-- 选择数量的 -->
      <div class="choose">选择数量</div>
      <div class="count">
        <van-stepper
          v-model="countValue"
          theme="round"
          button-size="22"
          disable-input
        />
      </div>
    </div>

    <!-- 详情盒子和评价 -->
    <div class="item-detail">
      <van-tabs v-model="active" sticky>
        <van-tab title="详情">
          <div class="pro-detail">
            <!-- 掌柜描述 -->
            <div class="desc-box">
              <div class="title-one">掌柜描述</div>
              <div class="title-two">
                <!-- <span>香酥鸡腿1份+紫薯豌豆派</span> -->
                <span v-for="item in product.desc" :key="item">{{ item }}</span>
              </div>
            </div>
            <!-- 价格说明 -->
            <div class="desc-box">
              <div class="title-one">价格说明</div>
              <div class="title-two">
                <van-icon name="question-o" style="margin-left: 10px" />
              </div>
            </div>
            <!-- 价格说明结束 -->
          </div>
        </van-tab>
        <van-tab title="评价">
          <div class="pro-p"></div>
        </van-tab>
      </van-tabs>

      <!-- 注意事项 -->
      <div class="attention">
        <p class="p1">注意事项：</p>
        <p class="p2" v-for="(item, index) in product.notice" :key="index">
          {{ index + 1 }}、{{ item }}
        </p>
      </div>
    </div>

    <!-- 底部购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="toCar" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button
        type="warning"
        @click="addCar"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

    <!-- 底部结束 -->
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      countValue: 1,
      active: 2,
      //装产品
      product: [],
    };
  },
  created() {
    console.log(this.$route.query.pid);
    //请求详情页面
    this.getDetail(this.$route.query.pid);
  },
  methods: {
    toCar() {
      this.$router.push({ name: "Car" });
    },
    onClickLeft() {
      //跳转到上一个页面
      this.$router.go(-1);
    },
    getDetail(pid) {
      this.axios({
        method: "get",
        url: "/detail",
        params: {
          pid: pid,
        },
      })
        .then((res) => {
          console.log("产品详情数据", res);
          this.product = res.data.data[0];
        })
        .catch((err) => {});
    },

    //加入购物车的方法
    addCar() {
      //加入购物车之前判断用户是否登录，没有登录就跳转到登录页面
      if (!localStorage.getItem("token")) {
        //没有登录就跳转到登录页面
        this.$router.push({ name: "Login" });
        return;
      }
      this.axios({
        method: "post",
        url: "/addCar",
        data: {
          id: localStorage.getItem("token"), //存在本地存储的token
          count: this.countValue, //购物车的数量
          product: this.product, //产品
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.stutas == 1201) {
            Toast("加入购物车成功");
          }

          if (res.data.stutas == 1205) {
            Toast("商品已存在购物车");
            this.$router.push({ name: "Car" });
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang='less' scoped>
.detail {
  margin-bottom: 80px;
  .big-box {
    .big-top {
      position: relative;

      img {
        width: 100%;
        vertical-align: middle;
      }

      .icon {
        width: 100%;
        height: 40px;
        // background: pink;
        display: flex;
        justify-content: space-between;
        align-content: center;
        position: absolute;
        top: 0;
      }

      .bg-icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: gray;
        //相对定位
        position: relative;
      }

      .van-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        // x y轴
        transform: translate(-50%, -50%);
        color: white;
      }

      .text {
        position: absolute;
        right: 5px;
        bottom: 0;
        font-size: 14px;
        font-weight: 550;
      }
    }

    .big-bottom {
      //   height: 200px;
      background: white;
      //不会整体掉下来
      overflow: hidden;
      padding: 15px;

      .title-good {
        display: flex;
        justify-content: space-between;
        //子盒子垂直居中 前提主轴没有变
        align-items: center;
        margin-top: 10px;
      }

      .title {
        font-size: 20px;
        //字体加粗
        font-weight: 600;
      }

      .price {
        font-size: 20px;
        color: #f8514e;
        font-weight: 580;
        margin-top: 10px;
      }
    }
  }

  //选择数量
  .choose-count {
    height: 40px;
    background: white;
    margin: 5px 0;
    padding: 5px;

    //弹性布局
    display: flex;
    justify-content: space-between;
    align-items: center;

    .choose {
      font-size: 14px;
      font-weight: 580;
      margin-left: 5px;
    }
    .count {
      margin-right: 5px;
    }
  }

  //详情和评价
  .item-detail {
    .pro-detail {
      height: 50px;
      background: white;

      .desc-box {
        padding: 5px;
        display: flex;
        // justify-content: space-between;
        align-items: center;
      }
      .title-one {
        color: #989898;
      }
      .title-two {
        margin-left: 20px;
      }
      span::after {
        content: "+";
      }
      span:last-child::after {
        content: "";
      }
    }
    .pro-p {
      height: 50px;
      background: white;
    }

    .attention {
      margin-top: 5px;
      overflow: hidden;
      margin-bottom: 60px;
      background: white;
      .p1 {
        font-size: 14px;
        color: #445464;
        text-indent: 10px;
      }
      .p2 {
        color: #989898;
        text-indent: 10px;
      }
    }
  }
}
</style>