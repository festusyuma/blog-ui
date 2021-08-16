<template>
  <div class='login-page'>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: 'festusyuma@gmail.com',
        password: 'fidelia'
      }
    }
  },

  async fetch () {
    await this.login()
  },

  methods: {
    async login() {
      const res = await this.$auth.login({ data: this.user })
      window.location.log(res)
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
