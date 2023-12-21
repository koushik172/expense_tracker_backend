import express from "express";

import * as orderController from "../controllers/order.js";
import { Authenticate } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/new-order", Authenticate, orderController.newOrder);

orderRouter.post("/payment/success", Authenticate, orderController.orderSuccess);

export default orderRouter;
