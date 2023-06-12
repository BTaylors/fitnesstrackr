import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { getUserRoutines } from "../api/helpers";

function ProfileComponent() {
	const [user, setUser] = useState(useAuth());
	console.log("user:", user);

	const [myRoutines, setMyRoutines] = useState([]);

	useEffect(() => {
		async function getRoutinesbyUser() {
			setUser(user);
			const response = await getUserRoutines(user);
			console.log("response:", response);
			setMyRoutines([response]);
		}
		getRoutinesbyUser();
	}, [user]);
	return (
		<>
			<div>
				<h1> Welcome to your Profile {user.username}</h1>
				<h2> my routines</h2>
				<div>
					{myRoutines.map((routine, idx) => {
						return (
							<>
								<div>
									<div key={idx}>
										<p>{routine.name}</p>
										<p>{routine.goal}</p>
									</div>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}

export { ProfileComponent };
