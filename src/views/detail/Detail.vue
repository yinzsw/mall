<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";

  import {getDetail, Goods, Shop} from "network/detail";


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {}
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
        this.goods = new Goods(itemInfo, columns, services)

        //获取商品详细数据
        const shopInfo = data.shopInfo
        this.shop = new Shop(shopInfo)
      })
    }
  }
</script>

<style scoped>

</style>
