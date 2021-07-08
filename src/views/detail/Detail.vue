<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo
    },
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
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

        //获取商店详细数据
        this.shop = new Shop(data.shopInfo)

        //获取商店详细数据
        this.detailInfo = data.detailInfo

        //获取参数信息
        const [info, rule] = [data.itemParams.info, data.itemParams.rule]
        this.paramInfo = new GoodsParam(info, rule)
      })
    },
    methods: {
      imgLoad(){
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    background-color: #FFF;
    z-index: 5;
  }

  .detail-nav {
    position: relative;
    background-color: #FFF;
    z-index: 1;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
