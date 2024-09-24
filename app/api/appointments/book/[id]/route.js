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
