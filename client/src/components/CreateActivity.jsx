import { useState } from "react";
import { createActivity } from "../api/helpers";
import "../App.css";

export function CreateActivity() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");
	const [newActivity, setNewActivity] = useState("");

	async function handleClick() {
		try {
			if (!name || !description) return setError("Please fill out completely");
			const newActivity = await createActivity(name, description);

			setError(newActivity.message);
			setNewActivity(newActivity);
		} catch (error) {
			setError(error.message);
			console.error(error);
		}
	}
	return (
		<div className="form">
			<h2>Create a New Activity</h2>
			<input
				type="text"
				placeholder="name"
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="description"
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button onClick={handleClick}>Create Activity</button>
			<p>{error}</p>
		</div>
	);
}
