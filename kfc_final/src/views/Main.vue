<template>
  <div class="Main">
    <router-view />
    <!-- 二级路由 -->
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/car" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- <van-tabbar
      v-model="tabbarIndex"
      active-color="#d81e06"
      inactive-color="#a0a0a0"
      :route="true"
    >
      <van-tabbar-item v-for="(item, index) in tabbarData" :key="index" :to="item.url">
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabbarIndex: 0,
      tabbarData: [
        {
          title: "首页",
          icon: {
            active: require("../assets/images/tabbar/home@act.png"),
            inactive: require("../assets/images/tabbar/home.png"),
          },
          url: {
            name: "Home",
          },
        },
        // {
        //   title: "商城",
        //   icon: {
        //     active: require("../assets/images/tabbar/shopbag@act.png"),
        //     inactive: require("../assets/images/tabbar/shopbag.png"),
        //   },
        // url:{
        //     name:'Shopbag'
        //   }
        // },
        {
          title: "订单",
          icon: {
            active: require("../assets/images/tabbar/order@act.png"),
            inactive: require("../assets/images/tabbar/order.png"),
          },
          url: {
            name: "Car",
          },
        },
        {
          title: "我的",
          icon: {
            active: require("../assets/images/tabbar/my@act.png"),
            inactive: require("../assets/images/tabbar/my.png"),
          },
          url: {
            name: "My",
          },
        },
      ],
    };
  },
};
</script>
<style lang='less' scoped>
//scoped 私有 这里面的样式值只在Main.vue里面生效 不会和其他vue文件样式冲突
</style>