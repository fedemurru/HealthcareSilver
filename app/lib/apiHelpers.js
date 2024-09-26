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
		console.log(
			`Request to: ${API_URL}/api/appointments/book/${appointmentId}`
		);
		console.log("Dati inviati:", { newDate, newTime });

		const newDateObj = new Date(newDate);
		console.log("Tipo di newDateObj:", typeof newDateObj, newDateObj);

		const response = await fetch(
			`${API_URL}/api/appointments/book/${appointmentId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newDate: newDateObj, newTime }),
			}
		);

		if (!response.ok) {
			let errorData;
			try {
				errorData = await response.json();
			} catch (jsonError) {
				errorData = "No JSON body in the response";
			}
			console.error(
				"Failed to reschedule appointment:",
				response.status,
				errorData
			);
			throw new Error("Failed to reschedule appointment");
		}

		// Logga la risposta completa
		const data = await response.json();
		console.log("API response data completa:", data);

		// Verifica se esiste il campo "appointment"
		if (data && data.appointment) {
			return data.appointment;
		} else {
			console.warn(
				"Il campo 'appointment' non esiste nella risposta. Restituisco 'data'."
			);
			return data;
		}
	} catch (error) {
		console.error("Error rescheduling appointment:", error);
		return null;
	}
};
