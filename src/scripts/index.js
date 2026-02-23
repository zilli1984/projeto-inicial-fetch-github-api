import githubAPI from './services/github-api.js';
import UserProfile from './components/user-profile.js';
import { validateUsername } from './utils/validators.js';

class GitHubApp {
  constructor() {
    this.searchInput = document.getElementById('input-search');
    this.searchButton = document.getElementById('btn-search');
    this.userProfile = new UserProfile('.profile-data');
    
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.searchButton.addEventListener('click', () => this.handleSearch());
    
    this.searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    });
  }

  async handleSearch() {
    const username = this.searchInput.value;
    
    const validation = validateUsername(username);
    
    if (!validation.isValid) {
      this.userProfile.renderError(validation.message);
      return;
    }

    await this.fetchAndDisplayUserData(validation.username);
  }

  async fetchAndDisplayUserData(username) {
    try {
      this.userProfile.renderLoading();

      const [userData, repositories, events] = await Promise.all([
        githubAPI.fetchUser(username),
        githubAPI.fetchUserRepositories(username),
        githubAPI.fetchUserEvents(username)
      ]);

      this.userProfile.render(userData, repositories, events);
      
    } catch (error) {
      this.userProfile.renderError(error.message);
      console.error('Erro ao buscar dados do usuário:', error);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GitHubApp();
});
