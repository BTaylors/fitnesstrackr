const routinesActivitiesRouter = require("express").Router();
const {
	getRoutineActivityById,
	addActivityToRoutine,
	updateRoutineActivity,
	destroyRoutineActivity,
} = require("../db/adapters/routine_activities");

const { getRoutineById } = require("../db/adapters/routines");
// const { getUserByUsername } = require("../db/adapters/users");
const { routines } = require("../db/seedData");
const { authRequired } = require("./utils");

routinesActivitiesRouter.get("/", async (req, res, next) => {
	try {
		const routineActivity = await getRoutineActivityById();
		res.send(routineActivity);
	} catch (error) {
		next(error);
	}
});

routinesActivitiesRouter.post("/", async (req, res, next) => {
	try {
		const newRoutineActivities = await addActivityToRoutine();
		res.send(newRoutineActivities);
	} catch (error) {
		next(error);
	}
});

routinesActivitiesRouter.patch(
	"/:routineActivityId",
	authRequired,
	async (req, res, next) => {
		try {
			const { routineActivityId } = req.params;
			const { count, duration } = req.body;
			const updatedRoutineActivity = await updateRoutineActivity(
				routineActivityId,
				count,
				duration
			);
			res.send(updatedRoutineActivity);
		} catch (error) {
			next(error);
		}
	}
);

routinesActivitiesRouter.delete(
	"/:routineId/:activityId",
	authRequired,
	async (req, res, next) => {
		try {
			const routine = await getRoutineById(+req.params.routineId);
			const { routine_id, activity_id } = req.params;
			console.log(req.user.id);
			if (req.user.id === routine.creator_id) {
				const destroyedActivityRoutine = await destroyRoutineActivity(
					routine_id,
					activity_id
				);
				console.log("destroyedActivityRoutine:", destroyedActivityRoutine);
				res.send(destroyedActivityRoutine);
			} else {
				next({ message: "You are not authorized to edit this routine" });
			}
		} catch (error) {
			next(error);
		}
	}
);

module.exports = routinesActivitiesRouter;
