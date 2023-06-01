const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const { createUser, getUserByUsername } = require("../db/adapters/users.js");
const { authRequired } = require("./utils");

authRouter.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body;

		// Check if username exists already
		const _user = await getUserByUsername(username);
		if (_user) {
			next({
				message: "That user already exists!",
				name: "Auth Error",
			});
			return;
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const user = await createUser({ username, password: hashedPassword });
		delete user.password;

		const token = jwt.sign(user, process.env.JWT_SECRET);

		res.cookie("token", token, {
			sameSite: "strict",
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

authRouter.get("/me", authRequired, (req, res, next) => {
	res.send(req.user);
});

module.exports = authRouter;
