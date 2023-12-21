import express from "express";

import * as expenseController from "../controllers/expense.js";
import { Authenticate } from "../middlewares/auth.js";

const expenseRouter = express.Router();

expenseRouter.post("/add-expense", Authenticate, expenseController.addExpense);

expenseRouter.get("/get-expenses/:rows/:page", Authenticate, expenseController.getExpenses);

expenseRouter.delete("/delete-expense/:id", Authenticate, expenseController.deleteExpense);

export default expenseRouter;
