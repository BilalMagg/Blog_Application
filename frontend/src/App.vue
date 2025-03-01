<template>


  <div>
    <!-- Navigation Bar (Includes Create Post Button) -->
    <NavBar />

    <!-- Dynamic View -->
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
};
</script>

<style>
body {
  background-color: #FBF6E9;
<<<<<<< HEAD
  margin: 0;
  font-family: Arial, sans-serif;
=======
}

.nav-bar {
  display: flex;
  justify-content: flex-end;
  padding: 15px 20px;
}

.nav-link {
  font-size: 18px;
  font-weight: bold;
  color: green;
  text-decoration: none;
  padding: 10px 15px;
}

.nav-link:hover {
  text-decoration: underline;
>>>>>>> fbdbc97 (added comments and votes to each post still no database integration)
}
</style>
