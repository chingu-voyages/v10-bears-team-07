// Singleton module for making preconfigured api fetch requests.
// Also takes care of authentication management
// abstracted to make testing easier
import axios from 'axios';

var api, isLoggedIn;

// fallback baseURL string value is because of package.json's proxy entry
function init({
  token = window.localStorage.getItem('token'),
  baseURL = (api && api.defaults.baseURL) || '/api'
} = {}) {
  api = axios.create({
    baseURL,
    headers: { authorization: token ? `Bearer ${token}` : undefined }
  });

  isLoggedIn = Boolean(token);
}

const auth = {
  async getCachedUser() {
    if (!isLoggedIn) {
      return Promise.resolve({ user: null });
    }

    try {
      var { data } = await api.get('/auth/user');
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        return this.logout();
      }

      return Promise.reject(error);
    }
  },
  async register(formData) {
    var { data } = await api.post('/auth/register', formData);

    if (!data.error) {
      window.localStorage.setItem('token', data.user.token);
      init({ token: data.user.token });
    }

    return data;
  },
  async login(formData) {
    var { data } = await api.post('/auth/login', formData);

    if (!data.error) {
      window.localStorage.setItem('token', data.user.token);
      init({ token: data.user.token });
    }

    return data;
  },
  logout() {
    window.localStorage.removeItem('token');
    init({ token: null });
    return Promise.resolve({ user: null });
  }
};

export { init, auth };
