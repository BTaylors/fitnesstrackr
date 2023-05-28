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
		name: "Chest day",
		goal: "get huge",
	},
	{
		creator_id: 2,
		is_public: false,
		name: "Leg day",
		goal: "get huge",
	},
	{
		creator_id: 1,
		is_public: false,
		name: "Biceps",
		goal: "get huge",
	},
	{

		creator_id: 2,
		is_public: false,
		name: "Light leg day",
		goal: "feel good",
	},
	{
		creator_id: 1,
		is_public: false,
		name: "Abs",
		goal: "get in shape",
	},
];

const routineActivities = [
	{
		routine_id: 1,
		activity_id: 1,
		duration: 1,
		count: 10,
	},
	{
		routine_id: 2,
		activity_id: 2,
		duration: 1,
		count: 10,
	},
	{
		routine_id: 3,
		activity_id: 3,
		duration: 1,
		count: 10,
	},
	{
		routine_id: 4,
		activity_id: 4,
		duration: 1,
		count: 10,
	},
	{
		routine_id: 5,
		activity_id: 5,
		duration: 1,
		count: 10,
	},

		routine_id: 1,
		activity_id: 1,
		duration: 1,
		count: 10,
	},
	{
		routine_id: 2,
		activity_id: 2,
		duration: 1,
		count: 10,
	},
	{
		routine_id: 3,
		activity_id: 3,
		duration: 1,
		count: 10,
	},
	{
		routine_id: 4,
		activity_id: 4,
		duration: 1,
		count: 10,
	},
	{
		routine_id: 5,
		activity_id: 5,
		duration: 1,
		count: 10,
	},

];

module.exports = { users, activities, routines, routineActivities };
