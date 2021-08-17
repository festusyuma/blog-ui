<template>
  <div class='login-page'>
    <form class='login-form' @submit.prevent='register'>
      <div class='mb-5'>
        <input v-model='user.email' class='form-control' type='text' placeholder='Email' />
      </div>
      <div class='mb-3'>
        <input v-model='user.password' class='form-control' type='password' placeholder='password' />
      </div>
      <p class='my-2'>Have an account? <nuxt-link to='/login'>Login here</nuxt-link></p>
      <button type='submit' class='btn'>Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  auth: false,

  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async register() {
      await this.$store.dispatch('toggleLoading', true)

      try {
        const res = await this.$axios.post('auth/register', this.user)
        await this.$router.push('/login')
        this.$showAlert(res.data.message, 'success')
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
        } else window.console.log(e.message)
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
