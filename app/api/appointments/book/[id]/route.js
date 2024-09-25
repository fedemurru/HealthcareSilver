// pages/api/appointments/book/[id].js
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

// DELETE: Cancel appointment
export async function DELETE(req, { params }) {
	const { id } = params; // Extract the appointment ID from the URL params

	try {
		// Ensure the appointment ID is an integer and delete the appointment
		await prisma.appointment.delete({
			where: { id: parseInt(id, 10) }, // Parse the ID to an integer
		});

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
	const { id } = params; // Extract the appointment ID from the URL params

	try {
		const { newDate, newTime } = await req.json(); // Get the new date and time from the request body

		// Update the appointment in the database
		const updatedAppointment = await prisma.appointment.update({
			where: { id: parseInt(id, 10) }, // Ensure the appointment ID is an integer
			data: {
				date: new Date(newDate), // Convert the new date to a Date object
				time: newTime, // Update the time
			},
			include: {
				patient: true, // Include patient details in the response
			},
		});

		return NextResponse.json(updatedAppointment, { status: 200 }); // Send the updated appointment as a response
	} catch (error) {
		console.error("Error updating appointment:", error);
		return NextResponse.json(
			{ error: "Error updating appointment" },
			{ status: 500 }
		);
	}
}
