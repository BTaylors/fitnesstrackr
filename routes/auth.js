const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SALT_ROUNDS = 10;
const { createUser, getUserByUsername } = require("../db/adapters/users.js");
const { authRequired } = require("./utils");
const { JWT_SECRET } = process.env;

authRouter.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const _user = await getUserByUsername(username);
		if (_user) {
			next({
				message: "That user already exists!",
				name: " Auth Error",
			});
			return;
		}
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		console.log("hashed password:", hashedPassword);
		const user = await createUser({ username, password: hashedPassword });
		console.log("JWT secret:", process.env.JWT_SECRET);
		const token = jwt.sign(user, process.env.JWT_SECRET);
		console.log("token:", token);
		res.cookie("token", token, {
			sameSite: "strict",
			httpOnly: true,
			signed: true,
		});
		delete user.password;
		res.send({ user, token });
	} catch (error) {
		next(error);
	}
});

authRouter.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await getUserByUsername(username);
		const checkedpassword = await bcrypt.compare(password, user.password);
		if (checkedpassword) {
			delete user.password;
			const token = jwt.sign(user, process.env.JWT_SECRET);
			res.cookie("token", token, {
				sameSite: "strict",
				httpOnly: true,
				signed: true,
			});
			res.send(user);
		} else {
			next({ message: "invalid login credentials" });
			return;
		}
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
