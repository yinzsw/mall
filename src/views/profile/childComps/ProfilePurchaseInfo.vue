<template>
  <grid-view class="profile-pur-info" :columns="3" :padding="[0]" :columnGap="0"
             v-if="Object.keys(this.purchaseInfo).length > 0">
    <div class="account-item">
      <div class="number"><span class="balance">{{purchaseInfo.balance | balanceFilter}}</span>元</div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">{{purchaseInfo.coupon}}</span>个
      </div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">{{purchaseInfo.integral}}</span>分
      </div>
      <div class="account-info">我的积分</div>
    </div>
  </grid-view>
</template>

<script>
  import GridView from "components/common/gridView/GridView";

  export default {
    name: "ProfilePurchaseInfo",
    components: {
      GridView
    },
    props: {
      purchaseInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      balanceFilter(value) {
        return value.toFixed(2)
      }
    }
  }
</script>

<style scoped>
  .account-item {
    color: #666;
    text-align: center;
    font-size: 14px;
    padding: 20px;
  }

  .account-item:nth-child(2) {
    border-left: 1px solid #E2E2E2;
    border-right: 1px solid #E2E2E2;
  }

  .number .balance {
    font-size: 24px;
    font-weight: 600;
    color: #FF5F3E;
  }

  .account-info { margin-top: 6px; }
</style>
