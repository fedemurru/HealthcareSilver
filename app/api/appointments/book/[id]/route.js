// pages/api/appointments/book/[id].js
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	const { id } = params; // Get the appointment ID from the URL params

	try {
		await prisma.appointment.delete({
			where: { id: parseInt(id, 10) }, // Ensure the ID is correctly parsed to an integer
		});

		return NextResponse.json({ message: "Appointment canceled successfully" });
	} catch (error) {
		console.error("Error canceling appointment:", error);
		return NextResponse.json(
			{ error: "Error canceling appointment" },
			{ status: 500 }
		);
	}
}

export async function PUT(req, { params }) {
	const { id } = params; // Get appointment ID from the URL params
	const { newDate, newTime } = await req.json(); // Get the new date and time from the request body

	try {
		// Update the appointment in the database and include the patient details
		const updatedAppointment = await prisma.appointment.update({
			where: { id: parseInt(id, 10) }, // Ensure the ID is an integer
			data: {
				date: new Date(newDate), // Ensure date is stored correctly
				time: newTime,
			},
			include: {
				patient: true, // Include the patient details in the response
			},
		});

		return NextResponse.json(updatedAppointment); // Send the updated appointment with patient data as JSON
	} catch (error) {
		console.error("Error updating appointment:", error);
		return NextResponse.json(
			{ error: "Error updating appointment" },
			{ status: 500 }
		);
	}
}
