<template>
  <div class="post">
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    <PostMenu @edit="$emit('edit', post)" @delete="$emit('delete', post.id)" />
  </div>
</template>

<script>
import PostMenu from "./PostMenu.vue";

export default {
  props: ["post"],
  components: { PostMenu }
};
</script>

<style scoped>
.post { padding: 15px; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 5px; }
</style>
