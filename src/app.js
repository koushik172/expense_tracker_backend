import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";

import express from "express";

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import sequelize from "./utils/database.js";
import User from "./models/user.js";
import Expense from "./models/expense.js";
import Order from "./models/orders.js";
import ForgotPasswordRequest from "./models/forgotPassword.js";
import Report from "./models/report.js";

import userRoutes from "./routes/user.js";
import expenseRouter from "./routes/expense.js";
import orderRouter from "./routes/order.js";
import reportRouter from "./routes/report.js";

const app = express();
dotenv.config();

app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

User.hasMany(Report);
Report.belongsTo(User);

app.use("/user", userRoutes);
app.use("/expenses", expenseRouter);
app.use("/orders", orderRouter);
app.use("/user/report", reportRouter);

await sequelize
	.sync()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`http://localhost:${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
