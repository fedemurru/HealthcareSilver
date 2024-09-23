"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import useAlert from "../hooks/useAlert.js";
import Alert from "../components/Alert.js";

export default function Contact() {
	const formRef = useRef();
	const { alert, showAlert, hideAlert } = useAlert();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({ name: "", email: "", message: "" });

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const validateForm = () => {
		let formErrors = {};
		let valid = true;

		if (!form.name || form.name.length < 3) {
			formErrors.name = "Name must be at least 3 characters.";
			valid = false;
		}

		if (!form.email || !validateEmail(form.email) || form.email.length < 6) {
			formErrors.email = "Please enter a valid email address.";
			valid = false;
		}

		if (!form.message || form.message.length < 10) {
			formErrors.message = "Message must be at least 10 characters.";
			valid = false;
		}

		setErrors(formErrors);
		return valid;
	};

	const handleChange = ({ target: { name, value } }) => {
		setForm({ ...form, [name]: value });
		setErrors({ ...errors, [name]: "" }); // Reset the error message for the specific field
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!validateForm()) {
			setLoading(false);
			// showAlert({
			// 	show: true,
			// 	text: "Please fix the highlighted errors.",
			// 	type: "danger",
			// });
			return;
		}

		try {
			// Send the email using EmailJS
			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // Service ID from .env
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // Template ID from .env
				{
					from_name: form.name,
					to_name: "Federico",
					from_email: form.email,
					to_email: "federico.murru87@gmail.com",
					message: form.message,
				},
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // Public Key from .env
			);

			// If email sending is successful
			setLoading(false);
			showAlert({
				show: true,
				text: "Thank you for your message 😃",
				type: "success",
			});

			setTimeout(() => {
				hideAlert(false);
				setForm({ name: "", email: "", message: "" });
			}, 3000);
		} catch (error) {
			// If email sending fails
			setLoading(false);
			console.error("Email send error: ", error);

			showAlert({
				show: true,
				text: "I didn't receive your message 😢",
				type: "danger",
			});
		}
	};

	return (
		<section className="container mx-auto py-16">
			{alert.show && <Alert {...alert} />}
			<h1 className="text-3xl font-bold text-center text-primary mb-8">
				Contact Us
			</h1>
			<form
				className="max-w-lg mx-auto bg-gray-200 p-8 rounded-lg shadow"
				ref={formRef}
				onSubmit={handleSubmit}
			>
				<div className="mb-4">
					<label className="block text-gray-700">Name</label>
					<input
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
						required
						placeholder="ex., John Doe"
						className={`w-full px-4 py-2 border rounded-lg ${
							errors.name ? "border-red-500" : ""
						}`}
					/>
					{errors.name && <p className="text-red-500">{errors.name}</p>}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Email</label>
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						required
						placeholder="ex., johndoe@gmail.com"
						className={`w-full px-4 py-2 border rounded-lg ${
							errors.email ? "border-red-500" : ""
						}`}
					/>
					{errors.email && <p className="text-red-500">{errors.email}</p>}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Message</label>
					<textarea
						name="message"
						value={form.message}
						onChange={handleChange}
						required
						rows={5}
						placeholder="Share your inquiries..."
						className={`w-full px-4 py-2 border rounded-lg ${
							errors.message ? "border-red-500" : ""
						}`}
					></textarea>
					{errors.message && <p className="text-red-500">{errors.message}</p>}
				</div>
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-primary text-white px-4 py-2 rounded-lg"
				>
					{loading ? "Sending..." : "Send Message"}
				</button>
			</form>
		</section>
	);
}
