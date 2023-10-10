import axios from 'axios';

const cookies = document.cookie.split(';');
const csrfTokenCookie = cookies.find((cookie) =>
  cookie.trim().startsWith('csrfToken=')
);
const csrfToken = csrfTokenCookie ? csrfTokenCookie.split('=')[1] : null;

const nodeClient = axios.create();
nodeClient.defaults.headers.common['X-CSRF-Token'] = csrfToken;
nodeClient.defaults.baseURL = 'http://localhost:3001/node/';
nodeClient.defaults.withCredentials = true;

export default nodeClient;
