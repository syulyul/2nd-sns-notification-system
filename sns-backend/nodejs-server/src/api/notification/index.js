import express from 'express';
import * as notiCtrl from './notification.ctrl';
import {addFollowingLog} from "./notification.ctrl";

const notification = express.Router();

notification.post('/add', notiCtrl.addLog);
notification.get('/notReadNotiCount/:memberNo', notiCtrl.notReadNotiCount);
notification.get('/list/:memberNo', notiCtrl.listNotiLog);
notification.post('/updateState', notiCtrl.updateNotiState);
notification.post('/updateAllState', notiCtrl.updateAllNotiState);
notification.post('/addFollowingLog', notiCtrl.addFollowingLog);

export default notification;
