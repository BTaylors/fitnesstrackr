import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { userLogin } from "../../api/helpers";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setloggedIn } = useAuth();
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const result = await userLogin(username, password);
			console.log("Result in component: ", result);
			setloggedIn(true);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<div className="form">
					<p>Login</p>
					<br></br>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<br></br>
					<br></br>
					<input
						type="text"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br></br>
					<div id="submit">
						<button id="submit">Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
}
