"use client";

import React, { useState } from "react";

const RescheduleModal = ({ isOpen, onClose, onConfirm, appointment }) => {
	const [newDate, setNewDate] = useState("");
	const [newTime, setNewTime] = useState("");

	if (!isOpen) return null;

	const handleSubmit = () => {
		if (newDate && newTime) {
			onConfirm(newDate, newTime); // Pass the new date and time to the confirm function
		} else {
			alert("Both date and time are required");
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
				<h2 className="text-xl font-bold mb-4">Reschedule Appointment</h2>
				<p className="mb-6">
					You are rescheduling the appointment for{" "}
					{appointment.patient?.name || "Unknown"}.
				</p>
				<div className="mb-4">
					<label className="block mb-2">New Date:</label>
					<input
						type="date"
						value={newDate}
						onChange={(e) => setNewDate(e.target.value)}
						className="w-full border p-2 rounded"
					/>
				</div>
				<div className="mb-6">
					<label className="block mb-2">New Time:</label>
					<input
						type="time"
						value={newTime}
						onChange={(e) => setNewTime(e.target.value)}
						className="w-full border p-2 rounded"
					/>
				</div>
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default RescheduleModal;
