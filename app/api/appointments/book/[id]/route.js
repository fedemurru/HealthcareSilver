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

		const newDateObj = new Date(newDate); // Assicurati che newDate sia un oggetto Date
		console.log("Dati inviati a Supabase:", { newDateObj, newTime });

		const appointmentId = Number(id); // Verifica che l'ID sia un numero

		const { data, error } = await supabase
			.from("Appointment")
			.update({
				date: newDateObj, // Usa un oggetto Date per la colonna 'date'
				time: newTime,
			})
			.eq("id", appointmentId);

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

		return NextResponse.json({ appointment: data[0] }, { status: 200 });
	} catch (error) {
		console.error("Errore nell'aggiornamento dell'appuntamento:", error);
		return NextResponse.json(
			{ error: "Error updating appointment" },
			{ status: 500 }
		);
	}
}
