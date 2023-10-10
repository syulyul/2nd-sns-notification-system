import express from "express";
import * as roomCtrl from "./chatRoom.ctrl";

const chatRoom = express.Router();

chatRoom.get("/room", roomCtrl.roomList);

// chatRoom.post("/room", roomCtrl.createRoom);

chatRoom.get("/room/:room", roomCtrl.enterRoom);

chatRoom.get("/room/:room", roomCtrl.removeRoom);

chatRoom.post("/room/:room/chat", roomCtrl.sendChat);

export default chatRoom;