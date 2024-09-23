"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// England bank holidays for 2024 (add more as needed)
const bankHolidays = [
	new Date("2024-01-01"), // New Year's Day
	new Date("2024-03-29"), // Good Friday
	new Date("2024-04-01"), // Easter Monday
	new Date("2024-05-06"), // Early May Bank Holiday
	new Date("2024-05-27"), // Spring Bank Holiday
	new Date("2024-08-26"), // Summer Bank Holiday
	new Date("2024-12-25"), // Christmas Day
	new Date("2024-12-26"), // Boxing Day
];

// Define all possible time slots
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

export default function BookAppointment() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const patientId = searchParams.get("patientId");

	const [formData, setFormData] = useState({ date: "", time: "" });
	const [availableTimes, setAvailableTimes] = useState([]);
	const [bookedTimes, setBookedTimes] = useState([]);
	const [error, setError] = useState(null);

	// Fetch booked time slots when the date changes
	useEffect(() => {
		if (formData.date) {
			const fetchBookedTimes = async () => {
				try {
					const res = await fetch(
						`/api/appointments/times?date=${formData.date}`
					);
					const data = await res.json();

					if (Array.isArray(data.bookedTimes)) {
						setBookedTimes(data.bookedTimes); // Save booked times from API
					} else {
						setBookedTimes([]); // Default to empty if no times are booked
					}
				} catch (error) {
					console.error("Failed to fetch booked times:", error);
					setBookedTimes([]); // In case of error, default to no booked times
				}
			};

			fetchBookedTimes();
		}
	}, [formData.date]);

	// Filter available times by removing booked times
	useEffect(() => {
		const filteredTimes = times.filter((time) => !bookedTimes.includes(time));
		setAvailableTimes(filteredTimes); // Update available times after filtering
	}, [bookedTimes]);

	const handleDateChange = (date) => {
		setFormData({ ...formData, date });
	};

	const handleTimeChange = (selectedOption) => {
		setFormData({ ...formData, time: selectedOption.value });
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
			router.push("/appointments/book/success");
		} else {
			const data = await res.json();
			setError(data.error || "Failed to book appointment.");
		}
	};

	// Options for react-select dropdown
	const timeOptions = availableTimes.map((time) => ({
		value: time,
		label: time,
	}));

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow-md w-96"
			>
				<h1 className="text-2xl font-bold text-center mb-4">
					{patientId ? `Welcome! Let's book your appointment.` : "Loading..."}
				</h1>

				{/* Appointment Form Section */}
				<h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}

				{/* Date Field */}
				<div className="mb-4">
					<label
						className="block text-gray-600 text-sm font-bold mb-2"
						htmlFor="date"
					>
						Date
					</label>
					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={(e) => setFormData({ ...formData, date: e.target.value })}
						className="w-full p-4 text-lg border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-600 text-sm font-bold mb-2"
						htmlFor="time"
					>
						Time
					</label>
					<Select
						options={timeOptions}
						styles={{
							control: (provided) => ({
								...provided,
								backgroundColor: "#ffffff", // White background
								borderColor: "#d1d5db", // Gray-300 border to match date input
								padding: "0.5rem 1rem", // Padding similar to date input
								fontSize: "1.125rem", // Font size (text-lg in Tailwind)
								color: "#374151", // Tailwind gray-700 for text color
								borderRadius: "0.375rem", // Rounded corners
								boxShadow: "none", // Remove default shadow
								height: "auto", // Auto height to match inputs
								"&:hover": {
									borderColor: "#4b5563", // Hover border color to match date input
								},
							}),
							singleValue: (provided) => ({
								...provided,
								color: "#374151", // Same text color as input
							}),
							menu: (provided) => ({
								...provided,
								borderRadius: "0.375rem", // Rounded corners for dropdown
							}),
						}}
						placeholder="Select a time"
						onChange={handleTimeChange}
						isDisabled={availableTimes.length === 0} // Disable if no times available
					/>
				</div>

				<button
					type="submit"
					className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
					disabled={!formData.time} // Disable if no time is selected
				>
					Book Appointment
				</button>
			</form>
		</div>
	);
}
