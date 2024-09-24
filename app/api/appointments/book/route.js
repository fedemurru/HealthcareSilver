import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req) {
	const { patientId, date, time } = await req.json();

	try {
		const newAppointment = await prisma.appointment.create({
			data: {
				patientId: patientId, // Link the appointment to the patient
				date: new Date(date), // Ensure the date is a valid DateTime
				time: time,
			},
		});

		return NextResponse.json(newAppointment);
	} catch (error) {
		console.error("Error creating appointment:", error);
		return NextResponse.json(
			{ error: "Error creating appointment" },
			{ status: 500 }
		);
	}
}

// Export the GET method
export async function GET() {
	try {
		const appointments = await prisma.appointment.findMany({
			include: {
				patient: true, // Include patient data
			},
		});
		console.log("Fetched appointments:", appointments); // Log for debugging
		return NextResponse.json(appointments);
	} catch (error) {
		console.error("Error fetching appointments:", error); // Log the error
		return NextResponse.json(
			{ error: "Error fetching appointments" },
			{ status: 500 }
		);
	}
}
