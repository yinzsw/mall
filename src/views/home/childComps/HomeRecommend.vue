<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    justify-content: space-around;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 16px;
    border-bottom: 4px solid #E6E6E6;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  img { width: 65px; }
</style>
