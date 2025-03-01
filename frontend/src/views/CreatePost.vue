<template>
  <div class="create-post">
    <h1>{{ isEditing ? "Edit Post" : "Create a New Post" }}</h1>
    <form @submit.prevent="uploadPost">
      <input v-model="newPost.title" type="text" placeholder="Post Title" required />
      <textarea v-model="newPost.content" placeholder="Post Content" required></textarea>
      <button type="submit">{{ isEditing ? "Update Post" : "Upload" }}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  data() {
    return {
      newPost: { id: null, title: "", content: "" },
      isEditing: false
    };
  },
  methods: {
    uploadPost() {
      if (!this.newPost.title || !this.newPost.content) return;

      let posts = JSON.parse(localStorage.getItem("posts")) || [];

      if (this.isEditing) {
       
        posts = posts.map(post =>
          post.id === this.newPost.id ? this.newPost : post
        );
      } else {
       
        this.newPost.id = Date.now();
        posts.unshift(this.newPost);
      }

      localStorage.setItem("posts", JSON.stringify(posts));
      this.$router.push("/");
    },

    loadPostToEdit() {
      const postId = this.$route.params.id;
      if (postId) {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        const existingPost = posts.find(post => post.id == postId);
        if (existingPost) {
          this.newPost = { ...existingPost };
          this.isEditing = true;
        }
      }
    }
    /*
async uploadPost() {
  if (!this.newPost.title || !this.newPost.content) return;

  try {
    const response = await fetch("https://your-api.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.newPost)
    });

    if (!response.ok) throw new Error("Failed to upload post");

    const newPost = await response.json();
    console.log("Post uploaded:", newPost);

    this.$router.push("/"); // ✅ Redirect to homepage after posting
  } catch (error) {
    console.error("Error uploading post:", error);
  }
}
*/

/*
async uploadPost() {
  if (!this.newPost.title || !this.newPost.content) return;

  let apiUrl = "https://your-api.com/posts";
  let method = "POST"; // Default to creating a new post

  if (this.isEditing) {
    apiUrl = `https://your-api.com/posts/${this.newPost.id}`;
    method = "PUT"; // Change to updating a post
  }

  try {
    const response = await fetch(apiUrl, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.newPost)
    });

    if (!response.ok) throw new Error("Failed to save post");

    const savedPost = await response.json();
    console.log("Post saved:", savedPost);

    this.$router.push("/"); 
  } catch (error) {
    console.error("Error saving post:", error);
  }
}
*/


  },

  mounted() {
    this.loadPostToEdit(); }
};
</script>

<style scoped>
.create-post {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
input, textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
}
button {
  background: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}
</style>
