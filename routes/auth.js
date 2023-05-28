const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const createUser = require("../db/adapters/users.js");

authRouter.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);
		const user = await createUser({ username, password, hashedPassword });
		delete user.password;

		const token = jwt.sign(user, "Gilgamesh");

		res.cookie("token", token, {
			sameSite: `strict`,
			httpOnly: true,
			signed: true,
		});
		res.send(user);
	} catch (error) {
		next(error);
	}
});

authRouter.post("/login", async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
});
authRouter.get("/logout", async (req, res, next) => {
	try {
		res.clearCookie("token", {
			sameSite: "strict",
			httpOnly: true,
			signed: true,
		});
		res.send({
			loggiedIn: false,
			message: "Logged out",
		});
	} catch (error) {
		next(error);
	}
});
module.exports = authRouter;
