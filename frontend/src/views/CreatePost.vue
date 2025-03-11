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
import axios from "axios";

export default {
  name: "CreatePost",
  data() {
    return {
      newPost: { id: null, title: "", content: "" },
      isEditing: false
    };
  },
  methods: {
    async uploadPost() {
      if (!this.newPost.title || !this.newPost.content) return;

      try {
        if (this.isEditing) {
          await axios.put(`http://localhost:3000/posts/${this.newPost.id}`, this.newPost);
        } else {
          await axios.post("http://localhost:3000/posts", this.newPost);
        }
      } catch (error) {
        console.error("Failed to save post:", error);
      }

      this.$router.push("/");
    },

    loadPostToEdit() {
      const postId = this.$route.params.id;
      if (postId) {
        axios.get(`http://localhost:3000/posts/${postId}`)
          .then(response => {
            this.newPost = response.data;
            this.isEditing = true;
          })
          .catch(() => console.error("Failed to load post"));
      }
    }
  },

  mounted() {
    this.loadPostToEdit();
  }
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
  background: green;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}
</style>
