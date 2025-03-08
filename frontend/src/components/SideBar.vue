<template>
    <div class="side-bar-container">
      <li style="list-style-type: none;">
        <i class="fa-solid fa-magnifying-glass"></i> Search
      </li>
  
      <h3>MENU</h3>
      <ul>
        <li><i class="fa-solid fa-bars"></i> Questions</li>
        <li><i class="fa-solid fa-tag"></i> Tags</li>
        <li><i class="fa-solid fa-medal"></i> Ranking</li>
      </ul>
  
      <!-- Si l'utilisateur est connecté, afficher "Personal Navigator" -->
      <div v-if="isLoggedIn">
        <h3>PERSONAL NAVIGATOR</h3>
        <ul>
          <li><i class="fa-solid fa-circle-question"></i> Your questions</li>
          <li><i class="fa-solid fa-comment"></i> Your answers</li>
          <li><i class="fa-solid fa-heart"></i> Your like and votes</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Menu",
    data() {
      return {
        isLoggedIn: false, // Change à true pour simuler un utilisateur connecté
      };
    },
  };
  </script>
  
  <style scoped>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");
  
  :root {
    --BG-COLOR: #e3f0af;
    --HEADER-CLR: #808080;
  }
  
  ul {
    list-style-type: none;
  }
  
  .side-bar-container {
    font-family: Arial;
    background-color: var(--BG-COLOR);
  }
  
  h3 {
    font-size: 14px;
    margin-bottom: 10px;
    color: var(--HEADER-CLR);
  }
  
  li {
    padding: 10px;
    font-size: 16px;
    gap: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  li i {
    width: 20px;
    text-align: center;
  }
  
  li:hover,
  li:active {
    background-color: #fbf6e9;
    color: green;
    font-weight: bold;
  }
  </style>
  