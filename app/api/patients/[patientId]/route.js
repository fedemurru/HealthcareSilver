import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	const { patientId } = params;

	try {
		const patient = await prisma.patient.findUnique({
			where: {
				id: Number(patientId), // Ensure the ID is passed as an integer
			},
		});

		if (!patient) {
			return NextResponse.json({ error: "Patient not found" }, { status: 404 });
		}

		return NextResponse.json({ patient });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch patient details" },
			{ status: 500 }
		);
	}
}
