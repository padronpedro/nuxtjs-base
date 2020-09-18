import Vue from 'vue'

// filters
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

/**
 * Display snackbar message
 * snack: {
        text: '',
        color: '',
        snackbar: false
      }
 */
Vue.prototype.$showMessage = function (message, color, timeout, thisModel) {
  thisModel.snackbar = true
  thisModel.text = message
  thisModel.color = color
  if (timeout) {
    setTimeout(() => {
      thisModel.snackbar = false
    }, timeout * 1000)
  }
}
