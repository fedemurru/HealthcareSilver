"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
	const [appointments, setAppointments] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAppointment, setSelectedAppointment] = useState(null);

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const response = await fetch("/api/appointments/book");
				if (!response.ok) {
					console.error("Failed to fetch appointments");
					return;
				}
				const data = await response.json();
				setAppointments(data);
			} catch (error) {
				console.error("Error fetching appointments:", error);
			}
		};
		fetchAppointments();
	}, []);

	// Open the modal and store the selected appointment
	const openModal = (appointment) => {
		setSelectedAppointment(appointment);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedAppointment(null);
		setIsModalOpen(false);
	};

	const handleCancelConfirm = async () => {
		if (!selectedAppointment) return;

		try {
			const response = await fetch(
				`/api/appointments/book/${selectedAppointment.id}`,
				{
					method: "DELETE",
				}
			);

			if (response.ok) {
				setAppointments(
					appointments.filter(
						(appointment) => appointment.id !== selectedAppointment.id
					)
				);
				toast.success("Appointment canceled successfully");
				closeModal(); // Close the modal after canceling
			} else {
				console.error("Failed to cancel appointment");
				toast.error("Failed to cancel appointment");
			}
		} catch (error) {
			console.error("Error canceling appointment:", error);
			toast.error("Error canceling appointment");
		}
	};

	const handleReschedule = async (id) => {
		const newDate = prompt("Enter the new date (YYYY-MM-DD):");
		const newTime = prompt("Enter the new time (HH:MM):");

		if (!newDate || !newTime) {
			alert("Date and time are required");
			return;
		}

		try {
			const response = await fetch(`/api/appointments/book/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newDate, newTime }),
			});

			if (response.ok) {
				const updatedAppointment = await response.json();
				setAppointments((prevAppointments) =>
					prevAppointments.map((appointment) =>
						appointment.id === updatedAppointment.id
							? updatedAppointment
							: appointment
					)
				);
				toast.success("Appointment rescheduled successfully");
			} else {
				console.error("Failed to reschedule appointment");
				toast.error("Failed to reschedule appointment");
			}
		} catch (error) {
			console.error("Error rescheduling appointment:", error);
			toast.error("Error rescheduling appointment");
		}
	};

	return (
		<div className="min-h-screen p-6 bg-gray-100">
			<h1 className="text-2xl mb-6">Admin Dashboard</h1>
			<table className="table-auto w-full bg-white rounded shadow-md">
				<thead>
					<tr>
						<th className="px-4 py-2">Patient Name</th>
						<th className="px-4 py-2">Email</th>
						<th className="px-4 py-2">Date</th>
						<th className="px-4 py-2">Time</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment) => (
						<tr key={appointment.id}>
							<td className="border px-4 py-2">
								{appointment.patient?.name || "Unknown"}
							</td>
							<td className="border px-4 py-2">
								{appointment.patient?.email || "No Email"}
							</td>
							<td className="border px-4 py-2">
								{new Date(appointment.date).toLocaleDateString()}
							</td>
							<td className="border px-4 py-2">{appointment.time}</td>
							<td className="border px-4 py-2">
								<button
									onClick={() => handleReschedule(appointment.id)}
									className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
								>
									Reschedule
								</button>
								<button
									onClick={() => openModal(appointment)} // Open modal when "Cancel" is clicked
									className="bg-red-500 text-white px-4 py-1 rounded"
								>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ToastContainer />

			{/* Modal for confirmation */}
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={handleCancelConfirm}
				title="Confirm Cancellation"
				message="Are you sure you want to cancel this appointment?"
			/>
		</div>
	);
};

export default AdminDashboard;
