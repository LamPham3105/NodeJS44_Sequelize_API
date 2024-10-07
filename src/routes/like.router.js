import express from "express";
import {
  likeRestaurant,
  unlikeRestaurant,
  getLikesByRestaurant,
  getLikesByUser,
} from "../controllers/like.controller.js";

const likeRoutes = express.Router();

likeRoutes.post("/like-restaurant", likeRestaurant);
likeRoutes.post("/unlike-restaurant", unlikeRestaurant);
likeRoutes.get("/like-restaurant/:resId", getLikesByRestaurant);
likeRoutes.get("/like-user/:userId", getLikesByUser);

export default likeRoutes;
