// pages/admin/login.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = (e) => {
		e.preventDefault();
		// Simple check, in production, make this more secure (e.g. NextAuth, JWT)
		if (password === "admin123") {
			router.push("/admin/dashboard");
		} else {
			alert("Incorrect password");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<form className="p-6 bg-gray-100 rounded-lg" onSubmit={handleLogin}>
				<h2 className="text-xl mb-4">Admin Login</h2>
				<input
					type="password"
					placeholder="Enter password"
					className="border p-2 mb-4 w-full"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default AdminLogin;
