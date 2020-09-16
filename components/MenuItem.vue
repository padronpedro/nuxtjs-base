<template>
  <NuxtLink :to="localePath(menuPath)">
    <v-list-item>
      <v-list-item-icon v-if="menuIcon">
        <v-icon v-text="'mdi-' + menuIcon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="menuTitle"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </NuxtLink>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuTitle: {
      type: String,
      required: true,
    },
    menuPath: {
      type: String,
      required: true,
    },
    menuIcon: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style></style>
