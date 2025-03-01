<template>
  <div class="home-container">
    <h1 class="home-title">Blog Posts</h1>
    <PostItem 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
      @edit="handleEdit" 
      @delete="handleDelete"
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
    //  Redirect user to edit post page
    handleEdit(post) {
      this.$router.push(`/edit/${post.id}`); 
    },

    //  Remove post from UI and local storage
    handleDelete(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
      localStorage.setItem("posts", JSON.stringify(this.posts)); 
    },

    /*
     Backend Method: Fetch posts from database
    async fetchPosts() {
      try {
        const response = await fetch("https://your-api.com/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        this.posts = await response.json(); // ✅ Load posts from backend
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    */

    /*
     Backend Method: Edit a post in database
    async handleEdit(post) {
      try {
        const response = await fetch(`https://your-api.com/posts/${post.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: post.title, content: post.content })
        });
        if (!response.ok) throw new Error("Failed to update post");

        const updatedPost = await response.json();
        this.posts = this.posts.map(p => (p.id === updatedPost.id ? updatedPost : p));
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
    */

    /*
     Backend Method: Delete post from database
    async handleDelete(postId) {
      try {
        const response = await fetch(`https://your-api.com/posts/${postId}`, {
          method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete post");

        this.posts = this.posts.filter(post => post.id !== postId); // ✅ Remove from UI
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
    */
  },

  //  Load posts from backend when component is mounted
  /*
  mounted() {
    this.fetchPosts();
  }
  */
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
  font-size: 28px;
  font-weight: bold;
  color: green; 
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 0;
  border-bottom: 3px solid var(--main_green);
  display: inline-block;
  margin-bottom: 20px;
}
</style>
