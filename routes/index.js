const router = require("express").Router();
const activitiesRouter = require("./activities");
const usersRouter = require("./users");
const routinesRouter = require("./routines");

router.get("/health", (req, res, next) => {
	try {
		res.send("API is Healthy 😎!");
	} catch (error) {
		next(error);
	}
});

// Hook up other Routers ex: router.use('/users', require('./users'))

module.exports = router;
router.use("/users", usersRouter);
router.use("/activities", activitiesRouter);
router.use("/routines", routinesRouter);
