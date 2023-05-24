// Create dummy data to seed into your DB
const users = [
	{ username: "Brandon", password: 1234 },
	{ username: "Mark", password: 12345 },
	{ username: "Morty", password: 123456 },
	{ username: "Pawan", password: 1234567 },
	{ username: "Chris", password: 12345678 },
];
const activities = [
	{ name: "bench press", description: "chest excercise" },
	{ name: "squats", description: "leg day" },
	{ name: "dumbell curls", description: "biceps" },
	{ name: "calf raises", description: "leg day" },
	{ name: "planking", description: "abs" },
];
const routines = [
	{
		creator_id: 1,
		is_public: true,
		name: "Exercise routine",
		goal: "get huge",
	},
	{},
];
const routine_activities = [];

module.exports = { users, activities, routines, routine_activities };