<template>
  <div class="newAddress">
    <div class="nav">
      <!-- 头部 -->
      <van-nav-bar
        title="新增按钮"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </div>

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选省', '请选市', '请选区']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import areaList from "../assets/js/area.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },

  methods: {
    //左边按钮
    onClickLeft() {
      this.$router.go(-1);
    },
    onSave(content) {
      Toast("save");

      //判断是否登录
      if (!localStorage.getItem("token")) {
        Toast("请登录");
        return;
      }

      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      console.log("表单内容", content);
      // <!-- 添加地址 -->
      // post请求

      // /address

      // 都是必填

      // userId     这个用户的id  就是之前存入token里面的值
      // name 姓名
      // phone 电话号码
      // area 地区
      // detialArea 详细地址
      // mail  邮政编码
      // defaultAddress  布尔值 :默认是false   否则是true
      this.axios({
        method: "post",
        url: "/address",
        data: {
          userId: localStorage.getItem("token"), //这个用户的id
          name: content.name, //姓名
          phone: content.tel, //电话号码
          area: content.province + content.city + content.county, //地区
          detialArea: content.addressDetail, //详细地址
          mail: content.postalCode, //邮政编码
          defaultAddress: content.isDefault, //布尔值：默认是
        },
      })
        .then((res) => {
          console.log(res);
          Toast.clear();
          if (res.data.stutas == 1999) {
            //保存成功的时候就跳回上一个页面
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          console.log(err);
          Toast.clear();
        });
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            // address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.van-address-edit {
  margin-top: 40px;
}

// /deep/ .van-cell__title{
//   width: 60px !important;
// }
</style>