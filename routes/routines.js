const routinesRouter = require("express").Router();
const { authRequired } = require("./utils");
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  getRoutineById,
} = require("../db/adapters/routines");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const routine = await getAllRoutines();
    res.send(routine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.get("/:id", async (req, res, next) => {
  try {
    const routine = await getRoutineById(req.params.id);
    console.log("Routine in GET", routine);
    res.send(routine);
  } catch (error) {
    next(error);
  }
});
routinesRouter.patch("/:id", authRequired, async (req, res, next) => {
  const { id } = req.params;
  const { is_public, name, goal } = req.body;
  try {
    const routine = await getRoutineById(+id);
    console.log("Routine???", routine);
    if (+req.user.id === routine.creator_id) {
      const updatedRoutine = await updateRoutine(+id, is_public, name, goal);
      res.send(updatedRoutine);
      console.log("updatedRoutine", updatedRoutine);
    } else {
      res.send("routine by id not found");
    }
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", async (req, res, next) => {
  try {
    const { creator_id, is_public, name, goal } = req.body;
    const createdRoutine = await createRoutine({
      creator_id,
      is_public,
      name,
      goal,
    });
    res.send(createdRoutine);
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
