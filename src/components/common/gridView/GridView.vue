<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "GridView",
    props: {
      columns: {
        type: Number,
        default: 2
      },
      rowGap: {
        type: Number,
        default: 8
      },
      columnGap: {
        type: Number,
        default: 8
      },
      margin: {
        type: Array,
        default() {
          return [8]
        }
      }
    },
    mounted: function () {
      this.autoLayout()
    },
    methods: {
      autoLayout: function () {
        let gridContainerStyle = this.$refs.gridView.style;
        gridContainerStyle.gridTemplateColumns = " auto".repeat(this.columns);
        gridContainerStyle.gridRowGap = `${this.rowGap}px`;
        gridContainerStyle.gridColumnGap = `${this.columnGap}px`;
        gridContainerStyle.margin = `${this.margin.join('px ')}px`
      }
    }
  }
</script>

<style scoped>
  .grid-view { display: grid; }
</style>
