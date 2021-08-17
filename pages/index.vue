<template>
  <div class='posts-page'>
    <AddPost @savedPost='fetchPosts' />
    <div class='posts'>
      <Post v-for='post in posts' :key='post.id' :post='post' />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
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
      await this.$store.dispatch('toggleLoading', true)

      try {
        const res = await this.$axios.$get('post')

        if (res.data) {
          const resData = res.data
          this.posts = resData.posts
          this.pagination.totalPages = resData.pagination.totalPages
          this.pagination.totalItems = resData.pagination.totalItems
        }

        await this.$store.dispatch('toggleLoading', false)
      } catch (e) {
        window.console.log(e)
        await this.$store.dispatch('toggleLoading', false)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.posts-page {
  padding: 1rem 3rem;
  .posts {
    margin-top: 2rem;
  }
}
</style>
