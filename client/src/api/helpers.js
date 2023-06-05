const COHORT_NAME = "2301-FTB-ET-WEB-AM";
const BASE_URL = `fitnesstrac-kr.herokuapp.com/api/${COHORT_NAME}`;

export const getToken = async (token) => {
	try {
		const response = await fetch(`${BASE_URL}/users/me`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export async function registerUser(username, password) {
	try {
		const response = await fetch(`${BASE_URL}/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: {
					username,
					password,
				},
			}),
		});
		const result = await response.json();
		console.log("Result from register user: ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
}

export const userLogin = async (username, password) => {
	try {
		const response = await fetch(`${BASE_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: {
					username,
					password,
				},
			}),
		});
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error(error);
	}
};
export const userLogout = async (token) => {
	try {
		const response = await fetch(`${BASE_URL}/Login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: {
					token,
				},
			}),
		});
		const result = await response.json();
		console.log(result);
		return result;
	} catch (err) {
		console.error(err);
	}
};

export const getActivities = async () => {
	try {
		const response = await fetch(`${BASE_URL}/activities`);
		const result = await response.json();
		console.log(result);
		return result.data.activities;
	} catch (error) {
		console.error("ERROR");
	}
};
