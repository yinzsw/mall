<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components: {
      Scroll,
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
    },
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(r => {
        //0. 获取数据
        const data = r.result

        //1. 获取顶部轮播图片数据
        this.topImages = data.itemInfo.topImages

        //2. 获取商品详细数据
        const [itemInfo, columns, services] = [data.itemInfo, data.columns, data.shopInfo.services]
        this.goods = new Goods(itemInfo, columns, services)

        //3. 获取商店详细数据
        this.shop = new Shop(data.shopInfo)

        //4. 获取商店详细数据
        this.detailInfo = data.detailInfo

        //5. 获取参数信息
        const [info, rule] = [data.itemParams.info, data.itemParams.rule]
        this.paramInfo = new GoodsParam(info, rule)

        //6. 获取评论信息
        if (data.rate.cRate !== 0) this.commentInfo = data.rate.list[0]
      })

      getRecommend().then(r => {
        this.recommends = r.data.list
      })
    },
    methods: {
      imgLoad() {
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
    z-index: 1;
  }

  .detail-nav {
    position: relative;
    background-color: #FFF;
    z-index: 1;
  }

  .content { height: calc(100% - 44px); }
</style>
