<template>
  <v-breadcrumbs :items="items">
    <template v-slot:item="props">
      <v-breadcrumbs-item
        :class="{
          disabled: props.item.disabled,
          'with-cursor': !props.item.disabled,
        }"
        @click="redirectTo(props.item)"
      >
        {{ props.item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<style scoped>
.disabled {
  color: grey;
}
.with-cursor {
  cursor: pointer;
}
</style>

<script>
export default {
  name: 'BreadCrumbs',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    redirectTo(item) {
      this.$router.push(item.goTo)
    },
  },
}
</script>
