const BASE_URL = 'https://api.github.com';
const REPOS_PER_PAGE = 10;

class GitHubAPIService {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async fetchUser(username) {
    try {
      const response = await fetch(`${this.baseURL}/users/${username}`);
      
      if (!response.ok) {
        throw new Error(this._handleErrorStatus(response.status));
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  async fetchUserRepositories(username) {
    try {
      const response = await fetch(
        `${this.baseURL}/users/${username}/repos?per_page=${REPOS_PER_PAGE}&sort=updated`
      );
      
      if (!response.ok) {
        throw new Error(this._handleErrorStatus(response.status));
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Erro ao buscar repositórios: ${error.message}`);
    }
  }

  async fetchUserEvents(username) {
    try {
      const response = await fetch(`${this.baseURL}/users/${username}/events`);
      
      if (!response.ok) {
        throw new Error(this._handleErrorStatus(response.status));
      }
      
      const events = await response.json();
      return this._filterPushEvents(events);
    } catch (error) {
      throw new Error(`Erro ao buscar eventos: ${error.message}`);
    }
  }

  _handleErrorStatus(status) {
    const errorMessages = {
      404: 'Usuário não encontrado',
      403: 'Limite de requisições excedido',
      500: 'Erro interno do servidor GitHub',
      503: 'Serviço indisponível'
    };
    
    return errorMessages[status] || 'Erro desconhecido';
  }

  _filterPushEvents(events) {
    return events
      .filter(event => event.type === 'PushEvent')
      .slice(0, 10);
  }
}

export default new GitHubAPIService();
