<template>
  <div>
    {{ 'Dashboard' }}
    {{ $t('welcome to') }}
    {{ this.$auth.user }}
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  layout: 'admin',
  middleware: 'auth',
}
</script>

<style></style>
