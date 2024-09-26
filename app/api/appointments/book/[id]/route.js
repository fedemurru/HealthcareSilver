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

// PUT: Reschedule appointment
export async function PUT(req, { params }) {
	const { id } = params; // Estrai l'ID dell'appuntamento dai parametri URL

	try {
		const { newDate, newTime } = await req.json(); // Ottieni la nuova data e il nuovo orario dal corpo della richiesta

		// Aggiorna l'appuntamento nel database utilizzando Supabase
		const { data, error } = await supabase
			.from("Appointment")
			.update({
				date: new Date(newDate), // Aggiorna la data come oggetto Date
				time: newTime, // Aggiorna l'orario
			})
			.eq("id", parseInt(id, 10)); // Filtra per ID

		if (error) {
			console.error("Error updating appointment:", error);
			return NextResponse.json(
				{ error: "Error updating appointment" },
				{ status: 500 }
			);
		}

		// Restituisci l'appuntamento aggiornato
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error("Error updating appointment:", error);
		return NextResponse.json(
			{ error: "Error updating appointment" },
			{ status: 500 }
		);
	}
}
