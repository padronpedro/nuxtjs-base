<template>
  <v-breadcrumbs :items="items">
    <template v-slot:item="props">
      <v-breadcrumbs-item
        :class="{
          disabled: props.item.disabled,
          'with-cursor': true,
        }"
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
      if (item.params) {
        this.$router.push({ name: item.goTo, params: item.params }).catch((err) => {
          err = ''
        })
      } else {
        this.$router.push({ name: item.goTo }).catch((err) => {
          err = ''
        })
      }
    },
  },
}
</script>
