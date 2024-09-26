// pages/api/appointments/book/[id].js
import { supabase } from "../../../../lib/supabaseClient";
import { NextResponse } from "next/server";

// DELETE: Cancel appointment
export async function DELETE(req, { params }) {
	const { id } = params; // Estrai l'ID dell'appuntamento dai parametri URL

	try {
		// Elimina l'appuntamento utilizzando Supabase
		const { data, error } = await supabase
			.from("Appointment")
			.delete()
			.eq("id", parseInt(id, 10)); // Filtra per ID

		if (error) {
			console.error("Error canceling appointment:", error);
			return NextResponse.json(
				{ error: "Error canceling appointment" },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Appointment canceled successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error canceling appointment:", error);
		return NextResponse.json(
			{ error: "Error canceling appointment" },
			{ status: 500 }
		);
	}
}

export async function PUT(req, { params }) {
	const { id } = params;

	try {
		const { newDate, newTime } = await req.json();
		console.log("Rescheduling with:", newDate, newTime);

		const newDateObj = new Date(newDate);
		console.log("Dati inviati a Supabase:", { newDateObj, newTime });

		const appointmentId = Number(id); // Assicurati che l'ID sia un numero intero

		// Aggiorna l'appuntamento in Supabase e richiedi di restituire i dati aggiornati
		const { data, error } = await supabase
			.from("Appointment")
			.update({
				date: newDateObj,
				time: newTime,
			})
			.eq("id", appointmentId)
			.select("*"); // Assicurati di selezionare i dati aggiornati

		// Logga i dati restituiti da Supabase
		console.log("Dati restituiti da Supabase:", data);

		if (error) {
			console.error("Errore Supabase:", error);
			return NextResponse.json(
				{ error: "Error updating appointment", details: error },
				{ status: 500 }
			);
		}

		if (!data || data.length === 0) {
			console.log("Nessun appuntamento trovato o aggiornato");
			return NextResponse.json(
				{ error: "No appointment found or updated" },
				{ status: 404 }
			);
		}

		// Se l'aggiornamento è avvenuto con successo
		return NextResponse.json({ appointment: data[0] }, { status: 200 });
	} catch (error) {
		console.error("Errore durante l'aggiornamento dell'appuntamento:", error);
		return NextResponse.json(
			{ error: "Error updating appointment", details: error },
			{ status: 500 }
		);
	}
}
