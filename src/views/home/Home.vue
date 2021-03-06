<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control :titles="tabTitles" @tabClick="tabClick" ref="tabControlFixed" v-show="isTabFixed"/>
    <scroll class="scroll-box" ref="scroll" :probeType="3" :pullUpLoad="true" @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad.once="imageLoad"></home-swiper>
      <home-recommend :recommends="recommends" @recommendImageLoad.once="imageLoad"></home-recommend>
      <home-feature @featureImageLoad.once="imageLoad"/>
      <tab-control :titles="tabTitles" @tabClick="tabClick" ref="tabControlScroll" v-show="!isTabFixed"/>
      <goods-list :goods="goods[currentType]['list']"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>


<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backtop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";
  import HomeFeature from "./childComps/HomeFeature";

  import {getHomeMultiData, getHomeGoods} from "network/home";
  import {NEW, POP, SELL, BACKTOP_DISTANCE} from "common/const";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        tabTitles: ['流行', '新款', '精选'],
        tabOffsetTop: 0,
        isTabFixed: false,
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: POP,
        saveY: 0,
        isShowBackTop: false
      }
    },
    created() {
      this.getHomeMultiData()

      this.getHomeGoods(POP)
      this.getHomeGoods(NEW)
      this.getHomeGoods(SELL)
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 150)
      this.$bus.$on('homeImageLoad', refresh)
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        this.currentType = Object.keys(this.goods)[index]
        this.$refs.tabControlFixed.currentIndex = this.$refs.tabControlScroll.currentIndex = index;
      },
      contentScroll(position) {
        const positionY = -position.y
        //1.是否显示BackTop
        this.isShowBackTop = positionY > BACKTOP_DISTANCE

        //2.tabControl是否吸顶
        this.isTabFixed = positionY > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType).then(() => this.$refs.scroll.finishPullUp())
      },
      imageLoad() {
        this.tabOffsetTop = this.$refs.tabControlScroll.$el.offsetTop - 44;
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        return getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
    },
  }
</script>

<style scoped>
  #home { height: 100vh; }

  .home-nav {
    color: #FFF;
    background-color: var(--color-tint);
    font-weight: 600;
  }

  .scroll-box {
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>
