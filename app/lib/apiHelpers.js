// utils/apiHelpers.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || ""; // Fallback to relative path if API URL isn't set

// Fetch all appointments
export const fetchAppointments = async () => {
	try {
		if (!API_URL) {
			return null;
		}
		const response = await fetch(`${API_URL}/api/appointments/book`);
		if (!response.ok) {
			throw new Error("Failed to fetch appointments");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching appointments:", error);
		return [];
	}
};

// Cancel an appointment by ID
export const cancelAppointment = async (appointmentId) => {
	try {
		if (!API_URL) {
			return null;
		}
		const response = await fetch(
			`${API_URL}/api/appointments/book/${appointmentId}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) {
			throw new Error("Failed to cancel appointment");
		}
		return true;
	} catch (error) {
		console.error("Error canceling appointment:", error);
		return false;
	}
};

// Reschedule an appointment with new date and time
export const rescheduleAppointment = async (
	appointmentId,
	newDate,
	newTime
) => {
	try {
		const response = await fetch(
			`${API_URL}/api/appointments/book/${appointmentId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newDate, newTime }),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to reschedule appointment");
		}

		return await response.json();
	} catch (error) {
		console.error("Error rescheduling appointment:", error);
		return null;
	}
};
