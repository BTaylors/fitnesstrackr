const client = require("../client");

async function createRoutine({ creator_id, is_public, name, goal }) {
	try {
		const {
			rows: [routine],
		} = await client.query(
			`
        INSERT INTO routines("creator_id", is_public, name, goal)
        VALUES($1,$2,$3,$4)
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
        `,
			[creator_id, is_public, name, goal]
		);
		return routine;
	} catch (error) {
		throw error;
	}
}
async function getAllRoutines() {
	const { rows } = await client.query(`
    SELECT * FROM routines;
  `);
	return rows;
}
async function getRoutineById(id) {
	console.log("hello");
	const { rows } = await client.query(
		`
    SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal, 
        CASE WHEN routineActivities.routine_id IS NULL THEN '[]'::json
        ELSE 
        JSON_AGG(
          JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'duration', routineActivities.duration,
          'count', routineActivities.count
          )
        ) END AS activities
        FROM routines
        JOIN routineActivities 
        ON routines.id = routineActivities.routine_id
        JOIN activities 
        ON routineActivities.activity_id = activities.id
        WHERE routines.id = $1
        GROUP BY routines.id, routinesActivities.routine_id
  `,
		[id]
	);
	console.log({ rows });
	return rows;
}
async function getRoutinesWithoutActivities() {
	const {
		rows: [routine],
	} = await client.query(`SELECT * FROM routines`);
}
async function getAllRoutinesByUser(userId) {
	try {
		const {
			rows: [routine],
		} = await client.query(
			`
        SELECT *
        FROM routines
        WHERE creator_id = ${userId};
        `,
			[userId]
		);
	} catch (error) {
		console.log(error);
	}
}

async function getAllPublicRoutines() {
	try {
		const { rows } = await client.query(`
    SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      CASE WHEN routineActivities.routine_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'duration', routineActivities.duration,
          'count', routineActivities.count
          
        )
      ) END AS activities
      FROM routines
      FULL OUTER JOIN routineActivities 
      ON routines.id = routineActivities.routine_id
      FULL OUTER JOIN activities
      ON activities.id = routineActivities.activity_id
      WHERE routines.is_public = true
      GROUP BY routines.id, routinesActivities.routine_id
    `);
		return rows;
	} catch (error) {
		console.log(error);
	}
}
async function getPublicRoutinesByUser(username) {
	try {
		const { rows } = client.query(
			`
      SELECT 
        routines.id as id
        routines.name as goal,
        CASE WHEN routineActivities.routine_id IS NULL THEN '[]'::json
        ELSE 
        JSON_AGG(
          JSon_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'duration', routineActivities.duration,
            'count', routineActivities.count
            )
          ) END AS activities
          FROM routines
          JOIN users
          ON routines.creator_id = users.id
          FULL OUTER JOIN routinesActivities
          ON routines.id = routineActivities.routine_id
          FULL OUTER JOIN activities 
          ON activities.id = routineActivities.activity_id
          WHERE users.username = $1 AND routines.is_public = true
          GROUP BY routines.id, routinesActivities.routine_id
          `,
			[username]
		);
		return rows;
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	createRoutine,
	getAllRoutines,
	getRoutineById,
	getRoutinesWithoutActivities,
	getAllPublicRoutines,
	getPublicRoutinesByUser,
	getAllRoutinesByUser,
};
