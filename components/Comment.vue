<template>
  <div v-if='comment' class='comment'>
    <div v-if='comment.User.id === $auth.user.id' class='d-flex detail' @click='deleteComment'>
      <i class="fas fa-trash ms-auto text-danger mb-2"></i>
    </div>
    <p class='content'>{{ comment.comment }}</p>
    <div class='details d-flex'>
      <div class='detail ms-auto name'>From {{ comment.User.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      default: null
    },
  },

  methods: {
    async deleteComment() {
      await this.$store.dispatch('toggleLoading', true)

      try {
        const res = await this.$axios.delete(`post/comment/${this.comment.id}`)
        this.$showAlert(res.data.message, 'success')
        this.$emit('deletedComment')
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

.comment {
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
</style>
