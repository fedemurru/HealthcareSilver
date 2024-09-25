import Head from "next/head";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const apiUrl =
	process.env.NODE_ENV === "development"
		? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
		: null; // In production, return null if no API is set

async function getData() {
	if (!apiUrl) {
		if (process.env.NODE_ENV === "production") {
			console.error("API URL is not available in production.");
			// Optionally, disable features that require API in production
			return <div>API is currently not available. Please try again later.</div>;
		} else {
			console.error("API URL is not set in development.");
			return null;
		}
	}
	try {
		const response = await fetch(`${apiUrl}/api/case`, {
			cache: "no-cache",
		});
		const data = await response.json();
		return data;
		//console.log(caseStudies);
	} catch (error) {
		console.log(error, "error while fetching data");
		return [];
	}
}

async function WorkPage() {
	const caseStudies = await getData();

	return (
		<div className="bg-gray-50 mt-10 p-6">
			<header className="bg-primary text-white py-6 mb-12">
				<div className="container mx-auto text-center">
					<h1 className="text-4xl font-bold">Our Services</h1>
					<p className="text-lg mt-2">
						Explore some of the projects we have successfully delivered.
					</p>
				</div>
			</header>

			<main className="container mx-auto">
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{caseStudies.map((caseStudy, index) => (
						<div
							key={index}
							className="bg-white rounded-lg shadow-md overflow-hidden"
						>
							<div className="relative w-full h-60">
								<Image
									src={caseStudy.image}
									alt={caseStudy.title}
									layout="fill"
									style={{ objectFit: "cover" }}
									className="w-full h-full"
								/>
							</div>
							<div className="p-6">
								<h2 className="text-2xl font-semibold mb-4">
									{caseStudy.title}
								</h2>
								<p className="text-gray-700 mb-4">{caseStudy.description}</p>
								<Link href={`/services/${caseStudy.id}`}>
									<p className="text-primary font-semibold hover:underline">
										Read More
									</p>
								</Link>
							</div>
						</div>
					))}
				</section>
			</main>
		</div>
	);
}

export default WorkPage;
