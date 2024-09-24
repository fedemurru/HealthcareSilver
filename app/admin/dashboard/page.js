// pages/admin/dashboard.js

"use client";
// pages/admin/dashboard.js
import { useState, useEffect } from "react";

const AdminDashboard = () => {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const response = await fetch("/api/appointments/book");
				if (!response.ok) {
					console.error("Failed to fetch appointments");
					return;
				}
				const data = await response.json();
				setAppointments(data);
			} catch (error) {
				console.error("Error fetching appointments:", error);
			}
		};
		fetchAppointments();
	}, []);

	return (
		<div className="min-h-screen p-6 bg-gray-100">
			<h1 className="text-2xl mb-6">Admin Dashboard</h1>
			<table className="table-auto w-full bg-white rounded shadow-md">
				<thead>
					<tr>
						<th className="px-4 py-2">Patient Name</th>
						<th className="px-4 py-2">Email</th>
						<th className="px-4 py-2">Date</th>
						<th className="px-4 py-2">Time</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment) => (
						<tr key={appointment.id}>
							<td className="border px-4 py-2">
								{appointment.patient?.name || "No name"}
							</td>
							<td className="border px-4 py-2">
								{appointment.patient?.email || "No Email"}
							</td>
							<td className="border px-4 py-2">
								{new Date(appointment.date).toLocaleDateString()}
							</td>
							<td className="border px-4 py-2">{appointment.time}</td>
							<td className="border px-4 py-2">
								<button
									onClick={() => handleReschedule(appointment.id, "newTime")}
									className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
								>
									Reschedule
								</button>
								<button
									onClick={() => handleCancel(appointment.id)}
									className="bg-red-500 text-white px-4 py-1 rounded"
								>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminDashboard;
