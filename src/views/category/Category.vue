<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <div>
      <scroll class="content">
        <cate-tab-menu :categories="categories" @selectItem="selectItem"/>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import CateTabMenu from "./childComps/CateTabMenu";

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW} from "common/const";

  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      CateTabMenu,
    },
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: 0
      }
    },
    created() {
      this.getCategory().then(r => {
        this.getSubcategories(0)
      })
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
          console.log(r)
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

  .content {
    height: calc(100vh - 44px - 49px);
    width: 100px;
    overflow: hidden;
  }
</style>
