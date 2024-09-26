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
		// Estrai la nuova data e l'orario dalla richiesta
		const { newDate, newTime } = await req.json();
		console.log("Rescheduling with:", newDate, newTime); // Logga la nuova data e il nuovo orario
		console.log("Appointment ID (as integer):", parseInt(id, 10)); // Logga l'ID dell'appuntamento

		// Verifica che i dati siano correttamente formattati prima dell'aggiornamento
		console.log("New date object:", new Date(newDate));

		// Esegui la query per verificare se l'ID esiste
		const appointmentId = Number(id); // Converte l'ID in un numero

		const { data: existingAppointment, error: fetchError } = await supabase
			.from("Appointment")
			.select("*")
			.eq("id", appointmentId)
			.single();

		// Se non esiste un appuntamento con quell'ID, restituisci un errore 404
		if (!existingAppointment) {
			console.log("No appointment found with this ID");
			return NextResponse.json(
				{ error: "No appointment found before update" },
				{ status: 404 }
			);
		}

		// Esegui la query di aggiornamento
		const { data, error } = await supabase
			.from('"Appointment"')
			.update({
				time: newTime, // Aggiorna solo il tempo
			})
			.eq('"id"', appointmentId); // Colonna id racchiusa tra virgolette doppie

		// Logga il tipo di dato dell'ID e i dati inviati
		console.log("Tipo di id passato a Supabase:", typeof appointmentId); // Deve risultare 'number'
		console.log("Invio aggiornamento a Supabase:", {
			date: new Date(newDate),
			time: newTime,
		});

		// Se c'è un errore, logga i dettagli
		if (error) {
			console.error("Supabase Error:", error); // Verifica se ci sono errori specifici
			return NextResponse.json(
				{ error: "Error updating appointment", details: error },
				{ status: 500 }
			);
		}

		// Se non ci sono dati aggiornati, restituisci un errore
		if (!data || data.length === 0) {
			console.log("No appointment found or updated");
			return NextResponse.json(
				{ error: "No appointment found or updated" },
				{ status: 404 }
			);
		}

		// Logga i dati aggiornati restituiti da Supabase
		console.log("Updated data:", data);

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
