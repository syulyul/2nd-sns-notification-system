import axios from 'axios';

const cookies = document.cookie.split(';');
const csrfTokenCookie = cookies.find((cookie) =>
  cookie.trim().startsWith('csrfToken=')
);
const csrfToken = csrfTokenCookie ? csrfTokenCookie.split('=')[1] : null;

const springClient = axios.create();
springClient.defaults.headers.common['X-CSRF-Token'] = csrfToken;
springClient.defaults.baseURL =
  process.env.REACT_APP_SPRING_SERVER_URL + '/spring/';
springClient.defaults.withCredentials = true;

export default springClient;
