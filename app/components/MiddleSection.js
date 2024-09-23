"use client";
import Image from "next/image";
import React from "react";

export default function HeroSection() {
	return (
		<section className="w-full h-auto flex flex-col md:flex-row items-center justify-between py-12">
			{/* Left Section - Text */}
			<div className="md:w-1/2 w-full px-6 text-center md:text-left">
				<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
					Leading Family Chiropractor – Nottingham
				</h1>
				<p className="text-gray-600 text-lg mb-6">
					At Chiropractic, our approach is to treat the neuro-musculoskeletal
					system to treat not just your pain, but to improve your quality of
					life for the long term.
				</p>

				{/* Learn More button - Always under the text on larger screens */}
				<a
					href="/services"
					className="hidden md:inline-flex items-center text-blue-500 font-semibold hover:underline"
				>
					Learn More
					<svg
						className="ml-2 w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</a>
			</div>

			{/* Right Section - Image */}
			<div className="md:w-1/2 w-full md:h-96 h-90 px-6 mt-8 md:mt-0 flex justify-center">
				<Image
					src="/service2.jpg" // Update this path with your actual image
					alt="Doctor and Patient"
					width={500}
					height={400}
					className="rounded-md shadow-lg"
				/>
			</div>

			{/* Learn More button - At bottom of image on small screens */}
			<div className="md:hidden w-full mt-4 flex justify-center">
				<a
					href="/services"
					className="inline-flex items-center text-blue-500 font-semibold hover:underline"
				>
					Learn More
					<svg
						className="ml-2 w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</a>
			</div>
		</section>
	);
}
