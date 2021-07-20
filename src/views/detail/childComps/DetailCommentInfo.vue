<template>
  <div class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多<i class="arrow-right"></i></div>
    </div>
    <div class="info-user" v-if="commentInfo.user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | filterDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs" v-if="commentInfo.images">
        <img v-for="(item,index) in commentInfo.images" :src="item" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "common/utils";

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      filterDate(value) {
        const date = new Date(value * 1000)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #F2F5F8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    position: relative;
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .arrow-right {
    position: relative;
    vertical-align: top;
  }

  .arrow-right:after, .arrow-right:before {
    content: '';
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-left: 10px solid #FFFFFF;
    position: absolute;
    top: 0;
    left: 2px;
  }

  .arrow-right:before {
    border-left-color: #898989;
    left: 4px;
  }

  .info-user { padding: 10px 0 5px; }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail { padding: 0 5px 15px; }

  .info-detail p {
    text-indent: 2em;
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date { margin-right: 8px; }

  .info-imgs { margin-top: 10px; }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
