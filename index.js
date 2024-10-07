// B1: import lib express
import express from "express";
import rootRoutes from "./src/routes/root.router.js";

// B2: tạo object express
const app = express();

app.use(express.json());

app.use(rootRoutes);

// B3: define port cho BE chạy
// params 1: define port BE
// params 2: callback function
app.listen(8080, () => {
  console.log("Server is starting with port 8080");
});
