<template>
  <div v-if='post' class='twit' @click='goToTwit'>
    <p>{{ post.post }}</p>
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
@import '~@/assets/scss/index';

.twit {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: $box-shadow;
}

.twit:hover {
  cursor: pointer;
}
</style>
