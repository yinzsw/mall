<template>
<!--  <grid-view :columns="2" :rowGap="15" :margin="[16, 8]" v-if="subcategories.list">-->

<!--  </grid-view>-->
  <goods-list></goods-list>
</template>

<script>
  import GridView from "components/common/gridView/GridView";
  import GoodsList from "components/content/goods/GoodsList";

  export default {
    name: "CateContentDetail",
    components: {
      GridView,
      GoodsList
    }
  }
</script>

<style scoped>

</style>
