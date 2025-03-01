<template>
  <div class="home-container">
    <h1 class="home-title">📖 Blog Posts</h1>
    <PostItem 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
      @edit="handleEdit" 
      @delete="handleDelete"
      @update="updatePost"
    />
  </div>
</template>

<script>
import PostItem from "../components/PostItem.vue";

export default {
  components: { PostItem },
  data() {
    return {
      posts: JSON.parse(localStorage.getItem("posts")) || []
    };
  },
  methods: {
    handleEdit(post) {
      this.$router.push(`/edit/${post.id}`);
    },
    handleDelete(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
    updatePost(updatedPost) {
      this.posts = this.posts.map(post => (post.id === updatedPost.id ? updatedPost : post));
      localStorage.setItem("posts", JSON.stringify(this.posts));
    }
  },
};
</script>
<style scoped>

.home-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}


.home-title {
  font-size: 32px;
  font-weight: bold;
  color: #118b50;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 15px;
  margin-bottom: 20px;
  background: white;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 4px solid #118b50;
}
</style>
