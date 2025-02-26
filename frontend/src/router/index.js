import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreatePost from "../views/CreatePost.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/create", component: CreatePost },
  { path: "/edit/:id", component: CreatePost } // ✅ Allows editing a post by ID
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

