import springClient from './springClient';

export const login = ({ phoneNumber, password }) =>
  springClient.post('auth/login', {
    phoneNumber,
    password,
  });

export const register = ({ phoneNumber, password, nick, name, email, photo }) =>
  springClient.post('auth/add', {
    phoneNumber,
    password,
    nick,
    name,
    email,
    photo,
  });

export const check = () => springClient.get('auth/check');

export const logout = () => springClient.get('auth/logout');
