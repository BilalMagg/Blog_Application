<template>

  <div class="home-container">
    <h1 class="home-title">📖 Blog Posts</h1>
<<<<<<< HEAD

=======
>>>>>>> fbdbc97 (added comments and votes to each post still no database integration)
    <PostItem 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
      @edit="handleEdit" 
      @delete="handleDelete"
<<<<<<< HEAD

      @update="updatePost"

=======
      @update="updatePost"
>>>>>>> fbdbc97 (added comments and votes to each post still no database integration)
    />
  </div>
</template>

<script>
import PostItem from "../components/PostItem.vue";

export default {
  components: { PostItem },
  data() {
    return {
<<<<<<< HEAD

      posts: []
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) throw new Error("Failed to fetch from backend");
        this.posts = await response.json();
      } catch (error) {
        console.error("Backend unavailable, using localStorage");
        this.posts = JSON.parse(localStorage.getItem("posts")) || [];
      }
    },

    handleEdit(post) {
      this.$router.push(`/edit/${post.id}`);
    },

    async handleDelete(postId) {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete post");
        this.posts = this.posts.filter(post => post.id !== postId);
      } catch (error) {
        console.error("Backend unavailable, deleting from localStorage");
        this.posts = this.posts.filter(post => post.id !== postId);
        localStorage.setItem("posts", JSON.stringify(this.posts));
      }
    },

=======
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
>>>>>>> fbdbc97 (added comments and votes to each post still no database integration)
    updatePost(updatedPost) {
      this.posts = this.posts.map(post => (post.id === updatedPost.id ? updatedPost : post));
      localStorage.setItem("posts", JSON.stringify(this.posts));
    }
  },
<<<<<<< HEAD

  mounted() {
    this.fetchPosts();
  }

=======
>>>>>>> fbdbc97 (added comments and votes to each post still no database integration)
};
</script>
<style scoped>
/* Container Styling */
.home-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

<<<<<<< HEAD
=======
/* Header (Blog Posts) */
>>>>>>> fbdbc97 (added comments and votes to each post still no database integration)
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
