<template>
  <div class="post">
    <div class="post-header">
      <h3>{{ post.title }}</h3>
      <PostMenu @edit="$emit('edit', post)" @delete="$emit('delete', post.id)" />
    </div>
    <p>{{ post.content }}</p>
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
:root{
  --main_green:#118B50;
  --main_lime:#E3F0AF;
  --main_dar:#FBF6E9;
}

.post {
  position: relative;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: white;
}


.post-header {
  display: flex;
  justify-content: space-between;  
  align-items: top;
  position: relative;
  width: 100%;
}
</style>