<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control :titles="tabTitles" @tabClick="tabClick" ref="tabControlFixed" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll"
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
  import {debounce} from "common/utils"

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
        currentType: 'pop',
        isShowBackTop: false,
        saveY: 0,
      }
    },
    created() {
      this.getHomeMultiData()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 150)
      this.$bus.$on('itemImageLoad', () => refresh())
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
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //1.是否显示BackTop
        this.isShowBackTop = (-position.y) > 1000

        //2.tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      imageLoad() {
        this.tabOffsetTop = this.$refs.tabControlScroll.$el.offsetTop;
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
        getHomeGoods(type, page)
          .then(res => {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
          })
          .finally(() => {
            this.$refs.scroll.finishPullUp()
          })
      },
    },
  }
</script>

<style scoped>
  #home { height: 100vh; }

  .home-nav {
    color: white;
    background-color: var(--color-tint);
  }

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>
