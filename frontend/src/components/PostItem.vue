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
      <div v-for="(comment, index) in comments" :key="index" class="comment">
        <p>{{ comment }}</p>
      </div>
      <input v-model="newComment" type="text" placeholder="Write a comment..." @keyup.enter="addComment" />
      <button @click="addComment">Add Comment</button>
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
      showComments: false,
      newComment: "",
      comments: JSON.parse(localStorage.getItem(`comments-${this.post.id}`)) || [],
      likes: JSON.parse(localStorage.getItem(`likes-${this.post.id}`)) || 0,
      dislikes: JSON.parse(localStorage.getItem(`dislikes-${this.post.id}`)) || 0,
      userVote: JSON.parse(localStorage.getItem(`vote-${this.post.id}`)) || 0
    };
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },

    async addComment() {
      if (!this.newComment.trim()) return;
      this.comments.push(this.newComment);
      localStorage.setItem(`comments-${this.post.id}`, JSON.stringify(this.comments));

      try {
        await fetch(`http://localhost:3000/posts/${this.post.id}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: this.newComment })
        });
      } catch (error) {
        console.error("Backend unavailable, comment saved in localStorage");
      }

      this.newComment = "";
    },

    async vote(value) {
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

      localStorage.setItem(`vote-${this.post.id}`, JSON.stringify(this.userVote));
      localStorage.setItem(`likes-${this.post.id}`, JSON.stringify(this.likes));
      localStorage.setItem(`dislikes-${this.post.id}`, JSON.stringify(this.dislikes));

      try {
        await fetch(`http://localhost:3000/posts/${this.post.id}/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vote: this.userVote })
        });
      } catch (error) {
        console.error("Backend unavailable, vote saved in localStorage");
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
