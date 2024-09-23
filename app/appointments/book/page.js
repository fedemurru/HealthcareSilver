"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function BookAppointment() {
	const searchParams = useSearchParams();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		date: "",
		time: "",
	});

	// Use effect to pre-fill form with passed data
	useEffect(() => {
		setFormData({
			...formData,
			name: searchParams.get("name") || "",
			email: searchParams.get("email") || "",
			phone: searchParams.get("phone") || "",
		});
	}, [formData, searchParams]);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch("/api/appointments/book", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		if (res.ok) {
			alert("Appointment booked successfully!");
		} else {
			alert("Error booking appointment");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow-md w-96"
			>
				<h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
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
						readOnly
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
						readOnly
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
						readOnly
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="date"
					>
						Date
					</label>
					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={handleInputChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="time"
					>
						Time
					</label>
					<input
						type="time"
						name="time"
						value={formData.time}
						onChange={handleInputChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
				>
					Book Appointment
				</button>
			</form>
		</div>
	);
}
