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
	const { id } = params; // Estrai l'ID dell'appuntamento dai parametri URL

	try {
		const { newDate, newTime } = await req.json(); // Estrai la nuova data e l'orario dalla richiesta
		console.log("Rescheduling with:", newDate, newTime); // Logga la nuova data e il nuovo orario
		console.log("Appointment ID (as integer):", parseInt(id, 10)); // Logga l'ID dell'appuntamento

		// Verifica che i dati siano correttamente formattati prima dell'aggiornamento
		console.log("New date object:", new Date(newDate));

		// Esegui la query di aggiornamento
		const { data, error } = await supabase
			.from("Appointment")
			.update({
				date: new Date(newDate), // Assicurati che la data sia valida
				time: newTime, // Aggiorna l'orario
			})
			.eq("id", parseInt(id, 10)); // Filtra per ID

		// Logga l'errore di Supabase se c'è
		if (error) {
			console.error("Supabase Error:", error); // Verifica se ci sono errori specifici
			return NextResponse.json(
				{ error: "Error updating appointment" },
				{ status: 500 }
			);
		}

		// Logga i dati aggiornati restituiti da Supabase
		console.log("Updated data:", data);

		if (error) {
			console.error("Supabase Error:", error);
		}

		if (!data || data.length === 0) {
			console.log("No appointment found or updated");
			return NextResponse.json(
				{ error: "No appointment found or updated" },
				{ status: 404 }
			);
		}

		// Restituisci l'appuntamento aggiornato
		return NextResponse.json({ appointment: data[0] }, { status: 200 });
	} catch (error) {
		console.error("Error updating appointment:", error);
		return NextResponse.json(
			{ error: "Error updating appointment" },
			{ status: 500 }
		);
	}
}
