<template>
  <div>
    <BreadCrumbs :items="items" />
    <v-card-title>
      {{ $t('Manage users') }}
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" :label="$t('Search')" single-line hide-details></v-text-field>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/admin/users/x')">{{ $t('Add user') }}</v-btn>
    </v-card-title>
    {{ $auth.user }}
    <v-data-table
      :headers="headers"
      :items="usersList"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item.role_name="{ item }">
        {{ getRoleName(item) }}
      </template>
      <template v-slot:item.is_active="{ item }">
        <v-chip :color="item.is_active == '1' ? 'green' : 'red'" dark :test-id="item.email">{{
          item.is_active == '1' ? $t('Active') : $t('Disabled')
        }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom :color="'orange'">
          <template v-slot:activator="{ on }">
            <v-icon v-if="$userCan('EDITUSERS')" class="mr-2" :test-id="'AdmUserBtnEdit-' + item.email" v-on="on" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          </template>
          <span>{{ $t('Edit user') }}</span>
        </v-tooltip>
        <v-tooltip bottom :color="'orange'">
          <template v-slot:activator="{ on }">
            <v-icon v-if="$userCan('EDITUSERS')" class="mr-2" :test-id="'AdmUserBtnChgStatus-' + item.email" v-on="on" @click="statusItem(item)">
              mdi-sync
            </v-icon>
          </template>
          <span>{{ $t('Change status') }}</span>
        </v-tooltip>
        <v-tooltip bottom :color="'orange'">
          <template v-slot:activator="{ on }">
            <v-icon v-if="$userCan('DELETEUSERS')" :test-id="'AdmUserBtnDelete-' + item.email" v-on="on" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <span>{{ $t('Delete user') }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <SnackBar :text="snack.text" :color="snack.color" :snackbar="snack.snackbar" />
    <DialogConfirm ref="confirm" />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: 'Users',
  layout: 'admin',
  data() {
    return {
      options: {},
      totalItems: 0,
      loading: false,
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          goTo: '/admin/dashboard',
        },
        {
          text: 'Users',
          disabled: false,
          goTo: '/admin/users',
        },
      ],
      search: '',
      usersList: [],
      snack: {
        text: '',
        color: '',
        snackbar: false,
      },
    }
  },
  computed: {
    headers() {
      return [
        { text: this.$t('Name'), align: 'left', value: 'name' },
        { text: this.$t('Email'), value: 'email' },
        { text: this.$t('Role'), value: 'role_name', sortable: false },
        { text: this.$t('Status'), align: 'center', value: 'is_active', width: '10%' },
        { text: this.$t('Actions'), align: 'center', sortable: false, value: 'actions', width: '14%' },
      ]
    },
  },
  watch: {
    options: {
      handler() {
        this.getDataForTable()
      },
      deep: true,
    },
    search() {
      this.getDataForTable()
    },
  },
  methods: {
    getDataForTable() {
      const dataOptions = {
        offset: this.options.page,
        limit: this.options.itemsPerPage,
        sortBy: this.options.sortBy[0] || 'name',
        sortDesc: this.options.sortDesc[0] ? 'desc' : 'asc',
      }
      this.loading = true
      this.$axios
        .$get('api/user/datatable', { params: dataOptions })
        .then((response) => {
          if (response.status) {
            this.usersList = response.data.rows
            this.totalItems = response.data.count
          } else {
            this.$showMessage(response.data.message, '', 0, this.snack)
          }
          this.loading = false
        })
        .catch((error) => {
          error = ''
          this.loading = false
          this.$showMessage(this.$t('Error getting users data') + ': ' + error, '', 0, this.snack)
        })
    },
    getRoleName(item) {
      return item.Roles ? item.Roles[0].name.toUpperCase() : ''
    },
    editItem(item) {
      this.$router.push('/admin/users/' + item.id)
    },
    statusItem(item) {
      const dataOptions = {
        id: item.id,
      }
      this.$axios
        .post('api/user/changestatus', { params: dataOptions })
        .then((response) => {
          if (response.data.status) {
            this.getDataForTable()
          } else {
            this.$showMessage(response.data.message, '', 0, this.snack)
          }
        })
        .catch((error) => {
          this.$showMessage(this.$t('Error changing users status') + ': ' + error, '', 0, this.snack)
        })
    },
    deleteItem(item) {
      this.$refs.confirm
        .open(this.$t('Delete a user'), this.$t('Do you want to delete the user: ' + item.name + ' ?'), { color: 'red', width: '500' })
        .then((confirm) => {
          if (confirm) {
            this.$showMessage(this.$t('Deleting user. wait a moment please'), 'success', 3, this.snack)
            this.$axios
              .delete('api/user/' + item.id, {})
              .then((response) => {
                if (response.data.status) {
                  this.$showMessage(this.$t('User successfully removed'), 'success', 3, this.snack)
                  this.getDataForTable()
                } else {
                  this.$showMessage(response.data.message, '', 0, this.snack)
                }
              })
              .catch((error) => {
                this.$showMessage(this.$t('Error deleting user') + ': ' + error, '', 0, this.snack)
              })
          }
        })
    },
  },
}
</script>

<style></style>
