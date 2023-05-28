const router = require("express").Router();
const activitiesRouter = require("./activities");
const usersRouter = require("./users");
const routinesRouter = require("./routines");
const routineActivitiesRouter = require("./routine_activities");
const authRouter = require("./auth.js");

router.get("/health", (req, res, next) => {
	try {
		res.send("API is Healthy 😎!");
	} catch (error) {
		next(error);
	}
});

router.use("/users", usersRouter);
router.use("/activities", activitiesRouter);
router.use("/routines", routinesRouter);
router.use("/routineactivities", routineActivitiesRouter);
router.use("/auth", authRouter);

module.exports = router;
