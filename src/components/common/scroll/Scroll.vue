<template>
  <div class="scroll" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.scroll, {
        click: true,
        scrollY: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        pullDownRefresh: this.pullDownRefresh
      })

      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

      if (this.pullDownRefresh) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullingDown');
        });
      }
    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      scrollToElement(el, time = 500, x = 0, y = 0) {
        this.scroll && this.scroll.scrollToElement(el, time, x, y);
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      finishPullDown() {
        this.scroll && this.scroll.finishPullDown()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
