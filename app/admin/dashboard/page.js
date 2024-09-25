"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import RescheduleModal from "../../components/RescheduleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentsTable from "../../components/AppointmentsTable";

// Import helper functions
import {
	fetchAppointments,
	cancelAppointment,
	rescheduleAppointment,
} from "../../lib/apiHelpers";

const AdminDashboard = () => {
	const [appointments, setAppointments] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
	const [selectedAppointment, setSelectedAppointment] = useState(null);

	// Fetch appointments when the component mounts
	useEffect(() => {
		const loadAppointments = async () => {
			if (!API_URL) {
				return null;
			}
			const data = await fetchAppointments();
			setAppointments(data);
		};
		loadAppointments();
	}, []);

	// Handle canceling the appointment
	const handleCancelConfirm = async () => {
		if (!API_URL) {
			return null;
		}
		if (!selectedAppointment) return;
		const success = await cancelAppointment(selectedAppointment.id);

		if (success) {
			setAppointments((prev) =>
				prev.filter((appointment) => appointment.id !== selectedAppointment.id)
			);
			toast.success("Appointment canceled successfully");
			closeModal();
		} else {
			toast.error("Failed to cancel appointment");
		}
	};

	// Handle rescheduling the appointment
	const handleRescheduleConfirm = async (newDate, newTime) => {
		if (!selectedAppointment) return;
		if (!API_URL) {
			return null;
		}
		const updatedAppointment = await rescheduleAppointment(
			selectedAppointment.id,
			newDate,
			newTime
		);

		if (updatedAppointment) {
			setAppointments((prev) =>
				prev.map((appointment) =>
					appointment.id === updatedAppointment.id
						? updatedAppointment
						: appointment
				)
			);
			toast.success("Appointment rescheduled successfully");
			setIsRescheduleModalOpen(false);
		} else {
			toast.error("Failed to reschedule appointment");
		}
	};

	const openModal = (appointment) => {
		setSelectedAppointment(appointment);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedAppointment(null);
		setIsModalOpen(false);
	};

	const openRescheduleModal = (appointment) => {
		setSelectedAppointment(appointment);
		setIsRescheduleModalOpen(true);
	};

	const closeRescheduleModal = () => {
		setSelectedAppointment(null);
		setIsRescheduleModalOpen(false);
	};

	return (
		<div className="min-h-screen p-6 bg-gray-100">
			<h1 className="text-2xl mb-6">Admin Dashboard</h1>
			<AppointmentsTable
				appointments={appointments}
				openRescheduleModal={openRescheduleModal}
				openCancelModal={openModal}
			/>
			<ToastContainer />

			{/* Reschedule Modal */}
			<RescheduleModal
				isOpen={isRescheduleModalOpen}
				onClose={closeRescheduleModal}
				onConfirm={handleRescheduleConfirm}
				appointment={selectedAppointment}
			/>

			{/* Cancel Modal */}
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
