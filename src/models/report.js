import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const Report = sequelize.define("reports", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	fileUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	fileName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

export default Report;
