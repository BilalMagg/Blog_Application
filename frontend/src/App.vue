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
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>