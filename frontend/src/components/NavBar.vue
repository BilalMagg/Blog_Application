<template>
  <nav class="navbar">
    <!-- Logo et nom -->
    <div class="logo-container">
      <router-link to="/" ><i class="fa-solid fa-house"  ></i></router-link>
    </div>
  

    <!-- Actions utilisateur -->
    <div class="actions">
      <template v-if="isAuthenticated">
      <!-- Bouton "Ask a question" -->
      <router-link to="/create">
      <button class="ask-button">
        ✚ Create post
      </button>
      </router-link>
      <!-- Icône de notification -->
      <button class="notification-button">
        <!--<BellIcon class="notification-icon" />-->
        <!-- Badge de notification -->
        <i class="fa-solid fa-bell"></i>
        <span class="notification-badge">0</span>
      </button>
      

      <!-- Avatar utilisateur avec menu -->
      <div class="avatar-container">
        <button @click.stop="toggleDropdown" class="avatar" data-testid="avatar">
        <!-- <img src="@/assets/user-avatar.jpg" alt="User" class="avatar"> --> 
         
        </button>

        <!-- Menu déroulant -->
        <div v-if="dropdownOpen" class="dropdown-menu" data-testid="dropdown-menu">
          <a href="#" class="dropdown-item">Profile</a>

          <!-- 
          <a href="#" class="dropdown-item">Settings</a> 
          -->

          <router-link to="/SignIn" class="logout">Logout</router-link>
        </div>
      </div>
    </template>
    
    <template v-else>
      <!-- Boutons Register et Login -->
      <router-link to="/SignIn"><button class="register-button">➜ Register</button></router-link>
      <router-link to="/SignIn"><button class="login-button">Login</button></router-link>
    </template>
    </div>
  </nav>
  
</template>

<script>

import { ref, onMounted, onUnmounted } from "vue";
//import { BellIcon } from "@heroicons/vue/outline";

export default {
  //components: { BellIcon },
  setup() {
    // État du menu déroulant
    const dropdownOpen = ref(false);
    const isAuthenticated = ref(false);

    // Fonction pour basculer l'affichage du menu
    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    // Fonction pour fermer le menu si on clique ailleurs
    const closeDropdown = (event) => {
      if (!event.target.closest(".avatar-container")) {
        dropdownOpen.value = false;
      }
    };

    // Ajouter l'écouteur au montage du composant
    onMounted(() => {
      document.addEventListener("click", closeDropdown);
    });

    // Supprimer l'écouteur lors du démontage du composant
    onUnmounted(() => {
      document.removeEventListener("click", closeDropdown);
    });

    return { dropdownOpen, toggleDropdown, isAuthenticated };
  },
};
</script>


<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");

/* Styles généraux de la navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: #E3F0AF;
  border-bottom: 2px solid #EAEAEA;
}

/* Logo et texte */
.logo-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

/*.logo {
  height: 24px;
  width: 24px;
}*/

.logo-text {
  font-weight: bold;
  color: #2D3748;
}

/* Navigation */
.nav-links {
  display: flex;
  gap: 24px;
  list-style-type: none;
}
.nav-item {
  color: #4A5568;
  font-weight: 600;
  text-decoration: none;
}
.nav-item:hover {
  color: #2D3748;
}

/* Actions utilisateur */
.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Bouton "Ask a question" */
.ask-button {
  background-color: #FBF6E9;
  color: black;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.login-button{
  background-color: #EAEAEA;
  color: #5DB996;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: Roboto;
  font-weight: 900;
  font-size: 12px;
  line-height: 14.06px;
  letter-spacing: 2%;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.register-button{
  background-color: #118B50;
  color: white;
  padding: 8px 16px;
  font-family: Roboto;
  font-weight: 900;
  font-size: 12px;
  line-height: 14.06px;
  letter-spacing: 2%;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.ask-button:hover {
  background-color: #EAEAEA;
}

/* Icône de notification */
.notification-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
}
.notification-icon {
  width: 24px;
  height: 24px;
  color: #4A5568;
}

i{
  font-size: 25px;
  color: black;
}
.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  opacity: 0.8;
  color: white;
  font-size: 12px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* Avatar et menu déroulant */
.avatar-container {
  position: relative;
}
.avatar {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  border: 2px solid #EAEAEA;
  cursor: pointer;
}


/* Menu déroulant */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: 40px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 8px 0;
  width: 160px;
}
.dropdown-item {
  display: block;
  padding: 8px 16px;
  color: #4A5568;
  text-decoration: none;
}
.dropdown-item:hover {
  background: #F7FAFC;
}
.logout {
  color: red;
  text-decoration: none;
  display: block;
  padding: 8px 16px;
}
</style>
