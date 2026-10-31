/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                institutional: {
                    blue: '#00428A',
                    yellow: '#FFC107',
                    light: '#F8FAFC',
                    dark: '#0F172A'
                },
                accent: {
                    pink: '#ED64A6',
                    green: '#48BB78',
                    orange: '#ED8936'
                }
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
