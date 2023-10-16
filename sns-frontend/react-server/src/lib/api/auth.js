import springClient from './springClient';

export const login = ({ phoneNumber, password, fcmToken }) =>
  springClient.post('auth/login', {
    phoneNumber,
    password,
    fcmToken,
  });

export const register = ({ formData }) =>
  springClient.post('auth/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const getPhoneAuthCode = ({ phoneNumber }) =>
  springClient.post('auth/getPhoneAuthCode', {
    phoneNumber,
  });

export const checkPhoneAuthCode = ({ phoneNumber, verificationCode }) =>
  springClient.post('auth/checkPhoneAuthCode', {
    phoneNumber,
    verificationCode,
  });

export const check = () =>
  springClient.get('auth/check', { withCredentials: true });

export const logout = () => springClient.get('auth/logout');
