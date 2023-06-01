const usersRouter = require("express").Router();
const { getAllUsers, getUserById } = require("../db/adapters/users");

usersRouter.get("/", async (req, res, next) => {
	try {
		const users = await getAllUsers();
		res.send(users);
	} catch (error) {
		next(error);
	}
});

usersRouter.get("/:id", async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await getUserById(id);
		res.send(user);
	} catch (error) {
		next(error);
	}
});
module.exports = usersRouter;
