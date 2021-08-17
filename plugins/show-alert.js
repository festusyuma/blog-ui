export default ({ app }, inject) => {
  const showAlert = function (msg, type) {
    this.$toasted.show(msg, {
      type,
      closeOnSwipe: true,
      duration: 5000,
    })
  }

  inject('showAlert', showAlert)
}
