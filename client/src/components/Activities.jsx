import React from "react";
import { useEffect, useState } from "react";
import { getActivities } from "../api/helpers";
import "../App.css";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function AllActivities() {
	const nav = useNavigate();
	const [Activities, setActivities] = useState([]);
	const { id, user } = useAuth();
	useEffect(() => {
		async function getAllActivities() {
			try {
				const allActivities = await getActivities();
				setActivities(allActivities);
			} catch (error) {
				console.error("Oops");
			}
		}
		getAllActivities();
	}, []);

	return (
		<div className="allActivities">
			{Activities.map((post) => {
				return (
					<div key={post._id}>
						<h1>{post.title}</h1>
						<ul>
							<li>
								<p>{post.description}</p>

								<p>User: {post.author.username}</p>
							</li>
						</ul>
						{post.author.username === user.username && (
							<button className="delete-button">Delete</button>
						)}
					</div>
				);
			})}
			;
		</div>
	);
}
