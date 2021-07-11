<template>
  <div v-if="Object.keys(detailInfo).length>0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imaLength: 0,
      }
    },
    methods: {
      imgLoad() {
        let imgTimer;
        if (!this.counter) imgTimer = setTimeout(this.$emit('imageLoad'), 800)
        if (++this.counter === this.imaLength) {
          this.$emit('imageLoad')
          clearTimeout(imgTimer)
        }
      }
    },
    watch: {
      detailInfo() {
        this.imaLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #F2F5F8;
  }

  .info-desc { padding: 0 15px; }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #A3A3A5;
    position: relative;
  }

  .info-desc .start { float: left; }

  .info-desc .end { float: right; }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after { right: 0; }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 16px;
  }

  .info-list img { width: 100%; }
</style>
