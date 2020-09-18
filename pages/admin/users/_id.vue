<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="12">
          <v-card :elevation="4">
            <v-toolbar dense flat>
              <BreadCrumbs :items="itemsBc" />
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
              <v-form ref="form" lazy-validation>
                <Divider :txt-divider="$t('Account information')"></Divider>
                <v-row>
                  <Column>
                    <v-text-field
                      v-model="email"
                      :label="$t('Email')"
                      required
                      :rules="[(v) => !!v || $t('This field is required'), (v) => /.+@.+\..+/.test(v) || $t('E-mail must be valid')]"
                      name="email"
                    >
                    </v-text-field>
                  </Column>
                  <Column>
                    <v-text-field
                      v-model="password"
                      :label="$t('Password')"
                      type="password"
                      name="password"
                      :rules="[(v) => !!v || $t('This field is required'), (v) => v.length >= 8 || $t('Min 8 characters')]"
                      required
                    >
                    </v-text-field>
                  </Column>
                  <Column>
                    <v-text-field v-model="name" :label="$t('Name')" required :rules="[(v) => !!v || $t('This field is required')]" name="name">
                    </v-text-field>
                  </Column>
                </v-row>
                <v-row>
                  <Column>
                    <v-select
                      v-model="role_id"
                      :items="rolesItems"
                      required
                      item-text="name"
                      item-value="id"
                      :rules="[(v) => !!v || $t('This field is required')]"
                      :label="$t('Role')"
                    >
                    </v-select>
                  </Column>
                  <Column>
                    <v-select
                      v-model="permissions"
                      :items="permissionsItems"
                      :label="$t('Permissions')"
                      multiple
                      :height="32"
                      chips
                      :item-text="(item) => item.name.replace('_', ' ')"
                      item-value="id"
                      :hint="$t('Select the permissions for this user')"
                      persistent-hint
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index === 0 || index === 1" small>
                          <span>{{ item.name }}</span>
                        </v-chip>
                        <span v-if="index === 2" class="grey--text caption">(+{{ permissions.length - 2 }} {{ $t('others') }})</span>
                      </template>
                    </v-select>
                  </Column>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="validate">{{ editMode ? $t('Update') : $t('Save') }}</v-btn>
              <v-btn text @click="goBack">{{ $t('Back') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <SnackBar :text="snack.text" :color="snack.color" :snackbar="snack.snackbar" />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'AddEditUser',
  middleware: 'auth',
  layout: 'admin',
  data() {
    return {
      itemsBc: [
        {
          text: this.$t('Dashboard'),
          disabled: false,
          goTo: '/dashboard',
        },
        {
          text: this.$t('Users'),
          disabled: false,
          goTo: '/admin/users',
        },
        {
          text: this.$t('Edit User'),
          disabled: true,
          goTo: '',
        },
      ],
      snack: {
        text: '',
        color: '',
        snackbar: false,
      },
      name: '',
      email: '',
      password: '',
      editMode: true,
      userId: '',
      role_id: '',
      rolesItems: [],
      permissionsItems: [],
      permissions: '',
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.$axios
        .$get('/api/role/all', {})
        .then((response) => {
          if (response.status) {
            this.rolesItems = response.data
          }
        })
        .catch((error) => {
          error = ''
        })
      this.$axios
        .$get('/api/permission/all', {})
        .then((response) => {
          if (response.status) {
            this.permissionsItems = response.data
            this.permissionsItems = this.permissionsItems.map((item) => {
              return {
                id: Number(item.id),
                name: item.name.replace(/([A-Z])/g, ' $1'),
              }
            })
          }
        })
        .catch((error) => {
          error = ''
        })

      if (this.$route.params && !isNaN(this.$route.params.id)) {
        this.userId = this.$route.params.id
        this.getUserData()
      } else {
        this.itemsBc[2].text = this.$t('Add User')
        this.editMode = false
      }
      this.getRoles()
    })
  },
  methods: {
    getRoles() {
      this.$axios
        .$get('/api/role/all', {})
        .then((response) => {
          if (response.status) {
            this.rolesItems = response.data
          }
        })
        .catch((error) => {
          error = ''
        })
    },
    getUserData() {
      this.$axios
        .$get('/api/user/' + this.userId, {})
        .then((response) => {
          if (response.status) {
            this.name = response.data.name
            this.email = response.data.email
            this.password = '12345678'
            // get role
            if (response.data.Roles) {
              if (response.data.Roles.length > 0) {
                this.role_id = response.data.Roles[0].id
              }
            }
            if (response.data.Permissions) {
              this.permissions = response.data.Permissions.map((item) => {
                return Number(item.id)
              })
            }
          } else {
            this.$showMessage(response.message, '', 0, this.snack)
            setTimeout(() => {
              this.$router.push('/admin/users')
            }, 2000)
          }
        })
        .catch((error) => {
          this.$showMessage(this.$t('Error getting user data') + ': ' + error, '', 0, this.snack)
        })
    },
    goBack() {
      this.$router.push('/admin/users')
    },
    validate() {
      if (this.$refs.form.validate()) {
        const dataOptions = {
          name: this.name,
          email: this.email,
          password: this.password,
          role_id: this.role_id,
          permissions: this.permissions,
        }

        if (!this.editMode) {
          this.$axios
            .$post('/api/user', { params: dataOptions })
            .then((response) => {
              if (response.status) {
                this.$showMessage(this.$t('User successfully added'), 'success', 3, this.snack)
                setTimeout(() => {
                  this.$router.push('/admin/users')
                }, 3000)
              } else {
                this.$showMessage(response.message, '', 2, this.snack)
              }
            })
            .catch((error) => {
              this.$showMessage(this.$t('Error getting user data') + ': ' + error, '', 0, this.snack)
            })
        } else {
          this.$axios
            .$put('/api/user/' + this.userId, { params: dataOptions })
            .then((response) => {
              if (response.status) {
                this.$showMessage(this.$t('User successfully modified'), 'success', 3, this.snack)
                setTimeout(() => {
                  this.$router.push('/admin/users')
                }, 3000)
              } else {
                this.$showMessage(response.message, '', 0, this.snack)
              }
            })
            .catch((error) => {
              this.$showMessage(this.$t('Error getting user data') + ': ' + error, '', 0, this.snack)
            })
        }
      } else {
        this.$showMessage(this.$t('Please complete the required fields'), '', 2, this.snack)
      }
    },
  },
}
</script>
