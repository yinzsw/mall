<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <tab-control :titles="titles" @tabClick="tabClick" class="tab-control-fixed" ref="tabControlFixed"
                 v-show="isTabFixed"/>
    <div class="content-box">
      <scroll class="scroll-box">
        <cate-tab-menu :categories="categories" @selectItem="selectItem"/>
      </scroll>
      <scroll class="scroll-box" :probeType="3" @scroll="contentScroll" ref="contentScroll">
        <cate-content :subcategories="subCategoryDate" @imageLoad="imageLoad"/>
        <tab-control :titles="titles" @tabClick="tabClick" class="tab-control" ref="tabControlScroll"
                     v-show="!isTabFixed"/>
        <goods-list :goods="subCategoryDetails" class="goods-list"/>
      </scroll>
    </div>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backtop/BackTop";

  import CateTabMenu from "./childComps/CateTabMenu";
  import CateContent from "./childComps/CateContent";
  import CateContentDetail from "./childComps/CateContentDetail";

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW, BACKTOP_DISTANCE} from "common/const";
  import {debounce} from "common/utils";

  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      CateTabMenu,
      CateContent,
      CateContentDetail
    },
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: 0,
        refreshContent: null,
        titles: ['流行', '新款', '精选'],
        currentType: POP,
        isTabFixed: false,
        tabOffsetTop: 0,
        isShowBackTop: false
      }
    },
    created() {
      this.getCategory().then(() => this.getSubcategories(this.currentIndex))
    },
    mounted() {
      this.refreshContent = debounce(this.$refs.contentScroll.refresh, 100);

      const refresh = debounce(this.$refs.contentScroll.refresh, 100);
      this.$bus.$on('categoryImageLoad', refresh);
    },
    computed: {
      subCategoryDate() {
        if (this.categoryData[this.currentIndex])
          return this.categoryData[this.currentIndex].subcategories;
      },
      subCategoryDetails() {
        if (this.categoryData[this.currentIndex])
          return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      }
    },
    methods: {
      getCategory() {
        return getCategory().then(r => {
          this.categories = r.data.category.list;
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
        })
      },
      getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(r => {
          this.categoryData[index].subcategories = r.data
          this.categoryData = {...this.categoryData}

          this.getCategoryDetail(POP)
          this.getCategoryDetail(SELL)
          this.getCategoryDetail(NEW)
        })
      },
      getCategoryDetail(type) {
        // 1. 获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2. 发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(r => {
          this.categoryData[this.currentIndex].categoryDetail[type] = r;
        })
      },
      selectItem(index) {
        this.isTabFixed = false
        this.getSubcategories(index);
      },
      imageLoad() {
        this.refreshContent && this.refreshContent()
        this.tabOffsetTop = this.$refs.tabControlScroll.$el.offsetTop - 44;
      },
      tabClick(index) {
        this.currentType = Object.keys(this.categoryData[0].categoryDetail)[index]
        this.$refs.tabControlFixed.currentIndex = this.$refs.tabControlScroll.currentIndex = index;
      },
      contentScroll(position) {
        const positionY = -position.y;
        //1.是否显示BackTop
        this.isShowBackTop = positionY > BACKTOP_DISTANCE

        //2.tabControl是否吸顶
        this.isTabFixed = positionY > this.tabOffsetTop
      },
      backClick() {
        this.$refs.contentScroll.scrollTo(0, 0)
      }
    }
  }
</script>

<style scoped>
  #category { height: 100vh; }

  .nav-bar {
    color: #FFF;
    background-color: var(--color-tint);
    font-weight: 600;
  }

  .content-box { display: flex; }

  .scroll-box:nth-child(2) { flex: 1; }

  .scroll-box {
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }

  .tab-control-fixed {
    position: absolute;
    left: 100px;
    width: calc(100vw - 100px);
    z-index: 1;
  }

  .tab-control { margin-bottom: 10px; }
</style>
