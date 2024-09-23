/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Image from "next/image";

export default function About() {
	return (
		<div>
			<Head>
				<title>About Us - Health Software Solution</title>
				<meta
					name="description"
					content="Learn more about Health Software Solution, our mission, vision, and the team behind our innovative healthcare solutions."
				/>
			</Head>
			<main className="container mx-auto px-4 py-16">
				<h1 className="text-3xl font-bold text-blue-600 text-center">
					About Us
				</h1>
				<section className="mt-8">
					<h2 className="text-2xl font-semibold text-blue-500 text-center">
						Our Mission
					</h2>
					<p className="mt-4">
						Health Software Solution was born from the experience of a senior
						developer with 15 years of expertise and a passionate junior
						developer. Our mission is to revolutionize the healthcare industry
						through cutting-edge technology, making healthcare more efficient
						and accessible.
					</p>
				</section>

				<section className="mt-8">
					<h2 className="text-2xl font-semibold text-blue-500 text-center">
						Our Vision
					</h2>
					<p className="mt-4">
						We envision a future where technology bridges gaps in healthcare,
						improves patient outcomes, and streamlines administrative processes.
						Our goal is to be at the forefront of this transformation by
						delivering innovative and reliable software solutions.
					</p>
				</section>

				<section className="mt-8">
					<h2 className="text-2xl font-semibold text-blue-500 text-center">
						Our Team
					</h2>
					<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
							<div className="w-52 h-52 relative overflow-hidden rounded-full border-4 border-blue-500 flex items-center justify-center">
								<Image
									src="/example2.jpg"
									layout="fill"
									objectFit="cover"
									objectPosition="top"
									alt="John Doe"
								/>
							</div>
							<h3 className="text-xl font-semibold text-blue-600 mt-4">
								Dr. John Doe
							</h3>
							<p className="mt-2">Senior Healthcare Specialist</p>
							<p className="mt-2 text-center">
								With 15 years of experience in healthcare, Dr. Doe brings a
								wealth of medical knowledge and insights into the technology
								that drives our solutions.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
							<div className="w-52 h-52 relative overflow-hidden rounded-full border-4 border-blue-500 flex items-center justify-center">
								<Image
									src="/example1.jpg"
									layout="fill"
									objectFit="cover"
									alt="John Doe"
									className="transform scale-40"
								/>
							</div>
							<h3 className="text-xl font-semibold text-blue-600 mt-4">
								Dr. Jane Smith
							</h3>
							<p className="mt-2">Healthcare Technology Consultant</p>
							<p className="mt-2 text-center">
								Dr. Smith specializes in integrating healthcare technology to
								improve patient care and streamline processes within healthcare
								facilities.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
							<div className="w-52 h-52 relative overflow-hidden rounded-full border-4 border-blue-500 flex items-center justify-center">
								<Image
									src="/example3.jpg"
									layout="fill"
									objectFit="cover"
									alt="Alex Johnson"
								/>
							</div>
							<h3 className="text-xl font-semibold text-blue-600 mt-4">
								Dr. Alex Johnson
							</h3>
							<p className="mt-2">Medical Data Analyst</p>
							<p className="mt-2 text-center">
								Dr. Johnson specializes in analyzing medical data to improve
								patient outcomes and optimize healthcare operations through
								advanced analytics and technology.
							</p>
						</div>
					</div>
				</section>
				<section className="mt-8">
					<h2 className="text-2xl font-semibold text-blue-500 text-center">
						Our Values
					</h2>
					<p className="mt-4 text-lg">
						At Health Software Solution, our core values guide everything we do.
						These principles drive our mission to innovate, deliver exceptional
						service, and maintain the highest standards in the healthcare
						industry.
					</p>
					<ul className="mt-4 list-disc list-inside space-y-4">
						<li className="flex items-start space-x-3">
							<svg
								className="w-24 h-24 text-blue-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 9l3 3-3 3m-6 0l-3-3 3-3M3 12h18"
								></path>
							</svg>
							<div>
								<h3 className="text-xl font-semibold text-blue-600">
									Innovation
								</h3>
								<p className="mt-1">
									We are committed to pushing the boundaries of technology to
									meet the evolving needs of the healthcare industry. By
									leveraging cutting-edge solutions and continuous improvement,
									we strive to stay ahead of industry trends and deliver
									impactful results.
								</p>
								<p className="mt-1 text-gray-600 italic">
									"Innovation distinguishes between a leader and a follower." -
									Steve Jobs
								</p>
							</div>
						</li>
						<li className="flex items-start space-x-3">
							<svg
								className="w-24 h-24 text-blue-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4.5l3.5 2.5m-3.5-4.5H9.5v-4H12zm-3.5 5v5h7v-5H8.5z"
								></path>
							</svg>
							<div>
								<h3 className="text-xl font-semibold text-blue-600">
									Integrity
								</h3>
								<p className="mt-1">
									We uphold the highest standards of ethics and professionalism.
									Our commitment to integrity ensures that we conduct our
									business transparently, honestly, and responsibly, always
									prioritizing the best interests of our clients and
									stakeholders.
								</p>
								<p className="mt-1 text-gray-600 italic">
									"Integrity is doing the right thing, even when no one is
									watching." - C.S. Lewis
								</p>
							</div>
						</li>
						<li className="flex items-start space-x-3">
							<svg
								className="w-24 h-24 text-blue-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 16h-1v-4h1v4zm0 0h1v-4h-1v4zM7 16h1v-4H7v4zM7 16h1v-4H7v4zM19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z"
								></path>
							</svg>
							<div>
								<h3 className="text-xl font-semibold text-blue-600">
									Customer-Centricity
								</h3>
								<p className="mt-1">
									Our clients are at the heart of everything we do. We focus on
									understanding their unique needs and delivering solutions that
									provide exceptional value and enhance their operational
									efficiency. Your success is our success.
								</p>
								<p className="mt-1 text-gray-600 italic">
									"The customer’s perception is our reality." - Kate Zabriskie
								</p>
							</div>
						</li>
					</ul>
				</section>

				<section className="mt-8">
					<h2 className="text-2xl font-semibold text-blue-500">Contact Us</h2>
					<p className="mt-4">
						For more information about our services or to get in touch with our
						team, please visit our{" "}
						<a href="/contact" className="text-blue-600 hover:underline">
							Contact Page
						</a>
						.
					</p>
				</section>
			</main>
		</div>
	);
}
