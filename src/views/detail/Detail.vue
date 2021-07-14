<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" ref="base"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backtop/BackTop";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {BACKTOP_DISTANCE} from "common/const";
  import {backTopMixin} from "common/mixin";

  export default {
    name: "Detail",
    components: {
      Scroll,
      GoodsList,
      BackTop,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar
    },
    mixins: [backTopMixin],
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
        titlePosition: [],
        currentIndex: 0
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
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 100)
      this.$bus.$on('detailImageLoad', refresh)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        this.titlePosition = [
          this.$refs.base.$el.offsetTop - 44,
          this.$refs.param.$el.offsetTop - 44,
          this.$refs.comment.$el.offsetTop - 44,
          this.$refs.recommend.$el.offsetTop - 44,
        ]
      },
      titleClick(index) {
        if (this.titlePosition[0] === undefined) return null;
        this.$refs.scroll.scrollTo(0, -this.titlePosition[index], 150)
      },
      contentScroll(position) {
        const positionY = -position.y

        for (const k in this.titlePosition) {
          let index = ~~k;
          let maxIndex = this.titlePosition.length - 1
          const isCurrentIndex = this.currentIndex === index;
          const isInScope1 = positionY >= this.titlePosition[index] && positionY < this.titlePosition[index + 1];
          const isInScope2 = index === maxIndex && positionY >= this.titlePosition[maxIndex];
          if (!isCurrentIndex && (isInScope1 || isInScope2)) {
            this.currentIndex = index
            this.$refs.nav.currentIndex = index
          }
        }

        this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
      },
      addCart() {
        //获取商品信息
        const product = {}
        product.iid = this.iid;
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.newPrice = this.goods.realPrice;

        //添加到购物车
        this.$store.dispatch('addCart', product);
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

  .content {
    height: calc(100% - 44px - 49px);
    background-color: #FFF;
  }
</style>
