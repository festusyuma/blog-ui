<template>
  <div v-if='post' class='twit'>
    <div v-if='post.User.id === $auth.user.id' class='d-flex detail' @click='deletePost'>
      <i class="fas fa-trash ms-auto text-danger mb-2"></i>
    </div>
    <p class='content' @click='goToTwit'>{{ post.post }}</p>
    <div class='details d-flex'>
      <div class='detail' @click='likePost'>
        <i v-if='post.liked' class="fas fa-heart text-danger"></i>
        <i v-else class="far fa-heart"></i>
        {{ post.totalLikes }} like<span v-if='post.totalLikes > 1'>s</span>
      </div>
      <div class='detail'>
        <i class="far fa-comment"></i>
        {{ post.totalComments }} comment<span v-if='post.totalComments > 1'>s</span>
      </div>
      <div class='detail ms-auto name'>By {{ post.User.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      default: null
    },
  },
  methods: {
    goToTwit() {
      this.$router.push(`/twit/${this.post.id}`)
    },

    async likePost() {
      await this.$store.dispatch('toggleLoading', true)

      try {
        const res = await this.$axios.get(`post/${this.post.id}/like`)
        this.$showAlert(res.data.message, 'success')
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

    async deletePost() {
      await this.$store.dispatch('toggleLoading', true)

      try {
        const res = await this.$axios.delete(`post/${this.post.id}`)
        this.$showAlert(res.data.message, 'success')
        this.$emit('deletedPost')
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
  },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/variables';

.twit {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: $box-shadow;

  .details {
    margin-top: 1rem;

    .detail {
      margin: 0 0.5rem;
      color: $primary;
      font-size: 0.85rem;
      display: flex;
      align-items: center;

      i {
        margin-right: 0.25rem;
      }

      span {
        color: $primary;
        font-size: 0.85rem;
      }
    }

    .detail:hover {
      cursor: pointer;
    }
  }

  .detail:hover {
    cursor: pointer;
  }
}

.twit:hover .content {
  cursor: pointer;
}
</style>
