import client from './client';

export const exAjaxGet = ({ arg1, arg2 }) =>
  client.get('/spring/server/controller', { arg1, arg2 });

export const exAjaxPost = ({ arg1, arg2 }) =>
  client.post('/spring/server/controller', { arg1, arg2 });
