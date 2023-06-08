const activitiesRouter = require("express").Router();
const { getAllActivities } = require("../db/adapters/activities");
const { getPublicRoutinesByActivity } = require("../db/adapters/routines");
const { authRequired } = require("./utils");
activitiesRouter.get("/", async (req, res, next) => {
	try {
		const activities = await getAllActivities();
		res.send(activities);
	} catch (error) {
		next(error);
	}
});

activitiesRouter.get("/:activityId/routines/", async (req, res, next) => {
	try {
		const { activityId } = req.params;
		const publicRoutines = await getPublicRoutinesByActivity(activityId);
		console.log("public routines:", publicRoutines);
		res.send({
			status_message: "getting public routines by activity",
			data: publicRoutines,
		});
	} catch (error) {
		next(error);
	}
});

activitiesRouter.post("/create-activity", authRequired, (req, res, next) => {
	try {
		const { name, description } = req.body;
	} catch (error) {
		next(error);
	}
});

module.exports = activitiesRouter;
