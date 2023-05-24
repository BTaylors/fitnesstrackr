const usersRouter = require("express").Router();
const { getAllUsers, getUser } = require("../db/adapters/users");

usersRouter.get("/", async (req, res, next) => {
	try {
		const users = await getAllUsers();
		res.send(users);
	} catch (error) {
		next(error);
	}
});

usersRouter.get("/user", async (req, res, next) => {
	try {
		const user = await getUser();
		res.send(user);
	} catch (error) {
		next(error);
	}
});
module.exports = usersRouter;
