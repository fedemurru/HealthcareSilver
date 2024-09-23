"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BookAppointment() {
	const searchParams = useSearchParams();
	const patientId = searchParams.get("patientId");

	const [formData, setFormData] = useState({
		date: "",
		time: "",
	});

	const [availableTimes, setAvailableTimes] = useState([]);
	const [bookedTimes, setBookedTimes] = useState([]);
	const [error, setError] = useState(null);
	const router = useRouter(); // Use Next.js router for redirection

	const times = [
		"09:00",
		"10:00",
		"11:00",
		"12:00",
		"13:00",
		"14:00",
		"15:00",
		"16:00",
		"17:00",
	];

	// Fetch unavailable times when the date changes
	useEffect(() => {
		if (formData.date) {
			const fetchBookedTimes = async () => {
				try {
					const res = await fetch(
						`/api/appointments/times?date=${formData.date}`
					);
					const data = await res.json();
					setBookedTimes(data.bookedTimes);
				} catch (error) {
					console.error("Failed to fetch booked times:", error);
					setBookedTimes([]);
				}
			};

			fetchBookedTimes();
		}
	}, [formData.date]);

	// Filter available times by removing booked ones
	useEffect(() => {
		const filteredTimes = times.filter((time) => !bookedTimes.includes(time));
		setAvailableTimes(filteredTimes);
	}, [bookedTimes]);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null); // Reset error state

		const res = await fetch("/api/appointments/book", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ patientId, ...formData }),
		});

		if (res.ok) {
			// Redirect to the success page after successful booking
			router.push("/appointments/book/success");
		} else {
			const data = await res.json();
			setError(data.error || "Failed to book appointment.");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow-md w-96"
			>
				<h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}

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

				{availableTimes.length > 0 ? (
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="time"
						>
							Time
						</label>
						<select
							name="time"
							value={formData.time}
							onChange={handleInputChange}
							className="w-full p-2 border border-gray-300 rounded"
							required
						>
							<option value="">Select a time</option>
							{availableTimes.map((time) => (
								<option key={time} value={time}>
									{time}
								</option>
							))}
						</select>
					</div>
				) : (
					<p className="text-red-500">
						No available times for this date. Please select another date.
					</p>
				)}

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
