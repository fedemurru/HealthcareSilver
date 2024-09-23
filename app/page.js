import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import WorkPage from "./services/page";
import MiddleSection from "./components/MiddleSection";

export default function Home() {
	return (
		<div className="bg-gray-50">
			<Head>
				<title>Health Company</title>
			</Head>
			<main>
				<HeroSection />
				<WorkPage />
				<MiddleSection />

				<section id="second" className="py-16">
					<div className="container mx-auto flex flex-col-reverse lg:flex-row p-6">
						{/* Content */}
						<div className="flex flex-col space-y-10 lg:mt-16 lg:w-1/2">
							<h1 className="text-3xl font-semibold text-center lg:text-6xl lg:text-left">
								Your Health Software Solution
							</h1>
							<p className="text-lg text-center lg:text-2xl lg:text-left text-gray-600">
								Experience seamless management of your health with our intuitive
								platforms. Discover powerful features and get started for free
								today.
							</p>
							{/* Buttons Container */}
							<div className="flex items-center justify-center w-full space-x-4 lg:justify-start">
								<a
									href="/about"
									className="p-4 text-sm font-semibold text-white bg-primary rounded shadow-md border-2 border-gray-300 md:text-base hover:bg-white hover:text-gray-600"
								>
									About us
								</a>
							</div>
						</div>

						{/* Image */}
						<div className="relative lg:w-1/2 mb-3">
							<Image
								src="/pexels.jpg"
								alt="Hero Illustration"
								width={1000}
								height={600}
								className="object-cover"
							/>
						</div>
					</div>
				</section>

				<section id="third" className="py-16">
					<div className="container mx-auto flex flex-col lg:flex-row p-6">
						{/* Image */}
						<div className="relative lg:w-1/2 mb-3">
							<Image
								src="/pexels2.jpg"
								alt="Another Illustration"
								width={1000}
								height={600}
								className="object-cover"
							/>
						</div>

						{/* Content */}
						<div className="flex flex-col space-y-10 lg:mt-16 lg:w-1/2 lg:justify-center lg:items-start ml-5">
							<h1 className="text-3xl font-semibold text-center lg:text-6xl lg:text-left ">
								How We Do It
							</h1>
							<p className="text-lg text-center lg:text-2xl lg:text-left text-gray-600">
								Let’s start with what we don’t do. We don’t ruin your brand by
								basing your marketing strategy around free appointments or
								discounts on social media platforms.
							</p>
							{/* Buttons Container */}
							<div className="flex items-center justify-center w-full space-x-4 lg:justify-start">
								<a
									href="/faq"
									className="p-4 text-sm font-semibold text-white bg-primary rounded shadow-md border-2 border-gray-300 md:text-base hover:bg-white hover:text-gray-600"
								>
									FAQ
								</a>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
