<template>
  <div id="cate-tab-menu">
    <div class="menu-list-item" :class="{active: index===currentIndex}" v-for="(item, index) in categories"
         :key="index" @click="itemClick(index)">{{item.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "CateTabMenu",
    props: {
      categories: Array,
      default() {
        return []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index);
      }
    }
  }
</script>

<style scoped>
  #cate-tab-menu {
    background-color: #F6F6F6;
    height: 100%;
    width: 100px;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    transition: all .3s;
  }

  .menu-list-item.active {
    font-weight: 600;
    color: var(--color-high-text);
    background-color: #FFF;
    border-left: 3px solid var(--color-high-text);
  }
</style>
