import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import AllActivities from "./Activities";

export default function Home() {
	return (
		<div className="home">
			<h1 className="home-header" style={{ textDecoration: "underline" }}>
				All Activities
			</h1>
			<Activities />
		</div>
	);
}
