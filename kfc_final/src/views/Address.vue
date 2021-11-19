<template>
  <div class="address">
    <!-- 头部 -->
    <van-nav-bar
      title="地址列表"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />

    <!-- 粉色区域 广告位置 -->
    <div class="pink"></div>

    <!-- 地址列表 -->
    <div class="big-box">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="deleteAddress"
        @select="onSelect"
      />
    </div>

    <!-- 底部结束 -->
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Address",
  data() {
    return {
      chosenAddressId: "",
      list: [],
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    //跳转到新增地址
    onAdd() {
      this.$router.push({ name: "NewAddress" });
    },

    //左边按钮
    onClickLeft() {
      //   this.$router.go(-2);
      this.$router.push({ name: "My" });
    },

    //选择时取出信息
    onSelect(item, index) {
      console.log("item==>", item);
      console.log("index==>", index);
      //勾选对应的选项
      this.chosenAddressId = item.id;
      console.log(this.chosenAddressId);
    },

    //获取地址列表
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

          res.data.data.map((v) => {
            let obj = {};
            (obj.id = v.addId),
              (obj.name = v.name),
              (obj.address = v.area + v.detialArea),
              (obj.tel = v.phone),
              (obj.isDefault = v.defaultAddress);
            this.list.push(obj);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //删除地址
    deleteAddress() {
      if (!this.chosenAddressId) {
        Toast("请勾选地址");
        //终止后面的代码执行
        return;
      }
      this.axios({
        method: "post",
        url: "/deleteAddress",
        data: {
          userId: localStorage.getItem("token"),
          addId: this.chosenAddressId,
        },
      })
        .then((res) => {
          console.log(res);
          this.list = [];
          //重新请求数据
          this.getAddress();
          Toast("删除地址成功");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.address {
  .pink {
    height: 100px;
    background: skyblue;
    margin-top: 46px;
  }

  .big-box {
    // height: 480px;
    margin: 10px;
    background: white;
    //圆角边框
    border-radius: 10px 10px 0 0;
    position: relative;
    top: -30px;
  }
}
.van-icon-edit:before{
    font-family: "iconfont";
    content: "\e6b4";
}
</style>