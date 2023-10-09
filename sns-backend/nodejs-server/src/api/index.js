import express from "express";
import notification from "./notification";

const api = express.Router();

api.use("/notificatoin", notification);

export default api;
