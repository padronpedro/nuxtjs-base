<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
      <v-app-bar color="accent-4" dense>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ $t('Administrator') }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="$auth.loggedIn" icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn v-if="!$auth.loggedIn" icon @click="$router.push('/admin')">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group v-if="$auth.loggedIn" v-model="group" active-class="text--accent-4">
            <v-subheader>{{ $t('Administrator') }}</v-subheader>
            <MenuItem :menu-title="$t('Dashboard')" :menu-path="'/admin/dashboard'" :menu-icon="'monitor-dashboard'" />
            <MenuItem :menu-title="$t('Users')" :menu-path="'/admin/users'" :menu-icon="'account-multiple'" />
            <MenuItem :menu-title="$t('Notes')" :menu-path="'/admin/notes'" :menu-icon="'note-multiple-outline'" />
          </v-list-item-group>
          <v-divider />
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon v-text="'mdi-logout'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t('Logout')"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <LanguageChange :change-lang="'en'" :lang-title="'English'" />
          <LanguageChange :change-lang="'fr'" :lang-title="'Français'" />
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
  name: 'LayoutAdmin',
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
