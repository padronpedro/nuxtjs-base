<template>
  <div>
    <v-text-field v-model="email" label="email"></v-text-field>
    <v-text-field v-model="password" label="password"></v-text-field>
    <button @click="accede">Login</button>
    <button @click="logout">Logout</button>
    <button @click="$router.push('/')">Back</button>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  layout: 'admin',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async accede() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    },
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style></style>
