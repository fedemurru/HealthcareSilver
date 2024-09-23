import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const date = searchParams.get("date");

	try {
		// Fetch appointments for the selected date
		const appointments = await prisma.appointment.findMany({
			where: {
				date: new Date(date),
			},
			select: {
				time: true, // We only need the time field
			},
		});

		const bookedTimes = appointments.map((appointment) => appointment.time);

		return NextResponse.json({ bookedTimes });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch booked times" },
			{ status: 500 }
		);
	}
}
