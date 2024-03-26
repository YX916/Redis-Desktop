<template>
  <span role="img" :class="svgClass">
    <svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <use :xlink:href="iconType" />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconType() {
      return `#${this.type}`
    },
    svgClass() {
      if (this.className) {
        return 'icon ' + this.className
      } else {
        return 'icon'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.icon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>