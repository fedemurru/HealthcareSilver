// components/Modal.js

"use client";

import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
				<h2 className="text-xl font-bold mb-4">{title}</h2>
				<p className="mb-6">{message}</p>
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="bg-red-500 text-white px-4 py-2 rounded"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
