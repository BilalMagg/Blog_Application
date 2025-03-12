<template>
  <div class="post">
    <div class="post-header">
      <h3 class="post-title">{{ post.title }}</h3>
      <PostMenu @edit="$emit('edit', post)" @delete="$emit('delete', post.id)" />
    </div>
    <hr class="divider" />
    <p class="post-content">{{ post.content }}</p>

    <!-- Like & Dislike Buttons -->
    <div class="vote-section">
      <button @click="vote(1)" :class="{ active: userVote === 1 }">👍 {{ likes }}</button>
      <button @click="vote(-1)" :class="{ active: userVote === -1 }">👎 {{ dislikes }}</button>
    </div>

    <!-- Toggle Comments Button -->
    <button class="toggle-comments" @click="toggleComments">
      {{ showComments ? "Hide Comments" : "View Comments" }} ({{ comments.length }})
    </button>

    <!-- Comments Section -->
    <div v-if="showComments" class="comments-section">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <p><strong>{{ comment.username || "Anonymous" }}:</strong> {{ comment.content }}</p>
      </div>
      <input v-model="newComment" type="text" placeholder="Write a comment..." @keyup.enter="addComment" />
      <button @click="addComment">Add Comment</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostMenu from "./PostMenu.vue";

export default {
  props: ["post"],
  components: { PostMenu },
  data() {
    return {
      showComments: false,
      newComment: "",
      comments: [],
      likes: this.post.likes || 0,
      dislikes: this.post.dislikes || 0,
      userVote: 0
    };
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
      if (this.showComments) this.fetchComments();
    },

    async fetchComments() {
      try {
        const response = await axios.get(`http://localhost:3000/post/${this.post.id}`);
        this.comments = response.data;
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    },

    async addComment() {
      if (!this.newComment.trim()) return;

      const user_id = localStorage.getItem("user_id") || "temp-user-123"; // Temporary user
      try {
        await axios.post(`http://localhost:3000/post/${this.post.id}/user/${user_id}`, {
          content: this.newComment
        });
        this.comments.push({ content: this.newComment, username: "Anonymous" });
        this.newComment = "";
      } catch (error) {
        console.error("Failed to save comment:", error);
      }
    },

    async vote(value) {
      const user_id = localStorage.getItem("user_id") || "temp-user-123";

      try {
        await axios.post("http://localhost:3000/votes", {
          user_id,
          post_id: this.post.id,
          vote: value
        });

        // Update UI
        if (this.userVote === value) {
          this.userVote = 0;
          value === 1 ? this.likes-- : this.dislikes--;
        } else {
          if (this.userVote !== 0) {
            this.userVote === 1 ? this.likes-- : this.dislikes--;
          }
          this.userVote = value;
          value === 1 ? this.likes++ : this.dislikes++;
        }
      } catch (error) {
        console.error("Failed to save vote:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Post Styling */
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
  text-align: left;
}
.post:hover {
  transform: translateY(-2px);
}

/* Post Header */
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Title Styling */
.post-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 0;
  padding-bottom: 5px;
}

/* Divider */
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
  text-align: left;
}

/* Like & Dislike Buttons */
.vote-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.vote-section button {
  background: none;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.vote-section button:hover {
  background: #eee;
}
.vote-section .active {
  background: green;
  color: white;
  border: 1px solid darkgreen;
}

/* Comments Section */
.comments-section {
  margin-top: 15px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.comment {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}
.comment:last-child {
  border-bottom: none;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-top: 5px;
  padding: 6px 10px;
  border: none;
  background: green;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background: darkgreen;
}
.toggle-comments {
  margin-top: 10px;
  background: transparent;
  color: green;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.toggle-comments:hover {
  text-decoration: underline;
}
</style>
