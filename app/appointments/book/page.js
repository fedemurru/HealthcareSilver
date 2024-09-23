"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Select from "react-select";

// Custom styles for react-select
const customStyles = {
	control: (provided) => ({
		...provided,
		backgroundColor: "#ffffff", // White background for the select input
		borderColor: "#4b5563", // Tailwind gray-600
		padding: "0.75rem",
		fontSize: "1.25rem", // Tailwind text-lg
		color: "#000000", // Black text color
	}),
	singleValue: (provided) => ({
		...provided,
		color: "#000000", // Black selected option text
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused ? "#4b5563" : "#ffffff", // Gray background on hover, white by default
		color: state.isFocused ? "#ffffff" : "#000000", // White text on hover, black otherwise
		fontSize: "1.25rem", // Larger font size for options
		padding: "10px",
		cursor: "pointer",
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: "#ffffff", // White background for the entire dropdown menu
	}),
	menuList: (provided) => ({
		...provided,
		backgroundColor: "#ffffff", // Ensure menu list background is white
	}),
};
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
			// Redirect to success page (you've already implemented this part)
			router.push("/appointments/success");
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
					<Select
						options={timeOptions}
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
