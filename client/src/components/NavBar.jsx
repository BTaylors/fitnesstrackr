import React from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
	async function handleLogout() {
		await fetch("/api/auth/logout");
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
