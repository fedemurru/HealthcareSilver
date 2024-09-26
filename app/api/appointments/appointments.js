// /pages/api/appointments.js
import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
	const { data: appointments, error } = await supabase.from("Appointment")
		.select(`
      id,
      date,
      time,
      Patient (
        name,
        email
      )
    `);

	if (error) {
		res.status(500).json({ error: "Failed to fetch appointments" });
	} else {
		res.status(200).json({ appointments });
	}
}
