<template>

  <tab-bar>
    <tab-bar-item v-for="(tabBarItem,index) in tabBarItems" :key="index" :path=tabBarItem.path :activeColor=tabBarColor>
      <template v-slot:item-icon>
        <img :src='tabBarItem.imgUrl'>
      </template>
      <template v-slot:item-icon-active>
        <img :src='tabBarItem.imgUrlActive'>
      </template>
      <template v-slot:item-text>
        <div>{{tabBarItem.title}}</div>
      </template>
    </tab-bar-item>
  </tab-bar>

</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";

  const tabBarItems = [
    {
      path: "/home",
      title: "首页",
      imgUrl: require("assets/img/tabbar/home.svg"),
      imgUrlActive: require("assets/img/tabbar/home_active.svg")
    },
    {
      path: "/category",
      title: "分类",
      imgUrl: require("assets/img/tabbar/category.svg"),
      imgUrlActive: require("assets/img/tabbar/category_active.svg")
    },
    {
      path: "/shopcart",
      title: "购物车",
      imgUrl: require("assets/img/tabbar/shopcart.svg"),
      imgUrlActive: require("assets/img/tabbar/shopcart_active.svg")
    },
    {
      path: "/profile",
      title: "我的",
      imgUrl: require("assets/img/tabbar/profile.svg"),
      imgUrlActive: require("assets/img/tabbar/profile_active.svg")
    }
  ]
  const tabBarColor = '#FF5777'
  export default {
    name: "MainTabBar",
    data() {
      return {
        tabBarItems,
        tabBarColor
      }
    },
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
