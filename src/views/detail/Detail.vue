<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";

  import {getDetail} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: '',
        topImages:[]
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(r => {
        //获取顶部轮播图片数据
        this.topImages = r.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>
