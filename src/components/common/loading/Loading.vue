<template>
  <div id="loading" ref="loading">
    <div id="loading_bg" ref="loadingBg">
      <div class="loader">Loading...</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      show() {
        this.isShow = true
      },
      close() {
        let opacity = 1;
        let time = setInterval(() => {
          this.$refs.loadingBg.style.opacity = opacity;
          opacity -= 0.15;
          if (opacity <= 0) {
            clearInterval(time);
            this.$refs.loading.remove();
          }
        }, 100);
      },
    }
  }
</script>

<style scoped>
  #loading {
    position: fixed;
    background-color: #FFF;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  .loader {
    width: 350px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: helvetica, arial, sans-serif;
    text-transform: uppercase;
    font-weight: 900;
    color: #EA4335;
    letter-spacing: 0.2em;
  }

  .loader:before { top: 0; }

  .loader:after { bottom: 0; }

  .loader:before, .loader:after {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    background: #EA4335;
    position: absolute;
    animation: loading .7s infinite alternate ease-in-out;
  }


  @keyframes loading {
    0% {
      left: 0;
      height: 30px;
      width: 15px;
    }
    50% {
      height: 8px;
      width: 40px;
    }
    100% {
      left: 335px;
      height: 30px;
      width: 15px;
    }
  }
</style>
