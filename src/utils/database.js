import dotenv from "dotenv";
dotenv.config();

import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.MY_SQL_DATABASE, process.env.MY_SQL_USER, process.env.MY_SQL_PASSWORD, {
	dialect: "mysql",
	host: process.env.MY_SQL_HOST,
});

export default sequelize;
