import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const Expense = sequelize.define("expenses", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	amount: {
		type: Sequelize.DOUBLE,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	type: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

export default Expense;
