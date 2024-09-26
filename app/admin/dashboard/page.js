"use client";

import { supabase } from "../../lib/supabaseClient";

const { data: appointments, error } = await supabase.from("Appointment")
	.select(`
    id,
    date,
    time,
    Patient (
      name,
      email
    )
  `);

if (error) {
	console.error("Error fetching appointments:", error);
} else {
	console.log("Appointments with patient details:", appointments);
}

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
	// State variables
	const [appointments, setAppointments] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const [loading, setLoading] = useState(true); // Loading state

	// Fetch appointments when the component mounts
	useEffect(() => {
		const loadAppointments = async () => {
			try {
				const data = await fetchAppointments();
				setAppointments(data);
			} catch (error) {
				console.error("Error fetching appointments:", error);
				toast.error("Failed to load appointments");
			} finally {
				setLoading(false); // Hide loading indicator when done
			}
		};
		loadAppointments();
	}, []);

	// Handle canceling the appointment
	const handleCancelConfirm = async () => {
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

	// Modal open/close functions
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

	// Show loading indicator while data is being fetched
	if (loading) {
		return <div>Loading appointments...</div>;
	}

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
