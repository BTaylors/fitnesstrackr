import React from "react";
import { logout } from "../api/helpers";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../App.css";
export default function Navbar() {
	const { setLoggedIn, loggedIn } = useAuth();
	const { token, user } = useAuth();
	console.log("token in app.jsx:", token);
	console.log("User in app.jsx:", user);

	async function handleLogout() {
		await logout();
		setLoggedIn(!loggedIn);
	}
	return (
		<div className="navbar">
			<h1>Strangers Thing's</h1>
			<ul className="navlinks">
				<li>
					<Link to="/">
						<button className="link">Home</button>
					</Link>
				</li>
				<li>
					<Link to="/Activities">
						<button className="link">Activities</button>
					</Link>
				</li>
				<li>
					<Link to="/Routines">
						<button className="link">Routines</button>
					</Link>
				</li>

				<li>
					<Link to="/createActivity">
						<button className="link">Create Activity</button>
					</Link>
				</li>

				<li>
					<Link to="/Login">
						<button className="link">Login</button>
					</Link>
				</li>

				<li>
					<Link to="/Register">
						<button className="link">Register</button>
					</Link>
				</li>
				<li>
					<Link to="/">
						<button className="link" onClick={handleLogout}>
							Logout
						</button>
					</Link>
				</li>
			</ul>
		</div>
	);
}
