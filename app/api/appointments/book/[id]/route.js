// pages/api/appointments/book/[id].js
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
	const { id } = req.query;

	if (req.method === "DELETE") {
		try {
			await prisma.appointment.delete({
				where: { id: parseInt(id, 10) },
			});
			res.status(204).end(); // No content, operation successful
		} catch (error) {
			res.status(500).json({ error: "Error deleting appointment" });
		}
	} else if (req.method === "PUT") {
		const { newTime } = req.body;
		try {
			const appointment = await prisma.appointment.update({
				where: { id: parseInt(id, 10) },
				data: { time: newTime },
			});
			res.status(200).json(appointment);
		} catch (error) {
			res.status(500).json({ error: "Error updating appointment" });
		}
	}
}
