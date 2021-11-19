<!--  -->
<template>
  <div class="my">
    <div class="my-bg"></div>
    <div class="my-info">
      <div class="clearfix">
        <!-- src="http://www.kangliuyong.com:10002/assets/default.png" -->
        <div class="fl my-img">
          <img
            class="auto-img"
            src="https://img0.baidu.com/it/u=1659180627,667124450&fm=26&fmt=auto"
            alt=""
          />
        </div>
        <div class="fl my-info-box">
          <div class="user-name">Answer</div>
          <div class="user-desc">这家伙很懒，什么也没有留下！</div>
        </div>
      </div>

      <div class="list-box">
        <van-cell title="我的订单" is-link @click="goPage('Order')" />
        <van-cell title="地址管理" is-link @click="goPage('Address')" />
        <van-cell title="退出登录" is-link @click="exitLogin" />
      </div>
    </div>

    <!-- 底部结束 -->
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      //用户信息
      //this.getUserInfo();
    };
  },
  methods: {
    //获取用户信息
    getUserInfo() {},

    //去别的页面
    goPage(name) {
      this.$router.push({ name });
    },

    //退出登录
    exitLogin() {
      localStorage.removeItem("token");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style lang='less' scoped>
.bg {
  img {
    width: 100%;
    height: 180px;
  }
}
.list {
  position: relative;
  top: -50px;
  margin: 10px;
  img {
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }
}

//测试版本
.my {
  .my-bg {
    height: 180px;
    background-color: #fff;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    background-image: url("http://www.kangliuyong.com:10002/assets/default_bg.jpg");
  }
  .upload-box {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .van-uploader__wrapper {
      height: 100%;
    }
    .van-uploader__upload {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  .my-info {
    margin: 0 10px;
    position: relative;
    top: -40px;
    padding: 10px 10px 0 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.65) 0,
      rgba(255, 255, 255, 1) 90px,
      #fff 90px,
      #fff 100%
    );

    .clearfix {
      display: flex;
    }
  }
  .my-img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #ddd;
    margin-right: 20px;
  }

  .my-info-box {
    width: calc(~"100% - 90px");
    height: 70px;
  }

  .user-name {
    color: #1a73e8;
    height: 30px;
    font-weight: bold;
  }

  .user-desc {
    font-size: 14px;
    color: #999;
    height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .list-box {
    margin-top: 50px;
  }

  /deep/ .van-cell {
    border-bottom: 1px solid #f5f6f7;
    padding: 15px 0;
    &:last-child {
      border-bottom: none;
    }
    &:active {
      background-color: transparent;
    }

    span {
      color: #646566;
    }
  }
}
</style>