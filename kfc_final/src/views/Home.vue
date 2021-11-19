<template>
  <div class="home">
    <van-notice-bar
      left-icon="volume-o"
      text="双十一超值套餐，只需29.9元，新品优惠多多，买二送一，欢迎各位顾客前来就餐。"
    />

    <!-- 头部 -->
    <div class="nav-box">
      <img
        src="https://kfc.insideria.vip/uploads/attach/2021/06/20210624/bee741e45772d6b3e0ee4f752cdf9f89.jpg"
        alt=""
      />
      <!-- 左边一个下午好 -->
      <div class="time">{{ timeText }}</div>
      <!-- 右边一个搜索框 -->
      <div class="search-box">
        <van-search
          autofocus
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          @search="searchPro"
        />
      </div>
    </div>

    <div class="big-box">
      <!-- 轮播图 -->
      <div class="banner">
        <van-swipe
          class="my-swipe"
          :height="146"
          :autoplay="3000"
          indicator-color="white"
        >
          <van-swipe-item
            v-for="item in banner"
            :key="item.pid"
            @click="toDetail(item.pid)"
            ><img :src="item.bannerImg" alt=""
          /></van-swipe-item>
        </van-swipe>

        <!-- 图片懒加载 -->
        <!-- <van-swipe :autoplay="3000" :height="146" class="banner">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img v-lazy="image.bannerImg" />
      </van-swipe-item>
    </van-swipe> -->
      </div>

      <!-- 热卖推荐 -->
      <div class="hot-buy">
        <div class="hot-text">热卖推荐</div>
      </div>

      <!-- 商品内容 -->
      <div class="shop-content">
        <!-- 小的盒子 -->
        <div
          class="pro-item"
          v-for="item in products"
          :key="item.id"
          @click="toDetail(item.pid)"
        >
          <!-- 图片 -->
          <div class="icon">
            <img :src="item.smallImg" alt="" />
          </div>
          <!-- 标题 -->
          <div class="pro-title">{{ item.name }}</div>
          <!-- 价格 -->
          <div class="price">￥{{ item.Price }}元</div>
        </div>
      </div>
    </div>

    <!-- 根元素结尾 -->
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  // name: "Home",
  data() {
    return {
      timeText: "",
      products: [],
      searchValue: "汉堡",
      // 存放轮播图数据
      banner: [],
      // 图片懒加载素材
      images: [
        "https://kfc.insideria.vip/uploads/attach/2021/06/20210624/9ac75e872c6db3c9ed0f0d1f553be4f3.jpg",
        "http://kfc.insideria.vip/uploads/attach/2021/06/20210624/9838140d41ad542d1be988b95e20d26f.jpg",
        "http://kfc.insideria.vip/uploads/attach/2021/06/20210624/c558a101ec068483d2de3d200f98041a.jpg",
        "http://kfc.insideria.vip/uploads/attach/2021/06/20210624/0b6ac00f6e991e413a639bc87c7dbf13.jpg",
      ],
    };
  },
  //生命周期函数 当页面加载的时候 会自动触发
  created() {
    this.getTime();
    this.getBanner();
    this.getProduct();
  },
  //放方法
  methods: {
    searchPro() {
      let tmpValue = this.searchValue;
      this.$router.push({ name: "Search", query: { tmpValue } });
    },

    getTime() {
      var hours = new Date().getHours();
      console.log(hours);
      if (hours >= 6 && hours < 12) {
        this.timeText = "早上好";
      } else if (hours >= 12 && hours < 18) {
        this.timeText = "下午好";
      } else if (hours >= 18 && hours < 24) {
        this.timeText = "晚上好";
      } else {
        this.timeText = "深夜好";
      }
    },
    //请求轮播图数据
    getBanner() {
      this.axios({
        //请求方式
        method: "get",
        //请求地址
        url: "/bannar",
      })
        .then((res) => {
          //输入请求回来的数据
          console.log("轮播图数据", res.data.data.result);
          //重新赋值一下
          this.banner = res.data.data.result;

          // console.log(this.banner[0].bannerImg);
        })
        .catch((err) => {});
    },
    //请求推荐产品数据
    getProduct() {
      this.axios({
        //请求方式
        method: "get",
        //请求地址
        url: "/product",
      })
        .then((res) => {
          //输入请求回来的数据
          console.log(res);
          this.products = res.data.data;
          console.log("产品数据", this.products);
        })
        .catch((err) => {});
    },
    //跳转到详情页面 pid是形参 下面的是es6写法
    toDetail(pid) {
      this.$router.push({ name: "Detail", query: { pid } });
    },
  },
};
</script>

<style lang="less">
.big-box {
  padding: 5px;
}

.nav-box {
  img {
    width: 50px;
    margin-left: 5px;
  }
  height: 50px;
  background: white;
  //弹性布局
  display: flex;
  justify-content: space-between;
  //超出隐藏
  overflow: hidden;
  //子盒子垂直居中
  align-items: center;
  .time {
    font-size: 14px;
    color: #2c3e50;
    //字体加粗
    font-weight: 580;
    margin-left: 10px;
  }
  // /deep/
  .van-icon {
    color: #ee102a !important;
  }
}

.banner {
  img {
    width: 100%;
    height: 146px;
    //上右下左
    border-radius: 0 0 0 0;
  }
}

.hot-buy {
  height: 50px;
  background: white;
  //上下左右
  // margin: 5px 10px;
  margin-top: 8px;
  overflow: hidden;

  .hot-text {
    width: 100px;
    height: 40px;
    //圆角边框
    border-radius: 0 10px 0 0;
    background: #e32831;
    text-align: center;
    //字体垂直居中，只有一行才能使用
    line-height: 40px;
    color: white;
    font-size: 14px;
    //这里会造成内边距塌陷 给他父盒子 overflow: hidden;
    margin-top: 5px;
  }
}

//热卖产品
.shop-content {
  overflow: hidden;
  margin-bottom: 56px;

  .pro-item {
    // height: 200px;
    width: calc(50% - 5px);
    background: white;
    //浮动
    float: left;
    margin-top: 10px;
    margin-right: 10px;
    //圆角边框
    border-radius: 10px;
    //超出隐藏
    overflow: hidden;

    img {
      //转换为块级元素
      width: 150px;
      height: 150px;
      display: block;
      margin: 0 auto;
    }

    .pro-title {
      font-size: 16px;
      //字体缩进 em表示一个字体 em/px
      text-indent: 10px;
      color: #888989;
      width: 180px;
      //字体超出的时候显示省略号
      text-overflow: ellipsis; //当文本溢出时是否显示省略标记。
      overflow: hidden; //溢出内容为隐藏
      white-space: nowrap; //：强制文本在一行内显示
      //上下 左右
      margin: 5px 0;
      //https://blog.csdn.net/eileen823/article/details/57417976
      // 简单理解就是我要把文本限制在一行（white-space: nowrap;），肯定这一行是有限制的(width)，
      // 并且你的溢出的部分要隐藏起来（overflow: hidden；），然后出现省略号（ text-overflow: ellipsis）。
      // 简单理解就是我要把文本限制在一行（white-space: nowrap;），肯定这一行是有限制的(width)，
      // 并且你的溢出的部分要隐藏起来（overflow: hidden；），然后出现省略号（ text-overflow: ellipsis）。
    }

    //价格
    .price {
      text-indent: 10px;
      font-size: 16px;
      color: #0661e5;
      margin: 5px 0;
    }
  }
  .pro-item:nth-child(2n) {
    margin-right: 0px;
  }
}
</style>
