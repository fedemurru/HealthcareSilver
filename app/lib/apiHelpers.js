// utils/apiHelpers.js
export const fetchAppointments = async () => {
	try {
		const response = await fetch("/api/appointments/book");
		if (!response.ok) {
			throw new Error("Failed to fetch appointments");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching appointments:", error);
		return [];
	}
};

export const cancelAppointment = async (appointmentId) => {
	try {
		const response = await fetch(`/api/appointments/book/${appointmentId}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Failed to cancel appointment");
		}
		return true;
	} catch (error) {
		console.error("Error canceling appointment:", error);
		return false;
	}
};

export const rescheduleAppointment = async (
	appointmentId,
	newDate,
	newTime
) => {
	try {
		const response = await fetch(`/api/appointments/book/${appointmentId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ newDate, newTime }),
		});

		if (!response.ok) {
			throw new Error("Failed to reschedule appointment");
		}

		return await response.json();
	} catch (error) {
		console.error("Error rescheduling appointment:", error);
		return null;
	}
};
