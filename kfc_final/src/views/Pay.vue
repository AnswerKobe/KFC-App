<template>
  <div class="pay">
    <div class="nav">
      <!-- 头部 -->
      <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </div>

    <!-- 选择地址的 -->
    <div class="big-box">
      <div class="choose">
        <div class="choose-address" @click="showPopup">
          <div class="choose-title">
            <van-icon name="location-o" />
            选择地址
          </div>
          <!-- 图标 -->
          <div class="choose-icon">
            <van-icon name="arrow" />
          </div>
        </div>

        <!-- 个人信息 -->
        <div class="person-msg">
          <!-- 第一行 -->
          <div class="username-box">
            <div class="user">{{ address.name }}</div>
            <div class="tel">{{ address.phone }}</div>
            <!-- <div class="default">默认</div> -->
            <van-tag type="danger" round v-if="address.isDefault">默认</van-tag>
          </div>

          <!-- 第二行 -->
          <div class="detail-address">{{ address.detailAddress }}</div>
        </div>
      </div>

      <!-- 产品信息 -->
      <div class="product-msg">
        <!-- 订单信息 -->
        <div class="order-msg">订单信息</div>

        <!-- 产品 -->
        <div class="product-box" v-for="item in product" :key="item.pid">
          <img :src="item.product.smallImg" alt="" />
          <div class="product-right">
            <!-- 上面信息 -->
            <div class="title">{{ item.product.name }}</div>
            <div class="price-count">
              <div class="price">￥{{ item.product.Price }}元</div>
              <div class="count">×{{ item.count }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部信息 -->
      <div class="footer">
        <div class="time">{{ time }}</div>
        <div class="count-all">
          <div class="count">共计{{ product.length }}件</div>
          <div class="all">合计￥{{ allPrice }}元</div>
        </div>
      </div>
    </div>

    <div class="btn">
      <van-button
        color="#ee0a24"
        type="primary"
        size="large"
        round
        @click="goInOrder"
        >提交订单</van-button
      >
    </div>

    <!-- 弹出的地址 -->
    <!-- 自定义图标 -->
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="address-choose-box">
        <div class="address-title">选择地址</div>
        <!-- 引入剩下的新增地址 -->
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @select="onSelect"
          @edit="onEdit"
        />
      </div>
    </van-popup>

    <!-- 底部结束 -->
  </div>
</template>


<script>
import { Toast } from "vant";
const util = require("../assets/js/util.js");
let times = null;
export default {
  data() {
    return {
      //装订单里面的产品
      product: [],
      //总价格
      allPrice: 0,
      time: util.formatTime(new Date()),
      show: false,
      chosenAddressId: "",
      list: [],
      //用来摆放上面的地址信息
      address: {
        name: "",
        phone: "",
        detailAddress: "",
        isDefault: false,
      },
    };
  },
  created() {
    console.log(this.$route);
    this.product = JSON.parse(this.$route.query.product);
    this.allPrice = this.$route.query.allPrice;
    console.log(this.product);
    //定时器 1000=1s 每过1秒钟就会执行{}里面的代码
    times = setInterval(() => {
      this.time = util.formatTime(new Date());
    }, 1000);

    this.getAddress();
  },

  //页面离开需要销毁一些数据
  destroyed() {
    //清空定时器
    clearInterval(times);
    times = null;
  },

  methods: {
    //切换地址的时候更改上面的地址信息
    onSelect(item, index) {
      console.log("item==>", item);
      console.log("index==>", index);
      this.address.name = item.name; //名字
      this.address.phone = item.tel; //电话号码
      this.address.detailAddress = item.address; //地址
      this.address.isDefault = item.isDefault; //是否为默认地址
      //勾选对应的选项
      // this.chosenAddressId = item.id;
    },
    //提交订单
    goInOrder() {
      //判断是否有勾选地址 验证address里面的信息有没有变化，如果有变化 他值是会改变的 如果里面有值 那么他们会变成true
      //this.address.name == '' false !false = true
      if (!this.address.name) {
        Toast("请勾选地址");
        //终止后面的代码执行
        return;
      }
      this.axios({
        method: "post",
        url: "/order",
        data: {
          id: localStorage.getItem("token"), //用户id
          product: this.product, //提交购物车的产品
          allPrice: this.allPrice, //总价格
          address: this.address.detailAddress,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.stutas == 1401) {
            Toast("添加订单成功");
            this.$router.push({ name: "Order" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    // 弹出层
    showPopup() {
      this.show = true;
    },
    //左边按钮
    onClickLeft() {
      this.$router.go(-1);
    },

    // 新增地址
    onAdd() {
      // Toast("新增地址");
      this.$router.push({ name: "NewAddress" });
    },
    //得到用户地址
    getAddress() {
      this.axios({
        method: "get",
        url: "/findAddress",
        params: {
          userId: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
          res.data.data.map((v, index) => {
            let obj = {};
            (obj.id = v.addId),
              (obj.name = v.name),
              (obj.address = v.area + v.detialArea),
              (obj.tel = v.phone),
              (obj.isDefault = v.defaultAddress);
            this.list.push(obj);

            //优先判断是否有默认地址 把默认地址赋值上去
            if (v.defaultAddress) {
              this.address.name = v.name; //名字
              this.address.phone = v.phone; //电话号码
              this.address.detailAddress = v.area + v.detialArea; //地址
              this.address.isDefault = v.defaultAddress; //是否为默认地址
              //勾选对应的选项
              this.chosenAddressId = v.addId;
            }
          });

          //只要上面的值没有变成true 那么意味着我的没有默认地址的
          if (!this.address.isDefault) {
            this.address.name = this.list[0].name; //名字
            this.address.phone = this.list[0].tel; //电话号码
            this.address.detailAddress = this.list[0].address; //地址
            this.address.isDefault = this.list[0].isDefault; //是否为默认地址
            //勾选对应的选项
            this.chosenAddressId = this.list[0].id;
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.pay {
  overflow: hidden;
}

// .nav{
//   position: fixed;
//   width: 100%;
//   height: 46px;
//   z-index: 99999;
// }

.big-box {
  margin-top: 46px;
  padding: 10px;
  margin-bottom: 75px;

  .choose {
    // height: 86px;
    background: white;
    border-radius: 10px 10px 0 0;
    padding: 10px;
  }
  .choose-address {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .person-msg {
    margin-top: 10px;
    font-size: 14px;
  }
  .username-box {
    display: flex;
    div {
      margin-right: 15px;
    }
  }
  .detail-address {
    margin-top: 5px;
  }

  .product-msg {
    // height: 300px;
    background: white;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px 10px 0 0;
  }

  .order-msg {
    font-size: 14px;
  }

  //可以重复使用
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

.btn {
  position: fixed;
  bottom: 10px;
  width: 96%;
  margin-left: 2%;
}
.address-choose-box {
  padding: 10px;
  .address-title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
}

.van-address-list__bottom {
  // background: none;
  // 透明
  background: transparent;
}
</style>