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
        posts = posts.map(post => post.id === this.newPost.id ? this.newPost : post);
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
