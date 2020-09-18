import Vue from 'vue'

/**
 * Check if the user has permission to access something
 */
Vue.prototype.$userCan = function (accessThis) {
  if (this.$store.state.auth.user) {
    return this.$store.state.auth.user.permissions.find((item) => {
      return item === accessThis
    })
  } else {
    return false
  }
}

/**
 * Check user's role
 */
Vue.prototype.$userRole = function (thisRole) {
  if (this.$store.state.auth.user) {
    return this.$store.state.auth.user.roles.find((item) => {
      return item === thisRole
    })
  } else {
    return false
  }
}
