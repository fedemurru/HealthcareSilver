import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient"; // Assicurati di aver configurato il client Supabase

// POST method: Create a new appointment
export async function POST(req) {
	const { patientId, date, time } = await req.json();

	try {
		// Inserisci un nuovo appuntamento nella tabella "Appointment"
		const { data, error } = await supabase.from("Appointment").insert([
			{
				patientId: parseInt(patientId, 10), // Associa l'appuntamento al paziente
				date: new Date(date), // Assicura che la data sia valida
				time: time,
			},
		]);

		if (error) {
			console.error("Error creating appointment:", error);
			return NextResponse.json(
				{ error: "Error creating appointment" },
				{ status: 500 }
			);
		}

		return NextResponse.json(data); // Restituisci l'appuntamento appena creato
	} catch (error) {
		console.error("Error creating appointment:", error);
		return NextResponse.json(
			{ error: "Error creating appointment" },
			{ status: 500 }
		);
	}
}

// GET method: Fetch all appointments with patient data
export async function GET() {
	try {
		// Ottieni gli appuntamenti dalla tabella "Appointment" con i dettagli del paziente
		const { data: appointments, error } = await supabase.from("Appointment")
			.select(`
				id,
				date,
				time,
				Patient (
					id,
					name,
					email,
					phone,
					address
				)
			`);

		if (error) {
			console.error("Error fetching appointments:", error);
			return NextResponse.json(
				{ error: "Error fetching appointments" },
				{ status: 500 }
			);
		}

		console.log("Fetched appointments:", appointments); // Log per debug
		return NextResponse.json(appointments); // Restituisci gli appuntamenti con i dettagli del paziente
	} catch (error) {
		console.error("Error fetching appointments:", error); // Log dell'errore
		return NextResponse.json(
			{ error: "Error fetching appointments" },
			{ status: 500 }
		);
	}
}
