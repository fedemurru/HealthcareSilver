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
					<DatePicker
						selected={formData.date}
						onChange={handleDateChange}
						className="w-full p-4 text-lg border border-gray-600 rounded-lg bg-white text-gray-600"
						dateFormat="MM/dd/yyyy"
						placeholderText="Select a date"
						required
					/>
				</div>

				{/* Time Field */}
				<div className="mb-4">
					<label
						className="block text-gray-600 text-sm font-bold mb-2"
						htmlFor="time"
					>
						Time
					</label>
					<Select
						options={timeOptions} // Shows only available times
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
