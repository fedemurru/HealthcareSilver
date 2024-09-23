import { NextResponse } from "next/server";

export const caseStudies = [
	{
		id: 1,
		title: "Pediatric Care",
		description:
			"Comprehensive care for children, including routine check-ups, vaccinations, and treatment of common childhood illnesses.",
		text: "Our pediatric care services are designed to provide children with a comfortable and reassuring environment for their medical needs. We offer a range of services from preventive care to treatment for acute illnesses, ensuring that every child receives the highest quality of care tailored to their age and developmental stage.",
		image: "/service2.jpg",
		link: "/project-a",
	},
	{
		id: 2,
		title: "Orthopedic Services",
		description:
			"Specialized orthopedic care for musculoskeletal issues, including injury treatment, surgery, and rehabilitation.",
		text: "Our orthopedic services focus on diagnosing and treating musculoskeletal issues with a multidisciplinary approach. Whether you’re recovering from an injury or managing a chronic condition, our expert team provides personalized treatment plans that include cutting-edge surgical techniques and comprehensive rehabilitation programs.",
		image: "/service4.jpg",
		link: "/project-b",
	},
	{
		id: 3,
		title: "Cardiology Consultation",
		description:
			"Expert consultations for heart health, including diagnostics, treatment plans, and ongoing care from top cardiologists.",
		text: "Our cardiology consultations offer a thorough evaluation of your heart health with a focus on both preventive and corrective care. We utilize the latest diagnostic tools to assess your condition and create a tailored treatment plan that addresses your specific needs, ensuring ongoing support from experienced cardiologists.",
		image: "/service1.jpg",
		link: "/project-c",
	},

	// Add more projects as needed
];

export const GET = (req, res) => {
	try {
		if (!caseStudies) {
			return NextResponse.json(
				{ message: "No data available" },
				{
					status: 404,
					headers: {
						"Cache-Control": "no-store", // Prevent caching
					},
				}
			);
		}

		return NextResponse.json(caseStudies, {
			headers: {
				"Cache-Control": "no-store", // Prevent caching
			},
		});
	} catch (error) {
		console.error("Error handling GET request:", error);

		return NextResponse.json(
			{
				message: "An error occurred while processing your request.",
				cause: error.message || "Unknown error",
			},
			{
				status: 500,
				headers: {
					"Cache-Control": "no-store", // Prevent caching
				},
			}
		);
	}
};
