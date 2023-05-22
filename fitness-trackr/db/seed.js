const client = require("./client");
const {
	users,
	activities,
	routines,
	routine_activities,
} = require("./seedData");

async function dropTables() {
	try {
		console.log("Starting to drop tables...");

		// have to make sure to drop in correct order
		await client.query(`
      DROP TABLE IF EXISTS post_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS posts;
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
        creator_Id INTEGER REFERENCES users(id)
        is_public BOOLEAN DEFAULT false,
        name varchar(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
      );

      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );

      CREATE TABLE routineActivities (
        id SERIAL PRIMARY KEY,
        routine_id INEGER REFERENCES routines(id)
        activity_id INTEGER REGERENCES activities(id),
        UNIQUE ("routine_id", "activity_id")
        duration INTEGER,
        count INTEGER
      );
    `);

		console.log("Finished building tables!");
	} catch (error) {
		console.error("Error building tables!");
		throw error;
	}
}

async function populateTables() {
	// Seed tables with dummy data from seedData.js
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
