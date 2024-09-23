// components/Header.jsx
"use client";

// components/Header.jsx
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLinkClick = () => {
		setIsMenuOpen(false);
	};

	return (
		<header className=" text-white">
			<nav className="container mx-auto flex items-center justify-between relative  bg-blue-500 bg-opacity-50">
				<Link href="/" passHref>
					<div className="flex items-center">
						<Image src="/logo1.svg" width={95} height={100} alt="Logo" />
						<div className="text-xl font-bold cursor-pointer ml-4">
							Your Health Company
						</div>
					</div>
				</Link>
				<button
					onClick={toggleMenu}
					className="text-white w-8 h-8 flex items-center justify-center md:hidden"
					aria-label="Toggle navigation"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						{isMenuOpen ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"
							/>
						)}
					</svg>
				</button>
				<ul
					className={`md:flex md:space-x-4 md:items-center z-50 absolute md:static bg-blue-500  w-full md:w-auto transition-transform duration-300 ease-in-out ${
						isMenuOpen ? "top-16" : "top-[-500px]"
					} right-0 md:right-auto`}
				>
					<li>
						<Link href="/" passHref>
							<p
								className="block p-2 md:p-0 hover:text-blue-300 transition-colors duration-300"
								onClick={handleLinkClick}
							>
								Home
							</p>
						</Link>
					</li>
					<li>
						<Link href="/about" passHref>
							<p
								className="block p-2 md:p-0 hover:text-blue-300 transition-colors duration-300"
								onClick={handleLinkClick}
							>
								About Us
							</p>
						</Link>
					</li>
					<li>
						<Link href="/services" passHref>
							<p
								className="block p-2 md:p-0 hover:text-blue-300 transition-colors duration-300"
								onClick={handleLinkClick}
							>
								Services
							</p>
						</Link>
					</li>

					{/* Call to Action - Get Started */}
					<li>
						<Link href="/contact">
							<p
								onClick={handleLinkClick}
								className="md:bg-blue-600 bg-blue-500   md:block text-white px-2 md:px-4 py-2 rounded-lg shadow-md hover:bg-blue-00 transition-colors duration-300"
							>
								Book Now
							</p>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
