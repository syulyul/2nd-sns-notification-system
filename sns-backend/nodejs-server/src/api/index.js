import express from "express";
import notification from "./notification";
import chatRoom from "./chatRoom";

const api = express();

api.use("/notification", notification);
api.use("/chatRoom", chatRoom);

export default api;
