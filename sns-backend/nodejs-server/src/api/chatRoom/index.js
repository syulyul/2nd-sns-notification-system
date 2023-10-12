import express from 'express';
import * as roomCtrl from './chatRoom.ctrl';

const chatRoom = express.Router();

chatRoom.get('/room/:mno', roomCtrl.roomList);

// chatRoom.post("/room", roomCtrl.createRoom);

chatRoom.get('/enterRoom', roomCtrl.enterRoom);

chatRoom.get('/room/:room', roomCtrl.removeRoom);

chatRoom.post('/room/:roomId/chat', roomCtrl.sendChat);

export default chatRoom;
