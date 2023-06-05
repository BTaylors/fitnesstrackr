import React from "react";
import { useEffect, useState } from "react";
import { getPosts } from "../api/helpers";
import "../App.css";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import AllPosts from "./AllPosts";

export default function Home() {
	return (
		<div className="home">
			<h1 className="home-header" style={{ textDecoration: "underline" }}>
				All Posts
			</h1>
			<AllPosts />
		</div>
	);
}
