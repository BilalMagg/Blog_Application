<template>
  <div>
    <nav class="nav-bar">
      <router-link to="/create" class="nav-link">➕Create Post</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  background-color: #FBF6E9;
}

.nav-bar {
  display: flex;
  justify-content: flex-start;
  padding: 15px 20px;
  
}

.nav-link {
  font-size: 20px;
  font-weight: bold;
  color: green;
  text-decoration: none;
  padding: 10px 15px;
  border-style: solid;
  background-color:white;
  border-color: white;
}

.nav-link:hover {
  text-decoration:dotted;
}
</style>
