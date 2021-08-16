<template>
  <div class='add-post-form'>
    <form>
      <textarea class='add-post-input' placeholder='Add new post' maxlength='500'></textarea>
      <div class='d-flex'>
        <button class='btn btn-primary ms-auto' type='submit'>POST</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddPost'
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
  }
}
</style>
