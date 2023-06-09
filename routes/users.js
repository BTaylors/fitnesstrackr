const { authRequired } = require("./utils.js");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

require("dotenv").config();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const usersRouter = require("express").Router();
const { getPublicRoutinesByUser } = require("../db/adapters/routines");
const {
	getAllUsers,
	createUser,
	getUserByUsername,
	getUserById,
} = require("../db/adapters/users");

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

usersRouter.get("/:username/routines", async (req, res, next) => {
	try {
		const username = req.params.username;
		const publicRoutinesbyUser = await getPublicRoutinesByUser(username);
		res.send({ publicRoutinesbyUser });
	} catch (error) {
		next(error);
	}
});

usersRouter.post("/register", async (req, res, next) => {
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
usersRouter.post("/login", async (req, res, next) => {
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

usersRouter.get("/me", authRequired, async (req, res, next) => {
	res.send(req.user);
});

module.exports = usersRouter;
