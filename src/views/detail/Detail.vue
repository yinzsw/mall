<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="scroll-box" ref="scroll" :pullDownRefresh="true" :probeType="2"
            @scroll="titleActive" @pullingDown="updatePage">
      <detail-swiper :topImages="topImages" ref="swiper"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" ref="goods"/>
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
  import {BACKTOP_DISTANCE} from "common/const";
  import {debounce} from "common/utils";

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
        titleLocationDom: [],
        titleActivePosition: [],
        refreshDeb: null,
        positionDeb: null,
        titleActiveDeb: null,
        currentIndex: 0,
        isShowBackTop: false
      }
    },
    created() {
      this.iid = this.$route.params.iid

      const _getDetail = getDetail(this.iid).then(r => {
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

      const _getRecommend = getRecommend().then(r => this.recommends = r.data.list)

      Promise.all([_getDetail, _getRecommend]).then(() => this.$refs.scroll.finishPullDown())
    },
    mounted() {
      this.refreshDeb = debounce(this.$refs.scroll.refresh, 100);
      this.$bus.$on('detailImageLoad', this.refreshDeb);

      this.positionDeb = debounce(this.debPosition, 100);

      this.titleActiveDeb = debounce(this.debTitleActive, 15);

      this.$nextTick(() => {
        this.titleLocationDom = [
          this.$refs.swiper.$el,
          this.$refs.param.$el,
          this.$refs.comment.$el,
          this.$refs.recommend.$el,
        ];
      })
    },
    methods: {
      imageLoad() {
        this.refreshDeb && this.refreshDeb();
        this.positionDeb && this.positionDeb();
      },
      debPosition() {
        this.titleActivePosition = this.titleLocationDom.map(item => item.offsetTop - 44);
      },
      titleActive(position) {
        this.titleActiveDeb && this.titleActiveDeb(position)
      },
      debTitleActive(position) {
        //判断内容所在导航分类
        const offsetTop = -position.y;
        const temp = [...this.titleActivePosition];
        temp.push(offsetTop);
        temp.sort((a, b) => a - b)
        const index = temp.lastIndexOf(offsetTop)
        this.$refs.nav && (this.$refs.nav.currentIndex = index - 1);

        //显示回到顶部
        this.isShowBackTop = offsetTop > BACKTOP_DISTANCE
      },
      titleClick(index) {
        this.$refs.scroll.scrollToElement(this.titleLocationDom[index], 200);
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
        this.$store.dispatch('addCart', product).then(r => this.$toast.show(r));
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      updatePage() {
        setTimeout(() => this.$router.replace('/refresh'), 200)
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
  }

  .scroll-box {
    height: calc(100% - 93px);
    background-color: #FFF;
    overflow: hidden;
  }
</style>
