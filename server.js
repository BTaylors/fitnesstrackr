require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const client = require("./db/client");
const { authRequired } = require("./routes/utils");
const PORT = 3000;
const app = express();

client.connect();
console.log("hello");
// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "./client", "dist")));

// Routes
app.use("/api", require("./routes"));

app.get("/test", authRequired, (req, res, next) => {
	res.send("You are authorized!");
});

// Error Handler
app.use((err, req, res, next) => {
	res.send({
		message: err.message,
		name: err.name,
		stack: err.stack,
	});
});

// Server App
app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`);
});
