import React from "react";
import {
	faFacebook,
	faXTwitter,
	faLinkedin,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SocialFooter = () => {
	return (
		<div>
			<div className="flex space-x-4">
				<Link href="https://facebook.com" passHref>
					<p
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-300"
					>
						<FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
					</p>
				</Link>
				<Link href="https://twitter.com" passHref>
					<p
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-300"
					>
						<FontAwesomeIcon icon={faXTwitter} className="h-6 w-6" />
					</p>
				</Link>
				<Link href="https://linkedin.com" passHref>
					<p
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-300"
					>
						<FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
					</p>
				</Link>
				<Link href="https://instagram.com" passHref>
					<p
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-gray-300"
					>
						<FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
					</p>
				</Link>
			</div>
		</div>
	);
};

export default SocialFooter;
