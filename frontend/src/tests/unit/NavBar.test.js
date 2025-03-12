import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import NavBar from "@/components/NavBar.vue";

// Simuler les routes pour le test
const routes = [{ path: "/SignIn", component: { template: "<div>Login Page</div>" } }];
const router = createRouter({
  history: createWebHistory(),
  routes,
});cd ..NavBar

describe("NavBar.vue", () => {
  test("Affiche le bouton de connexion si l'utilisateur n'est pas authentifié", async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain("Se connecter");
  });

  test("Affiche le bouton de déconnexion si l'utilisateur est authentifié", async () => {
    localStorage.setItem("token", "fake-jwt-token"); // Simuler un utilisateur connecté

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain("Se déconnecter");

    // Nettoyer après le test
    localStorage.removeItem("token");
  });

  test("Déconnexion supprime le token et redirige vers /signin", async () => {
    localStorage.setItem("token", "fake-jwt-token");

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    });

    // Simuler le clic sur le bouton "Se déconnecter"
    await wrapper.find(".logout-button").trigger("click");

    expect(localStorage.getItem("token")).toBeNull(); // Vérifier que le token a été supprimé
  });
});
