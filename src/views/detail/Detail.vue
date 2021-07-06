<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";

  import {getDetail, GoodsInfo} from "network/detail";


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
    },
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(r => {
        const data = r.result
        //获取顶部轮播图片数据
        this.topImages = data.itemInfo.topImages

        //获取商品详细数据
        const [itemInfo, columns, services] = [data.itemInfo, data.columns, data.shopInfo.services]
        this.goods = new GoodsInfo(itemInfo, columns, services)
        console.log(data)
        console.log(this.goods)
      })
    }
  }
</script>

<style scoped>

</style>
