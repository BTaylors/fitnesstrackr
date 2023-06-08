import "./App.css";
import { useState, React } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import useAuth from "./hooks/useAuth";
import AllRoutines from "./components/Routines";
import AllActivities from "./components/Activities";
// import MyRoutines from "./components/MyRoutines";
function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Routines" element={<AllRoutines />} />
				{/* <Route path="/MyRoutines" element={<MyRoutines />} /> */}
				<Route path="/Activities" element={<AllActivities />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Register" element={<Register />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
