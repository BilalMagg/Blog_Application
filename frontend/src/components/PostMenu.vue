<template>
  <div class="menu">
    <button @click="toggleMenu" class="menu-button">⋮</button>
    <ul v-if="menuOpen" class="menu-options">
      <li @click="$emit('edit')">Edit</li>
      <li @click="$emit('delete')">Delete</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { menuOpen: false };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style scoped>
:root{
  --main_green:#118B50;
  --main_lime:#E3F0AF;
  --main_dar:#FBF6E9;
}


.menu {
  position: relative;
  display: inline-block;
}


.menu-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  position: absolute;
  right: 0;
  top: -5px;
}


.menu-options {
  position: absolute;
  right: 0;
  background-color: black;
  border: 1px solid #ddd;
  list-style: none;
  padding: 5px;
  min-width: 80px;
  text-align: left;
  z-index: 10;
}

.menu-options li {
  padding: 5px;
  cursor: pointer;
  color: white;
}


.menu-options li:hover {
  background: #f0f0f0;
  color: black;
}
</style>
