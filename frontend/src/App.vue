<template>
  <div>
    <Header />  
    <router-view />  
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,  
  },
};
</script>
<style>
body{
  background-color: #FBF6E9;
}
</style>
