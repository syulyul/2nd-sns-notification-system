import axios from 'axios';

const cookies = document.cookie.split(';');
const csrfTokenCookie = cookies.find((cookie) =>
  cookie.trim().startsWith('csrfToken=')
);
const csrfToken = csrfTokenCookie ? csrfTokenCookie.split('=')[1] : null;

const nodeClient = axios.create();
nodeClient.defaults.headers.common['X-CSRF-Token'] = csrfToken;
nodeClient.defaults.baseURL = process.env.REACT_APP_NODE_SERVER_URL + '/node/';
nodeClient.defaults.withCredentials = true;

export default nodeClient;
