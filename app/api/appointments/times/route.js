import { supabase } from "../../../lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const date = searchParams.get("date");

	if (!date) {
		return NextResponse.json({ error: "Date is required" }, { status: 400 });
	}

	try {
		// Imposta l'inizio e la fine del giorno selezionato
		const selectedDate = new Date(date);
		const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
		const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

		// Converte le date in formato ISO per il confronto
		const { data: bookedAppointments, error } = await supabase
			.from("Appointment")
			.select("time")
			.gte("date", startOfDay.toISOString()) // gte = greater than or equal
			.lte("date", endOfDay.toISOString()); // lte = less than or equal

		if (error) {
			console.error("Error fetching appointments:", error);
			return NextResponse.json(
				{ error: "Failed to fetch booked times" },
				{ status: 500 }
			);
		}

		// Mappa gli orari degli appuntamenti prenotati
		const bookedTimes = bookedAppointments.map(
			(appointment) => appointment.time
		);

		return NextResponse.json({ bookedTimes });
	} catch (error) {
		console.error("Error in processing request:", error);
		return NextResponse.json(
			{ error: "Failed to fetch booked times" },
			{ status: 500 }
		);
	}
}
