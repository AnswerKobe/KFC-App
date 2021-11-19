<template>
  <div class="login">
    <!-- 一个根元素，所有代码放在这个里面 -->
    <!-- 顶部开始 -->
    <div class="top-box">
      <div class="bg-coffee"></div>
      <div class="gogo" @click="goHome">先逛逛</div>
    </div>

    <!-- logo -->
    <div class="logo">
      <img src="../assets/kfc.png" alt="" />
    </div>

    <!-- 表单 -->
    <van-form>
      <van-field
        v-model="userLoginInfo.phone"
        name="手机号码"
        label="手机号码"
        placeholder="手机号码"
        autocomplete="off"
      />
      <van-field
        v-model="userLoginInfo.password"
        :type="LoginEye ? 'password' : 'text'"
        name="密码"
        label="密码"
        placeholder="密码"
        autocomplete="off"
        :right-icon="LoginEye ? 'closed-eye' : 'browsing-history-o'"
        @click-right-icon="changeLeye"
      />
      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          @click="loginW"
          native-type="submit"
          color="#fc3b3e"
          >立即登录</van-button
        >
      </div>
      <!-- 注册按钮 -->
      <div style="margin: 16px" class="text">
        <van-button
          @click="showPopup"
          round
          block
          type="info"
          native-type="submit"
          color="white"
          >立即注册</van-button
        >
      </div>
    </van-form>

    <!-- 弹出层 -->
    <van-popup
      closeable
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <!-- 标题标签 -->
      <h1 class="title">注册</h1>
      <!-- 注册的表单 -->
      <van-form>
        <van-field
          v-model="register.phone"
          name="手机号码"
          label="手机号码"
          autocomplete="off"
          placeholder="11位手机号码"
          clearable
        />
        <!-- 三元运算符 registerEye为true就会选中closed-eye -->
        <van-field
          v-model="register.password"
          :type="registerEye ? 'password' : 'text'"
          name="密码"
          label="密码"
          autocomplete="off"
          :right-icon="registerEye ? 'closed-eye' : 'browsing-history-o'"
          @click-right-icon="changeReye"
          placeholder="密码必须为字母开头"
          clearable
        />
        <van-field
          v-model="register.nickname"
          type="text"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          autocomplete="off"
          clearable
        />

        <!-- 注册按钮 -->
        <div style="margin: 16px">
          <!-- 绑定一个点击事件 注册事件 -->
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="#fc3b3e"
            @click="registerW"
            >立即注册</van-button
          >
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
//导入JS文件
const { validForm } = require("../assets/js/validForm.js");
export default {
  data() {
    return {
      //控制眼睛是否睁开
      registerEye: true,
      LoginEye: true,
      show: false,
      //登记注册的信息
      register: {
        phone: "",
        password: "",
        nickname: "",
      },
      //登录的时候记住 手机号码和密码
      userLoginInfo: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    //去Home页面
    goHome() {
      this.$router.push({ name: "Home" });
    },

    //控制注册眼睛密码变化
    changeReye() {
      //!取反
      this.registerEye = !this.registerEye;
    },
    changeLeye() {
      //!取反
      this.LoginEye = !this.LoginEye;
    },

    showPopup() {
      this.show = true;
    },
    //注册的方法
    registerW() {
      // 输出我们注册时的账号和密码
      // console.log(this.register);
      //构造表单验证信息  注册正则 正则验证
      //快捷键 选中你想要修改的同样的代码 ctrl + d 可以一个个选中让你同时修改
      //alt + 鼠标左键可以选中 reg是正则，符合才通过
      let o = {
        phone: {
          value: this.register.phone, //注册时的手机号
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.register.password, //注册时的密码
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
        nickName: {
          value: this.register.nickname, //注册时的昵称
          errorMsg: "昵称由字母数字下划线汉字组合(1-10字符)",
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
        },
      };
      //调用我写的js验证，如果上面都通过 那么就返回一个true 否则为false
      let isPass = validForm.valid(o);
      console.log(isPass);

      //做一个拦截 如果正则没有通过，那么肯定不能让他去请求服务器
      if (!isPass) {
        Toast("密码错误，请重新输入");
        console.log("密码错误");
        //终止后面代码 跳出这个函数
        return;
      }

      //传递参数 get使用 params post使用data
      this.axios({
        method: "get", //请求的方式
        url: "/register", //请求的地址
        params: {
          user: this.register.phone,
          password: this.register.password,
          nickname: this.register.nickname,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
    //登录的方法
    loginW() {
      let o = {
        phone: {
          value: this.userLoginInfo.phone, //注册时的手机号
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userLoginInfo.password, //注册时的密码
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
      };
      //调用我写的js验证，如果上面都通过 那么就返回一个true 否则为false
      let isPass = validForm.valid(o);
      console.log(isPass);

      //做一个拦截 如果正则没有通过，那么肯定不能让他去请求服务器
      if (!isPass) {
        console.log("正则没有通过");
        //终止后面代码 跳出这个函数
        return;
      }
      console.log(this.userLoginInfo);

      //传递参数 get用params post用data
      this.axios({
        method: "get", //请求的方式
        url: "/login", //请求的地址
        params: {
          user: this.userLoginInfo.phone,
          password: this.userLoginInfo.password,
        },
      })
        .then((res) => {
          console.log(res);
          //把一个返回值存到本地存储 用来判断用户是否登录了
          if (res.data.status == 300) {
            Toast("登录成功");
            localStorage.setItem("token", res.data.data);
            this.$router.push({ name: "Home" });
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
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  //left 和 right 0两个冲突 理解拉伸 width:100%   height:100%
  background: white;
  text-align: center;

  .top-box {
    height: 50px;
    // background: pink;

    //弹性布局
    display: flex;

    //让他里面子盒子垂直居中
    align-items: center;
    //两个的时候两边靠
    justify-content: space-between;

    .bg-coffee {
      height: 30px;
      width: 50px;
      //   background: gray;
      background: url(../assets/coffeeIcon.png);
      //让他背景放大
      background-size: 200%;
      //背景居中
      background-position: 50%;

      //左外边距
      margin-left: 10px;
    }

    .gogo {
      height: 30px;
      width: 50px;
      border-radius: 20px; //圆角边框 只有一个值表示4个方向
      border: 1px solid red;
      //字体居中,只有一行的时候 值等于他本身盒子的高度,救会垂直居中
      line-height: 30px;
      //右外边距
      margin-right: 10px;
    }
  }

  .logo {
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%; //圆角边框 50%可以把正方形变成圆形
    }
  }

  .text {
    //两个样式 同时修饰一个 color white -> black !important 加权重 理解 两个人打架 打不过拿武器
    .van-button--info {
      color: black !important;
    }
  }

  .title {
    text-align: left;
    //字体缩进 单位为像素 或者 em 1个em表示一个字体
    text-indent: 10px;
  }
}
</style>