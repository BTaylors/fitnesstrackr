const router = require("express").Router();

router.get("/health", (req, res, next) => {
	try {
		res.send("API is Healthy 😎!");
	} catch (error) {
		next(error);
	}
});

// Hook up other Routers ex: router.use('/users', require('./users'))

module.exports = router;
const usersRouter = require("./users");
router.use("/users", usersRouter);
