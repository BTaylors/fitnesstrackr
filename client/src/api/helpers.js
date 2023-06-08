export const fetchMe = async () => {
	try {
		const response = await fetch(`api/users/me`, {
			headers: {
				"Content-Type": "application/json",
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
		const response = await fetch(`api/users/register`, {
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
		const response = await fetch(`api/users/Login`, {
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
		const response = await fetch(`api/auth/logout`, {
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
		const response = await fetch(`api/activities`);
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error(error);
	}
	getActivities();
};

export const getPosts = async () => {
	try {
	} catch (error) {
		console.error(error);
	}
};

export async function getRoutines() {
	try {
		const response = await fetch(`api/routines`);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
	getRoutines();
}

export const deletePost = async () => {
	try {
		const response = await fetch(`api/posts/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		console.log("Result from Delete", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export async function checkAPIHealth() {
	try {
		const response = await fetch("/api/health");
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}

	checkAPIHealth();
}
