"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function BookAppointment() {
	const searchParams = useSearchParams();
	const patientId = searchParams.get("patientId");

	const [patient, setPatient] = useState(null); // Store patient details
	const [formData, setFormData] = useState({
		date: "",
		time: "",
	});
	const [availableTimes, setAvailableTimes] = useState([]);
	const [bookedTimes, setBookedTimes] = useState([]);
	const [error, setError] = useState(null);

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

	// Fetch patient details when the component mounts
	useEffect(() => {
		const fetchPatientDetails = async () => {
			try {
				const res = await fetch(`/api/patients/${patientId}`);
				if (!res.ok) {
					throw new Error(`Failed to fetch patient: ${res.status}`);
				}
				const data = await res.json();
				setPatient(data.patient);
			} catch (error) {
				console.error("Failed to fetch patient details:", error);
				setPatient(null);
			}
		};

		if (patientId) {
			fetchPatientDetails();
		}
	}, [patientId]);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			// Redirect to success page (you've already implemented this part)
			router.push("/appointments/success");
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
				{/* Dynamic Greeting Section */}
				<h1 className="text-2xl font-bold text-center mb-4">
					{patient ? `Welcome, ${patient.name}!` : "Loading..."}
				</h1>
				<p className="text-center text-gray-600 mb-6">
					{patient
						? "Now, let's book your first appointment."
						: "We're fetching your details..."}
				</p>

				{/* Appointment Form Section */}
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
