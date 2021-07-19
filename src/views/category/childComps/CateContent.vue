<template>
  <grid-view :columns="3" :rowGap="15" :margin="[16,8]" v-if="subcategories.list">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </grid-view>
</template>

<script>
  import GridView from "components/common/gridView/GridView";

  export default {
    name: "CateContent",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .item {
    font-size: 12px;
    text-align: center;
  }

  .item-img { width: 90%; }

  .item-text { margin-top: 10px;}
</style>
