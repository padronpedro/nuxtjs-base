<template>
  <v-col :cols="cols" :lg="lg" :sm="sm">
    <slot></slot>
  </v-col>
</template>

<script>
export default {
  name: 'Column',
  props: {
    size: {
      type: String,
      required: false,
      default: 'md',
    },
  },
  data() {
    return {
      cols: 12,
      lg: 4,
      sm: 6,
    }
  },
  mounted() {
    this.$nextTick(function () {
      if (this.size === 'xs') {
        this.lg = 1
      }
      if (this.size === 'sm') {
        this.lg = 2
      }
      if (this.size === 'md') {
        this.lg = 3
      }
      if (this.size === 'lg') {
        this.lg = 6
      }
      if (this.size === 'xl') {
        this.lg = 12
      }
    })
  },
}
</script>
