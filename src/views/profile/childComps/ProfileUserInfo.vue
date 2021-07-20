<template>
  <div class="profile-base-info">
    <a href="#url" class="info-box">
      <div class="avatar-box">
        <img v-show="!userInfo.avatar" src="@/assets/img/profile/avatar.svg" alt="">
        <img v-show="userInfo.avatar" :src="userInfo.avatar" alt="">
      </div>
      <div class="login-info left">
        <div class="user-nickname">{{ userInfo.username || '登录 / 注册' }}</div>
        <div class="phone">
          <img src="@/assets/img/profile/phone.svg" alt="">
          <div name="user-phone">{{ userInfo.phone || '暂无绑定手机号'}}</div>
        </div>
      </div>
      <div class="login-info right">
        <img src="~assets/img/common/arrow-left.svg" alt="">
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "ProfileBaseInfo",
    props: {
      userInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .profile-base-info {
    background-color: var(--color-tint);
    padding: 10px 15px 15px;
    box-shadow: 0 -1px 5px #F67490;
  }

  .info-box {
    display: flex;
    justify-content: center;
  }

  .avatar-box {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .avatar-box img { width: inherit; }

  .login-info.left {
    flex: 1;
    color: #F2F2F2;
    margin-left: 15px;
  }

  .user-nickname { padding: 10px 0; }

  .phone { display: flex; }

  .phone img { width: 18px; }

  .login-info.right {
    display: flex;
    justify-content: center;
  }

  .login-info.right img { width: 18px; }
</style>
