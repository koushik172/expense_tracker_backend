import express from "express";

import { Authenticate } from "../middlewares/auth.js";
import { Premium } from "../middlewares/premium.js";

import * as reportController from "../controllers/report.js";

const reportRouter = express.Router();

reportRouter.get("/create-report", Authenticate, Premium, reportController.createReport);

reportRouter.get("/get-reports", Authenticate, Premium, reportController.getReports);

reportRouter.post("/delete-report", Authenticate, Premium, reportController.deleteReport);

export default reportRouter;
