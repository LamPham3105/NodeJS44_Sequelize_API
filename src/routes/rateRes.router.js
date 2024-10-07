import express from "express";
import {
  addRate,
  getRatesByRestaurant,
  getRatesByUser,
} from "../controllers/rateRes.controller.js";

const rateResRoutes = express.Router();

rateResRoutes.post("/rate", addRate);
rateResRoutes.get("/rate-restaurant/:resId", getRatesByRestaurant);
rateResRoutes.get("/rate-user/:userId", getRatesByUser);

export default rateResRoutes;
