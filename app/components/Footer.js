// components/Footer.jsx

import SocialFooter from "./SocialFooter";

export default function Footer() {
	return (
		<footer className="bg-blue-500 p-4 text-white">
			<div className="container mx-auto flex justify-between items-center">
				<a href="/admin" className="text-white hover:underline">
					Admin Login
				</a>
				<p className="text-sm">
					&copy; 2024 Health Software Solution. All rights reserved.
				</p>
				<SocialFooter />
			</div>
		</footer>
	);
}
