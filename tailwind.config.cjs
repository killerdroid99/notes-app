/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#222",
				accent: "#00cecb",
			},
			fontFamily: {
				qc: "'Quicksand', sans-serif",
			},
		},
	},
	plugins: [],
};
