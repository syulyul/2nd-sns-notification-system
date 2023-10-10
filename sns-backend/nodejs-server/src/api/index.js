import express from 'express';
import notification from './notification';

const api = express();

api.use('/notification', notification);

export default api;
