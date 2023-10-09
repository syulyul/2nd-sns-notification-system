import express from "express";
import notification from "./notification";
import chatRoom from "./chatRoom";

const api = express.Router();

api.use("/notificatoin", notification);
api.use("/chatRoom", chatRoom);

export default api;
