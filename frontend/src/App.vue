<template>
  <div id="app">
   <NavBar /> 
    <h1>Bienvenue sur le Blog</h1>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 20px;
}
</style>
