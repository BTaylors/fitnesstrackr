const client = require("./client");
const { createUser } = require("./adapters/users");
const { createActivity } = require("./adapters/activities");
const {
	users,
	activities,
	routines,
	routineActivities,
} = require("./seedData");
const { createRoutine } = require("./adapters/routines");

async function dropTables() {
	try {
		console.log("Starting to drop tables...");

		// have to make sure to drop in correct order
		await client.query(`
      DROP TABLE IF EXISTS routine_activities;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS users;
      `);

		console.log("Finished dropping tables!");
	} catch (error) {
		console.error("Error dropping tables!");
		throw error;
	}
}

async function createTables() {
	try {
		console.log("Starting to build tables...");

		await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
		name varchar(255) UNIQUE,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        goal TEXT 
      );

      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );

      CREATE TABLE routineActivities (
        id SERIAL PRIMARY KEY,
        routine_id INTEGER REFERENCES routines(id),
        activity_id INTEGER REFERENCES activities(id),
        duration INTEGER,
        count INTEGER,
        UNIQUE (routine_id, activity_id)
      );
    `);

		console.log("Finished building tables!");
	} catch (error) {
		console.error("Error building tables!");
		throw error;
	}
}

async function populateTables() {
	console.log("populating initial tables");
	try {
		for (const user of users) {
			await createUser(user);
		}
		console.log("users table populated");

		console.log("populating activities table");
		for (const activity of activities) {
			await createActivity(activity);
		}
		for (const routine of routines) {
			await createRoutine(routine);
		}
		for (const routineActivitiy of routineActivities) {
			await createRoutine(routineActivitiy);
		}
		console.log("activities table populated");
	} catch (error) {
		console.error(error);
	}
}

async function rebuildDb() {
	client.connect();
	try {
		await dropTables();
		await createTables();
		await populateTables();
	} catch (error) {
		console.error(error);
	} finally {
		client.end();
	}
}

rebuildDb();
