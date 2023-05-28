require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = 3000;
const app = express();
const cookieParser = require("cookie-parser");
const jwt = requite("jsonwebtoken");
const cors = require("cors");
const { client } = require("./db/client");
const { authRequired } = require("./routes/utils");
client.connect();
console.log("hello");
// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/api", require("./routes"));

// Error Handler
app.use((err, req, res, next) => {
	res.send({
		message: err.message,
		name: err.name,
		stack: err.stack,
	});
});

app.get("/test", (req, res, next) => {
	res.send("You are authorized!");
});

// Server App
app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`);
});
