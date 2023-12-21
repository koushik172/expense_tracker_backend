import express from "express";

import * as userController from "../controllers/user.js";
import { Authenticate } from "../middlewares/auth.js";
import { Premium } from "../middlewares/premium.js";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);

userRouter.post("/login", userController.login);

userRouter.post("/forgot-password", userController.forgot_password);

userRouter.post("/reset-password/:id", userController.reset_password);

userRouter.get("/is-premium", Authenticate, userController.is_premuim);

userRouter.get("/leaderboard", Authenticate, Premium, userController.leaderboard);

export default userRouter;
