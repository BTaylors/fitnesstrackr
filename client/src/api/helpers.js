export async function fetchMe() {
	const response = await fetch("/api/users/me");
	const { success, message, user } = await response.json();
	if (!success) {
		throw {
			message,
		};
	}
	return { success, message, user };
}

export async function registerUser(username, password) {
	const response = await fetch("api/users/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
	});
	const { success, message, data } = await response.json();
	console.log("hi");
	console.log("response.json:", response.json);
	if (!success) {
		throw {
			message,
		};
	}
	return { success, message, data };
}

export async function userLogin(username, password) {
	const response = await fetch("/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
	});
	const { success, message, data } = await response.json();
	if (!success) {
		throw {
			message,
		};
	}
	return { success, message, data };
}

export async function logout() {
	const response = await fetch("/api/users/logout");
	const { success, message, data } = await response.json();
	if (!success) {
		throw {
			message,
		};
	}
	return { success, message, data };
}

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

export async function getUserRoutines(username) {
	try {
		const response = await fetch(`/api/users/${username}/routines`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
}

export async function createActivity(name, description) {
	try {
		const response = await fetch("/api/activities/", {
			method: "POST",
			body: JSON.stringify({
				name,
				description,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
	}
}

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
