<template>
  <div class='container'>
    <div class='row'>
      <div class='col-md-8 mx-auto'>
        <AddPost />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      pagination: {
        page: 1,
        totalPages: 1,
        totalItems: 0
      },
    }
  },

  async fetch() {
    await this.fetchPosts()
  },

  methods: {
    async fetchPosts() {
      this.$showAlert('Started', 'success')
      try {
        const res = await this.$axios.get('post')
        window.console.log(res)
      } catch (e) {
        window.console.log(e)
      }
    }
  }
}
</script>
