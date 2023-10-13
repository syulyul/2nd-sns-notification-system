import express from 'express';
import * as chatCtrl from './chatRoom.ctrl';

const chatRoom = express.Router();

chatRoom.get('/room/:mno', chatCtrl.roomList);

// chatRoom.post("/room", chatCtrl.createRoom);

chatRoom.get('/enterRoom', chatCtrl.enterRoom);

chatRoom.get('/room/:roomId', chatCtrl.removeRoom);

chatRoom.post('/room/:roomId/chat', chatCtrl.sendChat);

export default chatRoom;
