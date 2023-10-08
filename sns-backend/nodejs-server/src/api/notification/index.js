import express from 'express';
import * as notiCtrl from './notification.ctrl';

const notification = express.Router();

notification.post('/add', notiCtrl.addLog);
notification.post('/notReadNotiCount', notiCtrl.notReadNotiCount);
notification.post('/list', notiCtrl.listNotiLog);
notification.post('/updateState', notiCtrl.updateNotiState);
notification.post('/updateAllState', notiCtrl.updateAllNotiState);

export default notification;
