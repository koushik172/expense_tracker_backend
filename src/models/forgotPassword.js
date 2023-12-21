import { Sequelize } from "sequelize";

import sequelize from "../utils/database.js";

const ForgotPasswordRequest = sequelize.define("forgotPasswordRequests", {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true,
	},
	isActive: {
		type: Sequelize.BOOLEAN,
		default: 1,
	},
});

export default ForgotPasswordRequest;
