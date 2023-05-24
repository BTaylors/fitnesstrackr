const client = require("../client");

async function createRoutineActivity({ name, routine, description }) {
	try {
		const {
			rows: [activity],
		} = await client.query(
			`
              INSERT INTO activities(name, routine, description)
              VALUES($1, $2, $3)
              ON CONFLICT (name) DO NOTHING
              RETURNING *;
              `,
			[name, routine, description]
		);
		return activity;
	} catch (error) {
		throw error;
	}
}

module.exports = { createRoutineActivity };
