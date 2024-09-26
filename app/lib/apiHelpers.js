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

		const newDateObj = new Date(newDate); // Converte la stringa in oggetto Date
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
				errorData = await response.json(); // Prova a ottenere il body JSON
			} catch (jsonError) {
				errorData = "No JSON body in the response"; // Se non c'è JSON, aggiungi un messaggio di fallback
			}
			console.error(
				"Failed to reschedule appointment:",
				response.status,
				errorData
			);
			throw new Error("Failed to reschedule appointment");
		}

		const data = await response.json(); // Ottieni i dati della risposta
		console.log("API response data:", data); // Logga i dati per verificare il risultato

		return data.appointment ? data.appointment : data; // Verifica i campi della risposta
	} catch (error) {
		console.error("Error rescheduling appointment:", error);
		return null; // Ritorna null in caso di errore
	}
};
