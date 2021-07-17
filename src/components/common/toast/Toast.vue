<template>
  <transition name="fade">
    <div id="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false,
        timer: null
      }
    },
    methods: {
      show(message, duration = 1500) {
        this.isShow = true;
        this.message = message;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration)
      }
    }
  }
</script>

<style scoped>
  #toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    border-radius: 5px;
    padding: 7px;
    color: #F2F2F2;
    background-color: rgba(0, 0, 0, .75);
  }

  #toast div { font-size: 16px; }

  .fade-enter-active, .fade-leave-active { transition: opacity .4s; }

  .fade-enter, .fade-leave-to { opacity: 0; }
</style>
