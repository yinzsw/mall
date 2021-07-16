<template>
  <div class="cart-bottom-bar">
    <div class="checked-all" @click="checkedAll">
      <check-button :isChecked="isCheckedAll"/>
      <span>全选</span>
    </div>
    <div class="checked-price">
      <span>合计：¥{{checkedTotalPrice}}</span>
    </div>
    <div class="buy">
      <span>去结算 ({{checkedNumber}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from "vuex";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['checkedTotalPrice', 'checkedNumber', 'isCheckedAll'])
    },
    methods: {
      checkedAll() {
        let nextState = !this.isCheckedAll;
        this.$store.dispatch('modCart_AllChecked', nextState);
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #F2F2F2;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, .16);
  }

  .cart-bottom-bar > div { padding: 0 5px; }

  .checked-all {
    display: flex;
    color: #888888;
  }

  .checked-all span { margin-left: 3px; }

  .buy {
    height: 100%;
    color: #F2F2F2;
    background-color: #FA5A57;
    display: flex;
    align-items: center;
  }
</style>
