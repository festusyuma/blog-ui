export default function ({ $axios, store, $auth }) {
  $axios.defaults.headers.common['Content-Type'] = 'application/json'
  $axios.defaults.headers.common.Accept = 'application/json'
  window.console.log($auth)
}
