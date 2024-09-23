// app/patients/register/page.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientRegister() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
	});
	const router = useRouter(); // Router for navigation

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch("/api/patients/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		if (res.ok) {
			const registeredPatient = await res.json();
			// Redirect to the booking page with patient data in the query params
			router.push({
				pathname: "/appointments/book",
				query: {
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
				},
			});
		} else {
			alert("Error registering patient");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow-md w-96"
			>
				<h2 className="text-xl font-bold mb-4">New Patient Registration</h2>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name"
					>
						Name
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="phone"
					>
						Phone
					</label>
					<input
						type="text"
						name="phone"
						value={formData.phone}
						onChange={handleInputChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
				>
					Register
				</button>
			</form>
		</div>
	);
}
