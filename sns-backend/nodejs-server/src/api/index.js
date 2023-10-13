// src/api/index.js

import express from "express";
import notification from "./notification";
import chatRoom from "./chatRoom";
import user from './user';
import papago from './papago';

const api = express();

api.use("/notification", notification);
api.use("/chatRoom", chatRoom);
api.use('/user', user);
api.use("/papago", papago);

export default api;
