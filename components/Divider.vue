<template>
  <div>
    <v-subheader class="font-weight-bold mb-n4">
      <img v-if="imageDivider" :src="'@/assets/' + imageDivider" :width="imageWidth" class="mr-4" />
      {{ txtDivider }}
    </v-subheader>
    <v-divider />
  </div>
</template>

<script>
export default {
  name: 'Divider',
  props: {
    txtDivider: {
      type: String,
      required: true,
      default: '',
    },
    imageDivider: {
      type: String,
      required: false,
      default: '',
    },
    imageWidth: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
