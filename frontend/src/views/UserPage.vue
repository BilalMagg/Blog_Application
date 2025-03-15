<template>
  <div class="user-page">
    <!-- Left Side: User Information -->
    <div class="user-info">
      <h2>Account Information</h2>
      <div class="info-item">
        <span class="label">Username:</span>
        <span class="value">{{ username }}</span>
      </div>
      <div class="info-item">
        <span class="label">Creation Date:</span>
        <span class="value">{{ creationDate }}</span>
      </div>
      <div class="info-item">
        <span class="label">Upvotes:</span>
        <span class="value">{{ upvotes }}</span>
      </div>
      <div class="info-item">
        <span class="label">Downvotes:</span>
        <span class="value">{{ downvotes }}</span>
      </div>
    </div>

    <!-- Right Side: User Posts -->
    <div class="user-posts">
      <h1>Welcome, {{ username }} to your blog!</h1>
      <router-link to="/create">
        <button class="create-post-btn">Create Post</button>
      </router-link>
      <div v-if="posts.length > 0">
        <PostItem
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @edit="editPost"
          @delete="deletePost"
        />
      </div>
      <div v-else>
        <p>No posts found. Create your first post!</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
import axios from "axios";

export default {
  components: { PostItem },
  data() {
    return {
      username: "", // Stores the username
      creationDate: "", // Stores the account creation date
      upvotes: 0, // Stores the total upvotes
      downvotes: 0, // Stores the total downvotes
      posts: [], // Stores the user's posts
    };
  },
  async created() {
    // Fetch user info and posts when the component is created
    await this.fetchUserInfo();
    await this.fetchUserPosts();
  },
  methods: {
    // Fetch user info from the backend
    async fetchUserInfo() {
      try {
        const response = await axios.get("http://localhost:3000/api/user-info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          this.username = response.data.username;
          this.creationDate = response.data.creationDate;
          this.upvotes = response.data.upvotes;
          this.downvotes = response.data.downvotes;
        } else {
          console.error("Failed to fetch user info:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },

    // Fetch user posts from the backend
    async fetchUserPosts() {
      try {
        const response = await axios.get("http://localhost:3000/api/user-posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          this.posts = response.data.posts;
        } else {
          console.error("Failed to fetch posts:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async fetchUsernameByEmail(email) {
  try {
    // Send a GET request to the backend to fetch the username by email
    const response = await axios.get("http://localhost:3000/api/get-username-by-email", {
      params: { email }, // Pass the email as a query parameter
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token
      },
    });

    // Check if the request was successful
    if (response.data.success) {
      return response.data.username; // Return the username
    } else {
      console.error("Failed to fetch username:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    return null;
  }
},

    // Edit a post
    editPost(post) {
      const newTitle = prompt("Edit post title:", post.title);
      if (newTitle !== null) {
        post.title = newTitle;
      }
    },

    // Delete a post
    deletePost(postId) {
      this.posts = this.posts.filter((post) => post.id !== postId);
    },
  },
};
</script>

<style scoped>
.user-page {
  display: flex;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #fbf6e9;
  border-radius: 10px;
  gap: 20px; /* Space between user info and posts */
}

/* Left Side: User Information */
.user-info {
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-info h2 {
  font-size: 1.5rem;
  color: #009345;
  margin-bottom: 20px;
  text-align: center;
}

.info-item {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.value {
  color: #555;
}

/* Right Side: User Posts */
.user-posts {
  flex: 3;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-posts h1 {
  text-align: center;
  color: #118b50;
  margin-bottom: 20px;
}

.create-post-btn {
  border-radius: 20px;
  border: 1px solid #009345;
  background-color: #009345;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.1s ease-in;
}

.create-post-btn:active {
  transform: scale(0.9);
}

.create-post-btn:focus {
  outline: none;
}
</style>