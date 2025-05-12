/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xs: "360px",
            sm: "576px",
            md: "960px",
            lg: "1440px",
        },
        extend: {
            colors: {
                "hover-t-fg": "var(--color-hover-text-foreground)",
                "hover-t-bg": "var(--color-hover-text-bg)",
                "secondary-bg": "var(--color-bg-secondary)",
                "theme-primary": "var(--color-theme-primary)",
                "theme-card-bg": "var(--color-theme-card-bg)",
                "admin-primary": "var(--color-admin-primary)",
            },
            fontFamily: {
                comic: ['"Comic Relief"', "cursive"],
                playfair: ['"Playfair Display"', "serif"],
                roboto: ['"Roboto"', "sans-serif"],
            },
        },
    },
    plugins: [],
};
