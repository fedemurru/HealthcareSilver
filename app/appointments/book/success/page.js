export default function Success() {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="bg-green-100 p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-green-700">
					Appointment Confirmed!
				</h1>
				<p className="mt-4 text-lg text-green-600">
					Your appointment has been successfully booked.
				</p>
				<a href="/" className="block mt-6 text-blue-500 hover:underline">
					Go back to Home
				</a>
			</div>
		</div>
	);
}
