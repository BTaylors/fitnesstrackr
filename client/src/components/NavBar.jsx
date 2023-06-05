import React from "react";
import { useNavigate } from "react-router";
import { userLogout } from "../api/helpers";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
	const nav = useNavigate();
	const { token, setToken, user, setUser } = useAuth();
	return (
		<div className="navbar">
			<h1>Strangers Thing's</h1>
			<ul className="navlinks">
				<li>
					<button className="link" onClick={() => nav("/")}>
						Home
					</button>
				</li>
				{/* {token && (
					<li>
						<button className="link" onClick={() => nav("/")}>
							Profile
						</button>
					</li>
				)}
				<li>
					<button className="link" onClick={() => nav("/")}>
						
					</button>
				</li> */}

				<li>
					<button className="link" onClick={() => nav("/Login")}>
						Login
					</button>
				</li>

				<li>
					<button className="link" onClick={() => nav("/Register")}>
						Register
					</button>
				</li>
				<li>
					<button
						className="link"
						onClick={async () => (
							await userLogout(token, user),
							setUser(""),
							setToken(null),
							localStorage.clear,
							nav("/Login"),
							console.log(user)
						)}
					>
						Log Out
					</button>
				</li>
			</ul>
		</div>
	);
}
