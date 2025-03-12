<template>
  <div>
    <NavBar />
  </div>

  <div class="page">
    <!-- Navigation Bar (Includes Create Post Button) -->
    <SideBar />
      <!-- Dynamic View -->
    <router-view/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: { NavBar,
    SideBar
   },
};
</script>

<style>
body {
  background-color: #FBF6E9;
  margin: 0;
  font-family: Arial, sans-serif;
}

.page{
  display: grid;
  grid-template-columns: 300px 1fr;
}
</style>

