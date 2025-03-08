<template>
    <div class="user-page">
      <h1>Welcome, {{ username }} to your blog!</h1>
      <router-link to="/create">
      <button class="create-post-btn">Create Post</button>
    </router-link>
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @edit="editPost"
        @delete="deletePost"
      />
    </div>
  </template>
  
  <script>
 import PostItem from "@/components/PostItem.vue";
 
  
  export default {
    props: ["username"],
    components: { PostItem,  },
    data() {
      
    },
    methods: {
      editPost(post) {
        const newTitle = prompt("Edit post title:", post.title);
        if (newTitle !== null) {
          post.title = newTitle;
        }
      },
      deletePost(postId) {
        this.posts = this.posts.filter(post => post.id !== postId);
      }
    }
  };
  </script>
  
  <style scoped>
  .user-page {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #FBF6E9;
    border-radius: 10px;
  }
  
  h1 {
    text-align: center;
    color: #118B50;
  }
  button {
    border-radius: 20px;
    border: 1px solid #009345;
    background-color: #009345;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    margin: 50px auto;
    margin-left: 200px;
    
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;

    &:active {
      transform: scale(.9);
    }

    &:focus {
      outline: none;
    }
  }
  </style>
  