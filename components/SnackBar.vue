<template>
  <v-snackbar v-model="thisSnackbar" bottom :color="color ? color : 'error'" multi-line>
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn dark text v-bind="attrs" @click="thisSnackbar = false">
        {{ $t('Close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    snackbar: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: 'error',
    },
    text: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      thisSnackbar: false,
    }
  },
  watch: {
    snackbar(val) {
      this.thisSnackbar = val
    },
  },
}
</script>
