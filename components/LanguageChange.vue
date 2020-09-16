<template>
  <NuxtLink :to="switchLocalePath(changeLang)">
    <v-list-item>
      <v-list-item-icon>
        <v-img :src="require('~/assets/flag-' + changeLang + '.png')" width="20px" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="langTitle"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </NuxtLink>
</template>

<script>
export default {
  name: 'LanguageChange',
  props: {
    langTitle: {
      type: String,
      required: true,
    },
    changeLang: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
