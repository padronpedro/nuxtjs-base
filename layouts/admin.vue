<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
      <v-app-bar color="accent-4" dense>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ $t('Administrator') }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="text--accent-4">
            <v-subheader>{{ $t('Administrator') }}</v-subheader>
            <MenuItem :menu-title="$t('Dashboard')" :menu-path="'/admin/dashboard'" :menu-icon="'monitor-dashboard'" />
            <MenuItem :menu-title="$t('Users')" :menu-path="'/admin/users'" :menu-icon="'account-multiple'" />
            <MenuItem :menu-title="$t('Notes')" :menu-path="'/admin/notes'" :menu-icon="'note-multiple-outline'" />
            <v-divider />
            <LanguageChange :change-lang="'en'" :lang-title="'English'" />
            <LanguageChange :change-lang="'fr'" :lang-title="'Français'" />
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
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
