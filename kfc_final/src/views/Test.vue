<template>
  <div class="login">
    <!-- template放html标签 -->
    <!-- 只有一个根元素 -->
    <!-- 点击事件 @click = "方法名字" v-mode让输入框里面的值和绑定的值进行同步-->
    <van-image
      round
      width="50px"
      height="50px"
      lazy-load
      src=""
      style="float: left; margin-top: 20px"
    />
    <van-button
      color="#7232dd"
      plain
      round
      style="float: right; margin-top: 20px"
      >先逛逛</van-button
    >
    <div style="height: 50px"></div>
    <!-- <h1>登录页面</h1> -->
    <van-image round width="200" height="200" lazy-load src="" />

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>

    <a href="http://" style="font-size: 16px; color: black">立即注册</a>
  </div>
</template>

<script>
//放js代码
export default {
  //叫什么名字
  name: "Login",
  //data存放数据的，放在return里面。用data里面的数据变量的时候，需要用{{变量名}}包住他们
  data() {
    return {
      //格式 变量名字 ：数据
      username: "",
      password: "",
    };
  },
  //存放方法的地方
  methods: {
    //方法的格式 方法名字(){} ()里面可以放形参 {}放执行的代码
    //注意：方法没有被调用的话，自己是不会自动执行 => 不会运行{}里面的代码
    //这里有两种调用方式，一种是我们认为触发事件的时候调用，如鼠标点击 键盘输入 键盘移动，另外一种是他们方法之间相互调用
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
