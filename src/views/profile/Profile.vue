<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <template v-slot:center>我的档案</template>
    </nav-bar>
    <profile-user-info :userInfo="userInfo"/>
    <profile-purchase-info :purchaseInfo="purchaseInfo"/>
    <profile-menu :menuInfo="orderMenu"/>
    <profile-menu :menuInfo="serviceMenu"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import ProfileUserInfo from "./childComps/ProfileUserInfo";
  import ProfilePurchaseInfo from "./childComps/ProfilePurchaseInfo";
  import ProfileMenu from "./childComps/ProfileMenu";

  export default {
    name: "Profile",
    components: {
      NavBar,
      ProfileUserInfo,
      ProfilePurchaseInfo,
      ProfileMenu
    },
    data() {
      return {
        userInfo: {},
        purchaseInfo: {
          balance: 0,
          coupon: 0,
          integral: 0,
        },
        orderMenu: [
          {icon: require("@/assets/img/profile/message.svg"), info: '我的消息'},
          {icon: require("@/assets/img/profile/pointer.svg"), info: '积分商城'},
          {icon: require("@/assets/img/profile/vip.svg"), info: '会员卡'},
        ],
        serviceMenu: [
          {icon: require("@/assets/img/profile/cart.svg"), info: '我的购物车'},
          {icon: require("@/assets/img/profile/shopping.svg"), info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
  .profile-nav {
    color: #FFF;
    background-color: var(--color-tint);
    font-weight: 600;
  }
</style>
