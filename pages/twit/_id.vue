<template>
  <div v-if='post' class='twit-page'>
    <Post :post='post' @likedPost='fetchPost' @deletedPost='deletedPost' />
    <AddComment :post-id='post.id' @savedComment='fetchPost' />
    <div class='comments mt-2'>
      <Comment v-for='comment in post.Comments' :key='comment.id' :comment='comment' @deletedComment='fetchPost' />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Id',
  data() {
    return {
      post: null,
    }
  },

  async fetch() {
    await this.fetchPost()
  },

  methods: {
    async fetchPost() {
      const postId = this.$route.params.id
      await this.$store.dispatch('toggleLoading', true)

      try {
        const res = await this.$axios.$get(`post/${postId}`)

        if (res.data) {
          this.post = res.data
        }

        await this.$store.dispatch('toggleLoading', false)
      } catch (e) {
        window.console.log(e)
        await this.$store.dispatch('toggleLoading', false)
      }
    },

    async deletedPost() {
      await this.$router.push('/')
    }
  }
}
</script>

<style lang='scss' scoped>
.twit-page {
  padding: 3rem 2rem;
}
</style>
