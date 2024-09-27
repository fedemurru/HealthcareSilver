// components/AppointmentsTable.js

const AppointmentsTable = ({
	appointments,
	openRescheduleModal,
	openCancelModal,
}) => {
	return (
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
							{appointment.Patient?.name || "Unknown"}
						</td>
						<td className="border px-4 py-2">
							{appointment.Patient?.email || "No Email"}
						</td>
						<td className="border px-4 py-2">
							{new Date(appointment.date).toLocaleDateString()}
						</td>
						<td className="border px-4 py-2">{appointment.time}</td>
						<td className="border px-4 py-2">
							<button
								onClick={() => openRescheduleModal(appointment)}
								className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
							>
								Reschedule
							</button>
							<button
								onClick={() => openCancelModal(appointment)}
								className="bg-red-500 text-white px-4 py-1 rounded"
							>
								Cancel
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default AppointmentsTable;
