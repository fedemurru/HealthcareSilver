"use client";

import Link from "next/link";
import { faqs } from "../constants";
import Image from "next/image";
import { useState } from "react";

// pages/faq.js
export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleAccordion = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	//console.log(faqs);

	return (
		<div className="bg-gray-50 min-h-screen p-6">
			<header className="bg-primary text-white py-6 mb-12">
				<div className="container mx-auto text-center">
					<h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
					<p className="text-lg mt-2">
						Find answers to common questions about our services.
					</p>
				</div>
			</header>

			<main className="container mx-auto">
				{/* FAQ Section */}
				<section className="mb-12">
					<div className="flex flex-col md:flex-row md:space-x-8">
						{/* Image */}
						<div className="lg:w-1/2 mb-6 lg:mb-0">
							<Image
								src="/faq.jpg"
								alt="FAQ Illustration"
								width={800}
								height={400}
								className="w-full h-auto rounded-lg shadow-md"
							/>
						</div>

						{/* FAQ Content */}
						<div className="lg:w-1/2">
							<div className="space-y-4">
								{faqs.map((faq, index) => (
									<div key={index} className="bg-white rounded-lg shadow-md">
										<button
											className="w-full px-6 py-4 text-left text-lg font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
											onClick={() => toggleAccordion(index)}
										>
											{faq.question}
										</button>
										<div
											className={`transition-height duration-300 ease-in-out overflow-hidden ${
												openIndex === index ? "max-h-[1000px] p-5" : "max-h-0"
											}`}
											style={{
												maxHeight: openIndex === index ? "1000px" : "0",
											}}
										>
											<p
												dangerouslySetInnerHTML={{ __html: faq.answer }}
												className="text-gray-700"
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="bg-primary text-white py-12 text-center">
					<h2 className="text-3xl font-semibold mb-4">
						Ready to start your project?
					</h2>
					<p className="mb-6">
						Get in touch with us to discuss your ideas and see how we can help.
					</p>
					<Link href="/contact">
						<p className="bg-white text-primary py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300">
							Contact Us
						</p>
					</Link>
				</section>
			</main>
		</div>
	);
}
