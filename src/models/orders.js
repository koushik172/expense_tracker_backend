import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const Order = sequelize.define("orders", {
	orderCreationId: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true,
	},
	amount: {
		type: Sequelize.INTEGER,
	},
	currency: {
		type: Sequelize.STRING,
	},
	razorpayPaymentId: {
		type: Sequelize.STRING,
	},
	razorpayOrderId: {
		type: Sequelize.STRING,
	},
	razorpaySignature: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

export default Order;
