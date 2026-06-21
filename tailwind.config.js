/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // ✅ Utilisable via `font-sans` partout
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        // (optionnel) mono si tu ajoutes GeistMono plus tard
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        bg: "#f5f5f7",
        "bg-card": "#ffffff",
        "text-main": "#111827",
        "text-muted": "#6b7280",
        border: "#e5e7eb",
        accent: "#111827",
        "accent-soft": "#e0e7ff",
      },
      borderRadius: {
        lg2: "16px",
        xl2: "20px",
      },
      boxShadow: {
        soft: "0 14px 40px rgba(15, 23, 42, 0.06)",
      },
      maxWidth: {
        site: "980px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
