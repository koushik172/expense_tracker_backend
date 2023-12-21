import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const User = sequelize.define("users", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	total_expense: {
		type: Sequelize.INTEGER,
		allowNull: false,
		default: 0,
	},
	premium: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: 0,
	},
});

export default User;
