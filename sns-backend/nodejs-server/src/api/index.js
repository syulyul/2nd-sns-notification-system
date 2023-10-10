import express from "express";
import notification from "./notification";
import chatRoom from "./chatRoom";
import user from './user';

const api = express();

api.use("/notification", notification);
api.use("/chatRoom", chatRoom);
api.use('/user', user);

export default api;
