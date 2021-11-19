<!-- 商品详情页 -->
<template>
  <!-- 顶部导航栏 -->
  <div class="detail">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 商品内容 -->
    <div class="top-content">
      <!-- 图标 -->
      <div class="bigbox">
        <div class="box">
          <van-icon name="arrow-down" />
        </div>
        <div class="box">
          <van-icon name="chat-o" />
        </div>
      </div>

      <img :src="detailInfo.largeImg" alt="" />
      <span class="toast">图片仅供参考，请以实物为准</span>
      <div>
        <h2>{{ detailInfo.name }} <van-icon name="good-job-o" /></h2>
        <h2 class="price">￥{{ detailInfo.Price }}</h2>
      </div>
    </div>

    <!-- 选择数量 -->
    <div class="select">
      <p>选择数量</p>
      <van-stepper
        v-model="selectValue"
        theme="round"
        button-size="22"
        disable-input
      />
    </div>

    <!-- 详情 评价 -->
    <div class="evaluate">
      <van-tabs v-model="active">
        <van-tab title="详情">
          <p class="p1">
            <span class="span1">掌柜描述</span> &nbsp;&nbsp;&nbsp;&nbsp;<span
              v-for="item in detailInfo.desc"
              :key="item"
              >{{ item + " " }}</span
            >
          </p>
          <p class="p1">
            <span class="span1">价格说明</span>
            &nbsp;&nbsp;&nbsp;&nbsp;<van-icon name="question-o" />
          </p>
        </van-tab>
        <van-tab title="评价">内容 2</van-tab>
      </van-tabs>
    </div>

    <!-- 注意事项 -->
    <div class="attention">
      <p class="p1">注意事项：</p>
      <p class="p2" v-for="(item, index) in detailInfo.notice" :key="index">
        {{ index + 1 }}、{{ item }}
      </p>
    </div>

    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

    <!-- 底部结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice: "",
      active: 2,
      detailInfo: [],
      selectValue: "",
    };
  },
  //生命周期函数 当页面加载的时候 会自动触发
  created() {
    this.getDetail();
  },
  methods: {
    //返回首页
    onClickLeft() {
      this.$router.go(-1);
      console.log("返回");
    },
    //请求推荐产品数据
    getDetail() {
      let pid = this.$route.query.pid;
      this.axios({
        //请求方式
        method: "get",
        //请求地址
        url: "/detail",
        params: {
          pid,
        },
      })
        .then((res) => {
          //输入请求回来的数据
          console.log("产品详情", res.data.data[0]);
          this.detailInfo = res.data.data[0];
          this.notice = this.detailInfo.notice[0];
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang='less' scoped>
.top-content {
  margin-top: 5px;
  background: white;
  h2 {
    text-indent: 5px;
    display: flex;
    justify-content: space-between;
  }
  img {
    width: 100%;
    height: 146px;
    //上右下左
    border-radius: 0 0 0 0;
  }
  .price {
    color: #f9504d;
  }
  .toast {
    padding-left: 210px;
  }
}

.select {
  margin-bottom: 10px;
  font-size: 14px;
  text-indent: 10px;
  background: white;
  height: 50px;
  display: flex;
  justify-content: space-between; //设置单元格内容的水平位置（左中右）
  align-items: center; //设置单元格的垂直位置（上中下）
  .van-stepper {
    margin-right: 10px;
  }
}

.evaluate {
  background: white;
  .span1 {
    color: #989898;
  }
  .p1 {
    text-indent: 10px;
    font-size: 13px;
  }
}

.attention {
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

.box {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: gray;
  text-align: center;
  line-height: 35px;
  margin: 0 10px 0 10px;
}
.bigbox {
  display: flex;
  justify-content: space-between;
}
</style>