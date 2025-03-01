<template>
  <div class="post">
    <!-- Post Header (Title + Menu) -->
    <div class="post-header">
      <h3 class="post-title">{{ post.title }}</h3>
      <PostMenu @edit="editPost" @delete="deletePost" />
    </div>

    <hr class="divider" />
    <p class="post-content">{{ post.content }}</p>

    <!-- Votes Section -->
    <div class="votes">
      <button @click="vote(1)" :class="{ active: post.userVote === 1 }">👍 {{ post.votes }}</button>
      <button @click="vote(-1)" :class="{ active: post.userVote === -1 }">👎</button>
    </div>

    <!-- Show Comments Button -->
    <button class="toggle-comments-btn" @click="toggleComments">
      {{ showComments ? "Hide Comments" : "Show Comments" }}
    </button>

    <!-- Comments Section (Hidden by Default) -->
    <div v-if="showComments" class="comments-section">
      <h4>Comments</h4>
      <div v-for="comment in post.comments" :key="comment.id" class="comment">
        <p><strong>{{ comment.username }}:</strong> {{ comment.content }}</p>
      </div>

      <!-- Add Comment -->
      <div class="add-comment">
        <input v-model="newComment" placeholder="Write a comment..." />
        <button @click="addComment">💬 Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import PostMenu from "./PostMenu.vue";

export default {
  props: ["post"],
  components: { PostMenu },
  data() {
    return {
      newComment: "",
      showComments: false,
    };
  },
  methods: {
    editPost() {
      this.$emit("edit", this.post);
    },
    deletePost() {
      this.$emit("delete", this.post.id);
    },
    vote(value) {
      if (this.post.userVote === value) {
        this.post.votes -= value;
        this.post.userVote = 0;
      } else {
        this.post.votes += value - (this.post.userVote || 0);
        this.post.userVote = value;
      }
      this.$emit("update", this.post);
    },
    toggleComments() {
      this.showComments = !this.showComments;
    },
    addComment() {
      if (!this.newComment.trim()) return;
      const newComment = {
        id: Date.now(),
        username: "Guest",
        content: this.newComment,
      };
      this.post.comments.push(newComment);
      this.newComment = "";
      this.$emit("update", this.post);
    },
  },
};
</script>

<style scoped>
:root {
  --main-green: #118b50;
  --main-light: #e3f0af;
  --main-dark: #fbf6e9;
}

.post {
  position: relative;
  max-width: 650px;
  width: 90%;
  margin: 20px auto;
  padding: 20px;
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


.post-header .menu {
  position: relative;
  margin-left: auto;
}


.divider {
  border: none;
  height: 2px;
  background-color: green;
  margin: 10px 0;
}

/* Post Content */
.post-content {
  font-size: 16px;
  color: #444;
  line-height: 1.6;
  text-align: justify;
}

/* Votes */
.votes {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.votes button {
  background: none;
  border: 1px solid gray;
  padding: 5px 10px;
  cursor: pointer;
}

.votes button.active {
  background: green;
  color: white;
}


.toggle-comments-btn {
  margin-top: 10px;
  background: none;
  border: 1px solid green;
  color: green;
  padding: 5px 10px;
  cursor: pointer;
}

.toggle-comments-btn:hover {
  background: green;
  color: white;
}


.comments-section {
  margin-top: 15px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
}

.comment {
  background: white;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
  border: 1px solid #ddd;
}


.add-comment {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.add-comment input {
  width: 80%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.add-comment button {
  background: green;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
</style>
