import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(req) {
	const { name, email, phone, address } = await req.json();

	try {
		// Crea un nuovo paziente nella tabella "Patient" utilizzando Supabase
		const { data: newPatient, error } = await supabase
			.from("Patient")
			.insert([
				{
					name,
					email,
					phone,
					address,
				},
			])
			.select(); // Questo assicura che Supabase restituisca i dati appena inseriti

		// Gestione degli errori di Supabase
		if (error) {
			console.error("Error registering patient:", error);
			return NextResponse.json(
				{ error: "Error registering patient" },
				{ status: 500 }
			);
		}

		// Verifica che il risultato contenga i dati
		if (!newPatient || newPatient.length === 0) {
			return NextResponse.json(
				{ error: "Patient registration failed" },
				{ status: 500 }
			);
		}

		// Restituisci i dati del nuovo paziente
		return NextResponse.json(newPatient[0]); // Restituisce il primo elemento
	} catch (error) {
		console.error("Error registering patient:", error);
		return NextResponse.json(
			{ error: "Error registering patient" },
			{ status: 500 }
		);
	}
}
