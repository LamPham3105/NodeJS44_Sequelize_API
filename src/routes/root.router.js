import express from "express";
import likeRoutes from "./like.router.js";
import orderRoutes from "./order.router.js";
import rateResRoutes from "./rateRes.router.js";

// tạo object router tổng
const rootRoutes = express.Router();

rootRoutes.use("/likes", likeRoutes);
rootRoutes.use("/orders", orderRoutes);
rootRoutes.use("/rateReses", rateResRoutes);

// export rootRoutes cho index.js dùng
export default rootRoutes;
