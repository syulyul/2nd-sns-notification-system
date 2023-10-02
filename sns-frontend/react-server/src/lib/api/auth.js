import client from './client';

export const login = ({ phoneNumber, password }) =>
  client.post('/spring/auth/login', { phoneNumber, password });

export const register = ({ phoneNumber, password, nick, name, email, photo }) =>
  client.post('/spring/auth/add', {
    phoneNumber,
    password,
    nick,
    name,
    email,
    photo,
  });

export const check = () => client.get('/spring/auth/check');

export const logout = () => client.post('/spring/auth/logout');
