<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
      <v-app-bar color="accent-4" dense>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Administrator</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="text--accent-4">
            <NuxtLink :to="localePath('/admin/dashboard')">
              <v-list-item>
                <v-list-item-title>{{ $t('Dashboard') }}</v-list-item-title>
              </v-list-item>
            </NuxtLink>

            <NuxtLink :to="localePath('/admin/users')">
              <v-list-item>
                <v-list-item-title>{{ $t('Users') }}</v-list-item-title>
              </v-list-item>
            </NuxtLink>

            <NuxtLink :to="localePath('/admin/notes')">
              <v-list-item>
                <v-list-item-title>{{ $t('Content') }}</v-list-item-title>
              </v-list-item>
            </NuxtLink>

            <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
            <nuxt-link :to="switchLocalePath('fr')">Français</nuxt-link>

            <!-- <NuxtLink :to="$route.fullPath.replace(/^\/[^\/]+/, '')">
              <v-list-item>
                <v-list-item-title>English</v-list-item-title>
              </v-list-item>
            </NuxtLink>
            <NuxtLink :to="`/fr` + $route.fullPath">
              <v-list-item>
                <v-list-item-title>French</v-list-item-title>
              </v-list-item>
            </NuxtLink> -->
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-card-text>
        <Nuxt />
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
