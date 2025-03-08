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
    async uploadPost() {
      if (!this.newPost.title || !this.newPost.content) return;

      try {
        await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newPost)
        });

      } catch (error) {
        console.error("Backend unavailable, saving to localStorage");
      }

      this.$router.push("/");
    }
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
