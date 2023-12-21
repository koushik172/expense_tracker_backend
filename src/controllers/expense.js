import Expense from "../models/expense.js";

import sequelize from "../utils/database.js";

export const addExpense = async (req, res) => {
	const transaction = await sequelize.transaction();

	try {
		await req.user.createExpense(
			{
				amount: req.body.amount,
				description: req.body.description,
				type: req.body.type,
				category: req.body.category,
			},
			{ transaction: transaction }
		);
		let newTotal;
		let newAmount = parseInt(req.body.amount);
		if (req.body.type === "Expense") {
			newTotal = parseInt(req.user.total_expense) - newAmount;
		} else {
			newTotal = parseInt(req.user.total_expense) + newAmount;
		}
		await req.user.update({ total_expense: newTotal }, { transaction: transaction });
		res.status(201).json({ message: "Expense Added" });
		await transaction.commit();
	} catch (error) {
		console.log(error);
		res.status(500).json("Unknown Error");
		await transaction.rollback();
	}
};

export const getExpenses = async (req, res) => {
	if (req.params.page < 1) return res.status(404).json("Not Found");
	let offset = (req.params.page - 1) * req.params.rows;
	try {
		const { count, rows } = await Expense.findAndCountAll({
			attributes: ["id", "amount", "description", "category", "type", "createdAt"],
			where: { userId: req.user.id },
			order: [["createdAt", "DESC"]],
			offset: offset,
			limit: parseInt(req.params.rows),
		});
		res.status(200).json({ expenses: rows, total_expense: req.user.total_expense, count: count });
	} catch (err) {
		console.log(err);
		res.status(404).json("Unknown Error Occoured!");
	}
};

export const deleteExpense = async (req, res) => {
	const transaction = await sequelize.transaction();
	try {
		let expense = await Expense.findOne({ where: { id: req.params.id } });

		console.log(typeof req.user.total_expense, typeof expense.amount, expense.type);

		let newTotal;
		if (expense.type === "Expense") {
			newTotal = parseInt(req.user.total_expense) + parseInt(expense.amount);
		} else {
			newTotal = parseInt(req.user.total_expense) - parseInt(expense.amount);
		}
		await req.user.update({ total_expense: newTotal }, { transaction: transaction });

		await expense.destroy({ transaction: transaction });
		res.status(200).json("Expense Deleted");
		await transaction.commit();
	} catch (err) {
		res.status(500).json("Unknown Error.");
		await transaction.rollback();
	}
};
