import React from "react";
import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../../api/helpers";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState("");
	const [loggedIn, setloggedIn] = useState("");
	useEffect(() => {
		async function getMe() {
			const apiResponse = await fetchMe();
			setUser(apiResponse);
			setloggedIn(true);
		}
		getMe();
	}, [loggedIn]);
	const contextValue = {
		user,
		setUser,
		loggedIn,
		setloggedIn,
	};
	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}
