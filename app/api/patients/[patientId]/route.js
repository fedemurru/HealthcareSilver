import { supabase } from "../../../lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	const { patientId } = params;

	try {
		// Esegui la query su Supabase per cercare il paziente tramite l'ID
		const { data: patient, error } = await supabase
			.from("Patient")
			.select("*")
			.eq("id", Number(patientId)); // Filtra per ID (assicurati che sia un numero)

		// Gestisci eventuali errori
		if (error) {
			console.error("Error fetching patient details:", error);
			return NextResponse.json(
				{ error: "Failed to fetch patient details" },
				{ status: 500 }
			);
		}

		// Se il paziente non viene trovato
		if (!patient || patient.length === 0) {
			return NextResponse.json({ error: "Patient not found" }, { status: 404 });
		}

		// Restituisci i dettagli del paziente
		return NextResponse.json({ patient: patient[0] }); // patient[0] poiché Supabase restituisce sempre un array
	} catch (error) {
		console.error("Error in processing request:", error);
		return NextResponse.json(
			{ error: "Failed to fetch patient details" },
			{ status: 500 }
		);
	}
}
