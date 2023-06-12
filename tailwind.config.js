/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"main-card": "#1D2733",
				"primary-button": "#0072EE",
				"hover-primary-button": "#208AFA",
			},
		},
	},
	plugins: [require("tailwindcss-animated")],
};
