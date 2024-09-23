import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req) {
	const { name, email, phone, address } = await req.json();

	try {
		const patient = await prisma.patient.create({
			data: {
				name,
				email,
				phone,
				address,
			},
		});

		return NextResponse.json({ id: patient.id });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to register patient" },
			{ status: 500 }
		);
	}
}
