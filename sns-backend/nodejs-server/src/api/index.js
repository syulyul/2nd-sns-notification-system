import express from 'express';
import notification from './notification';
import user from './user';

const api = express();

api.use('/notification', notification);
api.use('/user', user);

export default api;
