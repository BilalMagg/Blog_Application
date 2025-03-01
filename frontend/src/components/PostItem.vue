<template>
  <div class="post">
    <div class="post-header">
      <h3 class="post-title">{{ post.title }}</h3>
      <PostMenu @edit="$emit('edit', post)" @delete="$emit('delete', post.id)" />
    </div>
    <hr class="divider" />
    <p class="post-content">{{ post.content }}</p>
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
:root {
  --main_green: #118B50;
  --main_lime: #E3F0AF;
  --main_dar: #FBF6E9;
}


.post {
  position: relative;
  max-width: 650px; 
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.post:hover {
  transform: translateY(-2px);
}


.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}


.post-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 0;
  padding-bottom: 5px;
}


.divider {
  border: none;
  height: 2px;
  background-color: green;
  margin: 10px 0;
}


.post-content {
  font-size: 16px;
  color: #444;
  line-height: 1.6;
  text-align: justify;
}
</style>
