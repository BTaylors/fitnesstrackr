import React from "react";
import { useEffect, useState } from "react";
import { getRoutines } from "../api/helpers.js";
import "../App.css";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function AllRoutines() {
	const nav = useNavigate();
	const [Routines, setRoutines] = useState([]);
	const { id, user } = useAuth();
	useEffect(() => {
		async function getAllRoutines() {
			try {
				const AllRoutines = await getRoutines();
				setRoutines(AllRoutines);
			} catch (error) {
				console.error("Oops");
			}
		}
		getAllRoutines();
	}, []);

	return (
		<div className="AllRoutines">
			{Routines.map((post) => {
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
