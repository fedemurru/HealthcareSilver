import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req) {
	const { name, email, phone, date, time } = await req.json();

	try {
		const appointment = await prisma.appointment.create({
			data: {
				name,
				email,
				phone,
				date: new Date(date),
				time,
			},
		});
		return NextResponse.json({ appointment });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to book appointment" },
			{ status: 500 }
		);
	}
}
