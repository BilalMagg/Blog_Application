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
.menu {
  position: relative;
  display: inline-block;
}

.menu-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.menu-options {
  position: absolute;
  right: 0;
  background-color: green;
  color: white;
  border: 1px solid #ddd;
  list-style: none;
  padding: 5px;
}

.menu-options li {
  padding: 5px;
  cursor: pointer;
}

.menu-options li:hover {
  background: #f0f0f0;
}
</style>
