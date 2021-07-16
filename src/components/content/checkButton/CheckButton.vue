<template>
  <div class="check-button" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="" v-show="isChecked">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 16px;
    height: 16px;
    border: 1px solid #AAA;
  }

  .check-button, .check-button img { border-radius: 50%; }

  .checked {
    background-color: var(--color-tint);
    border: none;
  }
</style>
