<template>
  <div>
    <h1>Blog Posts</h1>
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
      posts: []  
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

    
    /*
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
    async handleEdit(post) {
      try {
        const response = await fetch(https://your-api.com/posts/${post.id}, {
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
async handleDelete(postId) {
  try {
    const response = await fetch(https://your-api.com/posts/${postId}, {
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

  
  /*
  mounted() {
    this.fetchPosts();
  }
  */

  
  mounted() {
    this.posts = JSON.parse(localStorage.getItem("posts")) || [];
  }
};
</script>

<style scoped>

h1 { text-align: center; }
</style>