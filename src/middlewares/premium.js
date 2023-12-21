export const Premium = async (req, res, next) => {
	try {
		if (req.user.premium === true) next();
	} catch (error) {
		console.log(error);
		res.status(401).json("Unauthorised");
	}
};
