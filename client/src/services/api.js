// Singleton module for making preconfigured api fetch requests.
// Also takes care of authentication management
// abstracted to make testing easier
import axios from 'axios';

var api;

// fallback baseURL string value is because of package.json's proxy entry
function init({
  token,
  baseURL = (api && api.defaults.baseURL) || '/api'
} = {}) {
  api = axios.create({
    baseURL,
    headers: { authorization: token ? `Bearer ${token}` : undefined }
  });
}

const auth = {
  async register(formData) {
    var { data } = await api.post('/auth/register', formData);

    if (!data.error) {
      init({ token: data.user.token });
    }

    return data;
  },
  async login(formData) {
    var { data } = await api.post('/auth/login', formData);

    if (!data.error) {
      init({ token: data.user.token });
    }

    return data;
  }
};

export { init, auth };
