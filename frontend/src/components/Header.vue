<template>
  <header class="header">
    <nav>
      <router-link to="/" class="logo">Home</router-link>
      <router-link to="/create" class="nav-link">Create Post</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #42b983;
  padding: 15px 20px;
}

nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.logo, .nav-link {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
