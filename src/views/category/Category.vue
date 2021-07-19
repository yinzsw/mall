<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <div class="content-box">
      <scroll class="scroll-box">
        <cate-tab-menu :categories="categories" @selectItem="selectItem"/>
      </scroll>
      <scroll class="scroll-box" ref="scrollContent">
        <cate-content :subcategories="subCategoryDate" @imageLoad="imageLoad"/>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import CateTabMenu from "./childComps/CateTabMenu";
  import CateContent from "./childComps/CateContent";

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "common/const";
  import {debounce} from "common/utils";

  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      CateTabMenu,
      CateContent
    },
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: 0,
        refreshContent: null
      }
    },
    created() {
      this.getCategory().then(() => this.getSubcategories(this.currentIndex))
    },
    mounted() {
      this.refreshContent = debounce(this.$refs.scrollContent.refresh, 150);
    },
    computed: {
      subCategoryDate() {
        if (this.categoryData[this.currentIndex]) return this.categoryData[this.currentIndex].subcategories;
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
        this.getSubcategories(index)
      },
      imageLoad() {
        this.refreshContent && this.refreshContent()
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

  .scroll-box {
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }

  .scroll-box:nth-child(2) { flex: 1; }
</style>
