import { shallowMount } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';

describe('NavBar.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NavBar, {
      data() {
        return {
          isAuthenticated: false,
        };
      },
    });
  });

  it('affiche le texte Blog', () => {
    expect(wrapper.find('.logo-text').text()).toBe('Blog');
  });

  it('affiche les liens de navigation', () => {
    expect(wrapper.find('.nav-item').text()).toBe('Questions');
  });

  it('n\'affiche pas les actions utilisateur si non authentifié', () => {
    expect(wrapper.find('.ask-button').exists()).toBe(false);
    expect(wrapper.find('.notification-button').exists()).toBe(false);
    expect(wrapper.find('.avatar-container').exists()).toBe(false);
  });

  it('affiche les actions utilisateur si authentifié', async () => {
    await wrapper.setData({ isAuthenticated: true });
    expect(wrapper.find('.ask-button').exists()).toBe(true);
    expect(wrapper.find('.notification-button').exists()).toBe(true);
    expect(wrapper.find('.avatar-container').exists()).toBe(true);
  });


    it('affiche le menu déroulant lorsqu\'on clique sur l\'avatar', async () => {
      const wrapper = mount(NavBar, {
        data() {
          return {
            isAuthenticated: true, // Simuler un utilisateur connecté
          };
        },
      });
  
      const avatarButton = wrapper.find('[data-testid="avatar"]');
      expect(avatarButton.exists()).toBe(true);
  
      await avatarButton.trigger('click');
  
      // Vérifier si le menu est visible après le clic
      const dropdownMenu = wrapper.find('.dropdown-menu');
      expect(dropdownMenu.isVisible()).toBe(true);
    });
});
