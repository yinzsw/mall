<template>
  <div class="profile-menu" v-if="this.menuInfo.length > 0">
    <div class="menu-item" v-for="(item,index) in menuInfo">
      <img :src="item.icon" alt="">
      <div>{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileMenu",
    props: {
      menuInfo: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .profile-menu { border-top: 15px solid rgba(0, 0, 0, .10); }

  .menu-item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EEEEEE;
    padding: 8px 12px;
    font-size: 15px;
  }

  .menu-item img { width: 22px; }

  .menu-item > div { margin-left: 12px;}

  .menu-item:last-of-type { border-bottom: none; }
</style>
