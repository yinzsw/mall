<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length>0">
    <table v-for="(sizeV,sizeK) in paramInfo.sizes" :key="sizeK" class="info-size">
      <tr v-for="(sizV,sizK) in sizeV" :key="sizK">
        <td v-for="(siV,siK) in sizV" :key="siK">{{siV}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(infoV,infoK) in paramInfo.infos" :key="infoK">
        <td class="info-param-key">{{infoV.key}}</td>
        <td class="param-value">{{infoV.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length > 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #F2F5F8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr { height: 42px; }

  .param-info table tr td { border-bottom: 1px solid rgba(100, 100, 100, .1); }

  .info-param-key { width: 95px; }

  .info-param { border-top: 1px solid rgba(0, 0, 0, .1); }

  .param-value { color: #EB4868 }

  .info-img img { width: 100%; }
</style>
