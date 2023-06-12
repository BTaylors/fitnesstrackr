import React, { useState } from "react";
import { registerUser } from "../../api/helpers";
import useAuth from "../hooks/useAuth";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	console.log("User from RegisterForm: ", user);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			let result;
			if (pathname === "/register") {
				result = await registerUser(username, password);
			} else {
				result = await loginUser(username, password);
				alert("you're logged in");
			}
			console.log("Result after login or register: ", result);
			if (result.success) {
				setLoggedIn(true);
				alert("you're registered!");
				console.log("Auth Results", result);
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<div id="register">
			<form id="registerForm" onSubmit={handleSubmit}>
				<div className="registerForm">
					<p className="register">Register an account!</p>
					<br />
					<input
						type="text"
						name="username"
						placeholder="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<br />
					<br />
					<input
						type="text"
						name="password"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<br />

					<button>Submit</button>
				</div>
			</form>
		</div>
	);
}
