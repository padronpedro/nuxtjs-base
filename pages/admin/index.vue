<template>
  <div>
    <v-card class="mx-auto" max-width="400">
      <v-card-title>{{ $t('Welcome') }}</v-card-title>

      <v-card-text class="text--primary">
        <v-text-field v-model="email" type="email" :label="$t('Email')" autocomplete="new-password"></v-text-field>
        <v-text-field v-model="password" type="password" :label="$t('Password')"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="login">
          {{ $t('Login') }}
        </v-btn>

        <v-btn color="red" text @click="$router.push('/')">
          {{ $t('Exit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
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
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/admin/dashboard')
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        this.$store.setUser(this.$auth.user)
        this.$router.push('/admin/dashboard')
      } catch (e) {
        this.error = e
      }
    },
  },
}
</script>

<style></style>
