<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles" :key="index" @click="itemClick(index)"
               :class="{active : currentIndex===index}" class="item-title">{{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .back {
    width: 100%;
    height: 100%;
  }

  .back img {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }

  .title {
    display: flex;
    justify-content: space-around;
  }

  .item-title {
    flex: 1;
    font-size: 14px;
  }

  .active { color: var(--color-tint); }
</style>
