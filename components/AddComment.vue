<template>
  <div class='add-comment-form'>
    <form @submit.prevent='addComment'>
      <textarea
        v-model='comment'
        class='add-comment-input'
        placeholder='Add new comment'
        maxlength='500'>
      </textarea>
      <div class='d-flex'>
        <button class='btn ms-auto' type='submit'>Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddComment',
  props: {
    postId: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      comment: '',
    }
  },

  methods: {
    async addComment() {
      await this.$store.dispatch('toggleLoading', true)
      if (this.comment.trim() === '') {
        this.$showAlert('Comment cannot be empty', 'error')
        return
      }

      try {
        const res = await this.$axios.$post(`post/${this.postId}/comment`, { comment: this.comment })
        this.$showAlert(res.message, 'success')
        this.$emit('savedComment')
        this.comment = ''
      } catch (e) {
        window.console.log(e)
        await this.$store.dispatch('toggleLoading', false)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~assets/scss/variables';

.add-comment-form {
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;

  .add-comment-input {
    background: $backgroundPrimary;
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 0.5px solid $primary;
    resize: none;
    min-height: 5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
