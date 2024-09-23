// import { BASE_API_URL } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { BASE_API_URL } from "../../constants";

// Fetch project data from the API
const apiUrl = BASE_API_URL;

async function getProjectData(id) {
	try {
		const response = await fetch(`${apiUrl}/api/case/${id}`, {
			cache: "no-store",
		});
		if (!response.ok) throw new Error("Network response was not ok");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching project data:", error);
		return null;
	}
}
// ProjectDetail component
export default async function ProjectDetail({ params }) {
	const { id } = params;
	//Get params
	const project = await getProjectData(id);

	if (!apiUrl) {
		return null;
	}

	// Handle the case where project data is not found
	if (!project) {
		return (
			<p className="text-center text-red-500">
				Project not found or invalid data.
			</p>
		);
	}

	return (
		<div className="bg-gray-50 min-h-screen p-6">
			<header className="bg-primary text-white py-6 mb-12">
				<div className="container mx-auto text-center">
					<h1 className="text-4xl font-bold">{project.title}</h1>
					<p className="text-lg mt-2">{project.description}</p>
				</div>
			</header>

			<main className="container mx-auto">
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="relative w-full h-80">
						<Image
							src={project.image}
							alt={project.title}
							fill
							style={{ objectFit: "cover" }}
							className="w-full h-full"
						/>
					</div>
					<div className="p-6">
						<p className="text-gray-700 mb-6">{project.text}</p>
						<Link href="/services">
							<p className="text-primary font-semibold hover:underline">
								Back to Our Services
							</p>
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
