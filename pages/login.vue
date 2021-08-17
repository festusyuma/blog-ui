<template>
  <div class='login-page'>
    <form class='login-form' @submit.prevent='login'>
      <div class='mb-5'>
        <input v-model='user.email' class='form-control' type='text' placeholder='Email' />
      </div>
      <div class='mb-5'>
        <input v-model='user.password' class='form-control' type='password' placeholder='password' />
      </div>
      <button type='submit' class='btn'>Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: 'festusyuma@gmail.com',
        password: 'fidelias'
      }
    }
  },

  methods: {
    async login() {
      await this.$store.dispatch('toggleLoading', true)

      try {
        await this.$auth.login({ data: this.user })
        await this.$router.push('/')
        await this.$store.dispatch('toggleLoading', false)
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
        }
        window.console.log(e.message)
        await this.$store.dispatch('toggleLoading', false)
      }
    }
  },
}
</script>

<style lang='scss' scoped>
@import "~@/assets/scss/variables";

.login-page {
  padding: 2rem 3rem;
  .login-form {
    background: #ffffff;
    box-shadow: $box-shadow;
    border-radius: 10px;
    padding: 4rem 3rem;
  }
}
</style>
