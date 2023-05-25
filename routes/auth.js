const authRouter = require("express").Router();

authRouter.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
