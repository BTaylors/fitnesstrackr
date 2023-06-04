const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const { authRequired } = require("./utils");
const { JWT_SECRET } = process.env;
require("dotenv").config();

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
