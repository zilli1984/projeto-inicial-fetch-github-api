class UserProfile {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  render(userData, repositories, events) {
    if (!this.container) return;

    this.container.innerHTML = `
      ${this._renderUserInfo(userData)}
      ${this._renderRepositories(repositories)}
      ${this._renderEvents(events)}
    `;
  }

  renderError(message) {
    if (!this.container) return;
    
    this.container.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
  }

  renderLoading() {
    if (!this.container) return;
    
    this.container.innerHTML = `
      <div class="loading">
        <p>loading...</p>
      </div>
    `;
  }

  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  _renderUserInfo(user) {
    return `
      <div class="info">
        <div class="data">
          <img src="${user.avatar_url}" alt="Foto de perfil de ${user.name || user.login}">
          <div class="user-info">
            <h1>${user.name || user.login}</h1>
            ${user.bio ? `<p>${user.bio}</p>` : ''}
            <div class="stats">
              <p>👥 Followers: ${user.followers}</p>
              <p>👤 Following: ${user.following}</p>
              <p>📦 Public repositories: ${user.public_repos}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _renderRepositories(repositories) {
    if (!repositories || repositories.length === 0) {
      return '<p>Nenhum repositório encontrado</p>';
    }

    const reposList = repositories.map(repo => `
      <li>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          ${repo.name}
        </a>
        ${repo.description ? `<p>${repo.description}</p>` : ''}
        <div class="repo-stats">
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
          <span>👁️ ${repo.watchers_count}</span>
          ${repo.language ? `<span>💻 ${repo.language}</span>` : ''}
        </div>
      </li>
    `).join('');

    return `
      <div class="repositories">
        <h2>Repositories</h2>
        <ul>${reposList}</ul>
      </div>
    `;
  }

  _renderEvents(events) {
    if (!events || events.length === 0) {
      return '<p>No recent activity found</p>';
    }

    const eventsList = events.map(event => {
      const repoName = event.repo.name;
      const commitMessage = event.payload.commits?.[0]?.message || 'No commit message.';
      
      return `
        <li>
          <strong>${repoName}</strong>
          <p>${commitMessage}</p>
        </li>
      `;
    }).join('');

    return `
      <div class="events">
        <h2>Recent activity (Push)</h2>
        <ul>${eventsList}</ul>
      </div>
    `;
  }
}

export default UserProfile;
