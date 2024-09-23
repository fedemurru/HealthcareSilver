import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const date = searchParams.get("date");

	if (!date) {
		return NextResponse.json({ error: "Date is required" }, { status: 400 });
	}

	try {
		const selectedDate = new Date(date);
		const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
		const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

		const bookedAppointments = await prisma.appointment.findMany({
			where: {
				date: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
			select: {
				time: true,
			},
		});

		const bookedTimes = bookedAppointments.map(
			(appointment) => appointment.time
		);
		return NextResponse.json({ bookedTimes });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch booked times" },
			{ status: 500 }
		);
	}
}
