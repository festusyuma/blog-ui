<template>
<div class='default-layout'>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">Twitee</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <form class="d-flex mx-auto">
          <input class="form-control search-input" type="search" placeholder="Search" aria-label="Search">
        </form>
        <ul v-if='$auth.loggedIn' class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#">{{ $auth.user.name }}</a>
          </li>
          <li class="nav-item">
            <button class="btn btn-inverse" type="submit" @click='logout'>logout</button>
          </li>
        </ul>
        <ul v-else class="navbar-nav mb-2 mb-lg-0">
          <nuxt-link to="/login" class="nav-item">
            <button class="btn btn-inverse me-4" type="submit">Login</button>
          </nuxt-link>
          <nuxt-link to="/register" class="nav-item">
            <button class="btn btn-inverse" type="submit">Register</button>
          </nuxt-link>
        </ul>
      </div>
    </div>
  </nav>
  <div class='row'>
    <div class='col-md-8 mx-auto'>
      <div class='container'>
        <Nuxt/>
      </div>
    </div>
  </div>
  <div v-if="loading" class="loading-page">
    <div class="loading"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Default',
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        await this.$router.push('/login')
      } catch (e) {
        window.console.log(e)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.navbar {
  padding: 1.25rem 0;

  .search-input {
    width: 30rem;
    max-width: 1000%;
  }
}
</style>
