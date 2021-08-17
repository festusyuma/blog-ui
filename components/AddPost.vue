<template>
  <div class='add-post-form'>
    <form @submit.prevent='addPost'>
      <textarea
        v-model='post'
        class='add-post-input'
        placeholder='Add new post'
        maxlength='500'>
      </textarea>
      <div class='d-flex'>
        <button class='btn ms-auto' type='submit'>Post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddPost',
  data () {
    return {
      post: ''
    }
  },

  methods: {
    async addPost() {
      await this.$store.dispatch('toggleLoading', true)
      if (this.post.trim() === '') {
        this.$showAlert('Post cannot be empty', 'error')
        await this.$store.dispatch('toggleLoading', false)
        return
      }

      try {
        await this.$axios.$post('post', { post: this.post })
        this.$showAlert('Successfully added post', 'success')
        this.$emit('savedPost')
        this.post = ''
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

.add-post-form {
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;

  .add-post-input {
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
