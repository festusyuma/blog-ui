<template>
  <div class='twit-page'>

  </div>
</template>

<script>
export default {
  name: 'Id',
  methods: {
    async likePost() {
      await this.$store.dispatch('toggleLoading', true)

      try {
        await this.$axios.get(`post/${this.post.id}/like`)
        this.$emit('likedPost')
      } catch (e) {
        const response = e.response
        if (response) {
          if (response.status === 500) this.$showAlert('An error occurred', 'error')
          if (response.data) {
            this.$showAlert(response.data.message, 'error')
            if (response.status === 401) {
              if (this.$auth.loginWith) {
                await this.$auth.logout()
              }
            }
          }
        } else window.console.log(e.message)
        await this.$store.dispatch('toggleLoading', false)
      }
    },

    async comment() {

    },
  }
}
</script>

<style lang='scss' scoped>

</style>
