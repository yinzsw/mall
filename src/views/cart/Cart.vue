<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{cartLength}})</template>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list :cartList="cartList"/>
    </scroll>
    <cart-bottom-bar class="cart-bottom-bar"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from "vuex";

  export default {
    name: "cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      CartBottomBar
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    computed: {
      ...mapGetters(['cartLength', 'cartList'])
    },
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
    background-color: #FFF;
  }

  .nav-bar {
    color: #FFFFFF;
    background-color: var(--color-tint);
  }

  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>
