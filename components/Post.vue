<template>
  <div v-if='post' class='twit' @click='goToTwit'>
    <p>{{ post.post }}</p>
    <div class='details d-flex'>
      <div class='detail'>{{ post.totalLikes }} likes</div>
      <div class='detail'>{{ post.totalComments }} comments</div>
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
      margin: 0 0.25rem;
      color: $primary;
      font-size: 0.85rem;
    }
  }
}

.twit:hover {
  cursor: pointer;
}
</style>
