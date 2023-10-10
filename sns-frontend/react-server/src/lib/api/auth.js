import springClient from './springClient';

export const login = ({ phoneNumber, password }) =>
  springClient.post('auth/login', {
    phoneNumber,
    password,
  });

export const register = ({ formData }) =>
  springClient.post('auth/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const check = () =>
  springClient.get('auth/check', { withCredentials: true });

export const logout = () => springClient.get('auth/logout');
