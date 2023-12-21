import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const Authenticate = async (req, res, next) => {
	let token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = await User.findOne({ attributes: ["id", "name", "email", "premium", "total_expense"], where: { id: decoded.userId } });
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json("Unauthorised");
	}
};
