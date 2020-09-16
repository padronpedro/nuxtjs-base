<template>
  <div>
    users
    <BreadCrumbs :items="items" />
  </div>
</template>

<script>
export default {
  name: 'Users',
  layout: 'admin',
  data() {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          goTo: '/dashboard',
        },
        {
          text: 'Users',
          disabled: false,
          goTo: '/admin/users',
        },
        {
          text: 'Users',
          disabled: false,
          goTo: '/admin/notes',
        },
      ],
    }
  },
}
</script>

<style></style>
