import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req) {
	const { name, email, phone, address } = await req.json();

	try {
		// Create a new patient record in the database
		const newPatient = await prisma.patient.create({
			data: {
				name,
				email,
				phone,
				address,
			},
		});

		return NextResponse.json(newPatient);
	} catch (error) {
		console.error("Error registering patient:", error);
		return NextResponse.json(
			{ error: "Error registering patient" },
			{ status: 500 }
		);
	}
}
