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

// Custom styles for react-select to match DatePicker
const customStyles = {
	control: (provided) => ({
		...provided,
		backgroundColor: "#ffffff", // White background
		borderColor: "#4b5563", // Tailwind gray-600 (identical to date picker)
		padding: "0.75rem", // Consistent padding with DatePicker
		fontSize: "1.25rem", // Same font size as DatePicker
		color: "#000000", // Black text
		height: "64px", // Set the height to match DatePicker input
		width: "67%", // Ensures full width like the DatePicker
		boxShadow: "none", // Remove default shadow
		borderRadius: "0.375rem", // Tailwind's rounded-lg
		"&:hover": {
			borderColor: "#4b5563", // Consistent hover state
		},
	}),
	singleValue: (provided) => ({
		...provided,
		color: "#000000", // Black text for selected option
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused ? "#4b5563" : "#ffffff", // Tailwind gray-600 on hover, white otherwise
		color: state.isFocused ? "#ffffff" : "#000000", // White text on hover, black otherwise
		fontSize: "1 rem", // Consistent font size
		padding: "10px",
		cursor: "pointer",
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: "#ffffff", // White background for dropdown
		width: "67%",
		borderRadius: "0.375rem", // Rounded corners like DatePicker
	}),
	menuList: (provided) => ({
		...provided,
		backgroundColor: "#ffffff", // White background
	}),
};

export default function BookAppointment() {
	const searchParams = useSearchParams();
	const router = useRouter(); // Initialize the router here
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
		setAvailableTimes(filteredTimes); // Filtered list only shows available times
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
			// Redirect to success page
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

				{/* Date Field */}
				<div className="mb-4 ">
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
						className="block text-gray-600  text-sm font-bold mb-2"
						htmlFor="time"
					>
						Time
					</label>
					<Select
						options={timeOptions} // Shows only available times
						styles={customStyles}
						placeholder="Select a time"
						onChange={handleTimeChange}
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
