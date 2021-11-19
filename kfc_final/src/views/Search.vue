<template>
  <div class="search">
    <!-- 头部搜索 -->
    <div class="header">
      <van-search
        v-model="value"
        show-action
        fixed
        autofocus
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <!-- 有数据的时候才显示 -->

    <!-- 没有数据的时候才显示 -->
    <div class="noData" v-if="searchData.length == 0">
      <img src="https://img.yzcdn.cn/vant/empty-image-default.png" alt="" />
      <p style="font-size:16px;font-weight:550;color:#969799">暂无数据，请重新搜索</p>
    </div>

    <!-- 产品数据 -->
    <div class="car-detail">
      <div class="car-item" v-for="item in searchData" :key="item.carId">
        <!-- 中间图片 -->
        <img :src="item.smallImg" alt="" />
        <!-- 右边盒子 -->
        <div class="right-box">
          <!-- 名字 -->
          <div class="top-name">
            {{ item.name }}
          </div>
          <!-- 价格 -->
          <div class="price">￥{{ item.Price }}元</div>
        </div>
      </div>
    </div>

    <!-- 底部结束 -->
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Search",
  data() {
    return {
      value: "汉堡",
      searchData: [],
    };
  },
  created() {
    console.log(this.$route.query.tmpValue);
    this.value = this.$route.query.tmpValue;
    this.onSearch();
  },

  methods: {
    //搜索
    onSearch() {
      this.axios({
        method: "get",
        url: "/search",
        params: {
          key: this.value,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.status == 1901) {
            Toast("查询为空");
            return;
          }
          if (res.data.stutas == 1902) {
            Toast("查询成功");
            this.searchData = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.noData {
  text-align: center;
  margin-top: 20px;
  img {
    width: 200px;
    height: 200px;
  }
}

.car-detail {
  // overflow: hidden;
  margin-bottom: 60px;
  .car-item {
    display: flex;
    align-items: center;
    height: 100px;
    margin: 10px;
    background: white;
    //圆角边框
    border-radius: 10px;
  }
  //左
  .left-choose {
    width: 20px;
    //上下 左右
    margin: 0 10px;
  }
  //中
  img {
    width: 100px;
    height: 100px;
  }
  //右
  .right-box {
    height: 80px;
    // 左中有固定宽度高度之后，由第三个决定
    flex: 1;
    // background: pink;
    padding: 10px; //四个方向都10

    //原本100px
  }

  .top-name {
    height: 40px;
    // background: skyblue;
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

  .price-bu {
    height: 40px;
    // background: greenyellow;
    //弹性布局
    display: flex;
    //垂直居中（前提是主轴没有变化） 变化就是水平居中
    align-items: center;
    justify-content: space-between;
  }

  .price {
    font-size: 16px;
    color: #1670e7;
  }
}
</style>