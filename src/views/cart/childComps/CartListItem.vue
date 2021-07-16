<template>
  <div class="cate-list-item">
    <div class="item-button">
      <check-button :isChecked="product.checked" @click.native="checkedClick"/>
    </div>
    <div class="item-img"><img :src="product.image" alt=""></div>
    <div class="item-info">
      <div class="info-title">{{product.title}}</div>
      <div class="info-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="info-price">¥{{product.newPrice}}</div>
        <div class="info-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkedClick() {
        this.product.checked = !this.product.checked
      }
    }
  }
</script>

<style scoped>
  .cate-list-item {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #CCCCCC;
    padding: 5px;
  }

  .item-button {
    align-self: center;
  }

  .item-img { padding: 5px; }

  .item-img img {
    width: 80px;
    height: 110px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .item-info .info-title,
  .item-info .info-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .info-title {
    font-size: 18px;
    color: #333;
  }

  .info-desc {
    font-size: 14px;
    color: #666;
  }

  .info-bottom {
    font-size: 17px;
    display: flex;
    justify-content: space-between;
  }

  .info-bottom .info-price { color: orangered; }

  .info-bottom .info-count { color: #444; }
</style>
