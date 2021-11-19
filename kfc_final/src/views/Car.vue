<template>
  <div class="car">
    <!-- 头部 -->
    <div class="nav">
      <van-nav-bar
        fixed
        title="购物车"
        left-text="返回"
        :right-text="edit ? '编辑' : '完成'"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>

    <!-- 粉色区域 广告位置 -->
    <div class="pink">
      <span class="s1">购物车数量：</span>
      <span class="s2">{{ carData.length }}</span>
    </div>

    <!-- 没有数据的时候才显示 -->
    <div class="noData" v-if="carData.length == 0">
      <img src="https://img.yzcdn.cn/vant/empty-image-default.png" alt="" />
      <h1 style="color:#7e7e7e">购物车竟然是空的</h1>
      <h3 style="color:#9b9b9b;">再忙，也要记得买点什么犒赏自己~</h3>
    </div>

    <!-- 中间购物车的具体数据 -->
    <!-- 具体的 别用index 0 1 2 3 4 会顶上去 最好让key保持唯一性-->
    <div class="car-detail" v-else>
      <div class="car-item" v-for="(item, index) in carData" :key="item.carId">
        <!-- 左边复选框 -->
        <div class="left-choose">
          <van-checkbox
            v-model="bol[index]"
            @click="danSelect(index)"
          ></van-checkbox>
        </div>
        <!-- 中间图片 -->
        <img :src="item.product.smallImg" alt="" />
        <!-- 右边盒子 -->
        <div class="right-box">
          <!-- 名字 -->
          <div class="top-name">
            {{ item.product.name }}
          </div>
          <!-- 价格和步进器 -->
          <div class="price-bu">
            <!-- 价格 -->
            <div class="price">￥{{ item.product.Price }}元</div>
            <!-- 步进器 -->
            <van-stepper
              v-model="item.count"
              theme="round"
              button-size="22"
              disable-input
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 提交订单 -->
    <div class="footer">
      <van-submit-bar
        v-if="edit"
        :price="allPrice"
        button-text="提交订单"
        @submit="goIn"
      >
        <van-checkbox v-model="allChoose" @click="selectAll">全选</van-checkbox>
      </van-submit-bar>

      <!-- 删除订单的 -->
      <van-submit-bar v-else button-text="删除订单" @submit="delect">
        <van-checkbox v-model="allChoose" @click="selectAll">全选</van-checkbox>
      </van-submit-bar>
    </div>

    <!-- 底部结束 -->
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      carData: [],
      allChoose: false,
      //装布尔值，用来判断是否勾选购物车
      bol: [],
      //判断编辑
      edit: true,
      carId: [],
    };
  },
  //计算属性，一个值由多个值产生，里面的值变化，allPrice会重新计算
  computed: {
    allPrice() {
      //默认价格为0
      let price = 0;
      for (let index = 0; index < this.carData.length; index++) {
        //商品价格 * 数量
        //还有一个条件就是勾选后才让他们加 carData[index].bol this.carData[index].count
        if (this.bol[index]) {
          price =
            price +
            this.carData[index].product.Price * this.carData[index].count;
        }
      }
      return price * 100;
    },
  },
  //先做这个页面的时候 先验证一下数据能否拿得到 再进一步的写页面 写页面时候再把请求数据的方法禁掉
  created() {
    this.getCar();
  },
  methods: {
    //左边按钮
    onClickLeft() {
      this.$router.go(-1);
    },
    //右边按钮
    onClickRight() {
      // 改变文字状态
      this.edit = !this.edit;
    },
    getCar() {
      this.axios({
        method: "get",
        url: "findCar",
        params: {
          id: localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log("购物车数据", res);
        this.carData = res.data.data;
        // //遍历一遍，让每个购物车数据加个属性 bol
        // for (let index = 0; index < this.carData.length; index++) {
        //   this.carData.bol = false;
        // }
        // //加完验证一下
        // console.log("this.carData", this.carData);

        //每次请求数据的时候都需要清空bol的布尔值
        this.bol = [];
        //每次都清空全选的按钮状态
        this.allChoose = false;
        //判断如果没有查询到数据的时候修改一下
        if (res.data.stutas == 1301) {
          this.carData = [];
          return;
        }
        //遍历一下，有多少个产品就生成多少个布尔值
        this.carData.map((v) => {
          this.bol.push(false);
        });
      });
    },

    //处理全选的
    selectAll() {
      //清空布尔值
      this.bol = [];
      this.carData.map((v) => {
        // this.allChoose是全选的状态
        this.bol.push(this.allChoose);
      });
      this.handle();

      //遍历一遍，让每个购物车数据加个属性 bol
      // for (let index = 0; index < this.carData.length; index++) {
      //   //把所有购物车里面的勾选状态改成和全选按钮的一样
      //   // this.carData.bol = this.allChoose;
      // }
    },
    danSelect() {
      for (let index = 0; index < this.carData.length; index++) {
        //只要有一个变成false 全选按钮就变成false !false=true
        if (!this.bol[index]) {
          this.allChoose = false;
          this.handle();
          return;
        }
        this.handle();
        //否则变成true
        this.allChoose = true;
      }
    },

    //处理勾选的
    handle() {
      //每次都清空一下
      this.carId = [];
      for (let index = 0; index < this.carData.length; index++) {
        if (this.bol[index]) {
          this.carId.push(this.carData[index].carId);
        }
      }
      //处理一下
      console.log("this.carId", this.carId);
    },

    //删除按钮的
    delect() {
      //如果没有勾选的时候，不让他删除
      if (this.carId.length == 0) {
        Toast("请勾选");
        return;
      }
      //判断是否登录
      if (!localStorage.getItem("token")) {
        this.$router.push({ name: "Login" });
      }
      this.axios({
        method: "post",
        url: "/deleteCar",
        data: {
          id: localStorage.getItem("token"),
          //传递要被删除的carId数组
          carIdArr: this.carId,
        },
      })
        .then((res) => {
          console.log(res);
          //重新请求购物车数据
          this.getCar();
        })
        .catch((err) => {});
    },
    //提交订单的
    goIn() {
      //如果没有勾选的时候，不让他删除
      if (this.carId.length == 0) {
        Toast("请勾选");
        return;
      }
      //判断是否登录
      if (!localStorage.getItem("token")) {
        this.$router.push({ name: "Login" });
      }
      //提交总价格 还有一个勾选的产品
      let data = [];
      //处理勾选的产品 传递到支付页面
      this.carData.map((v, index) => {
        if (this.bol[index]) {
          //在数据添加之前给他添加一个属性
          this.carData[index].product.count = this.carData[index].count;
          data.push(this.carData[index]);
        }
      });

      //用来找bug，或者输出一些数据
      console.log("改造后的数据", data);

      this.$router.push({
        name: "Pay",
        query: {
          allPrice: this.allPrice.toFixed(2) / 100,
          product: JSON.stringify(data),
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.car {
  .pink {
    height: 50px;
    background: pink;
    margin-top: 46px;
    line-height: 50px;
    font-size: 15px;
    .s1 {
      margin-left: 10px;
    }

    .s2 {
      color: red;
    }
  }

  .noData {
    text-align: center;
    margin-top: 20px;
    img {
      width: 200px;
      height: 200px;
    }
  }

  //购物车
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
  .van-submit-bar__bar {
    justify-content: space-between;
  }
}
</style>