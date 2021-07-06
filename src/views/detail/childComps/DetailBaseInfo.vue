<template>
  <div class="base-info" v-if="Object.keys(this.goods).length > 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount"
            :style="{backgroundColor:goods.discountColor}">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  }
</script>

<style scoped>
  .base-info {
    padding: 8px;
    display: flex;
    flex-direction: column;
    text-align: justify;
    box-shadow: 0 2px 8px #E2E2E2;
  }

  .base-info > div { margin-bottom: 8px; }

  .info-title {
    font-size: 16px;
    font-weight: 600;
    font-family: Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;;
  }

  .info-price {
    display: flex;
    align-items: center;
  }

  .info-price > span { margin-right: 8px; }

  .new-price {
    color: var(--color-high-text);
    font-size: 22px;
  }

  .old-price {
    color: #989898;
    font-size: 14px;
    text-decoration: line-through;
  }

  .discount {
    color: white;
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 2px 4px;
    align-self: start;
  }

  .info-other {
    display: flex;
    justify-content: space-between;
    color: #898989;
    padding: 8px 0 ;
    border-bottom: 1px solid #EAEAEA;
  }

  .info-service {
    display: flex;
    padding: 10px 0;
    color: #010101;
    font-size: 15px;
    justify-content: space-between;
  }

  .info-service img {
    height: 15px;
    vertical-align: middle;
  }
</style>
