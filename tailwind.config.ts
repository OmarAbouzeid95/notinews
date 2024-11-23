import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#171717",
        secondary: "#1d1d1d",
        extraDark: "#161616",
      },
      backgroundImage: {
        notificationApiGradient:
          "linear-gradient(90deg, rgb(255, 45, 85) 0%, rgba(129, 50, 3, 0) 157.327%)",
        notificationApiGradientInverse:
          "linear-gradient(270deg, rgb(255, 45, 85) 0%, rgba(129, 50, 3, 0) 157.327%)",
        hero: "linear-gradient(to right top, #1a1a1a, #1c1c1c, #1d1d1d, #1f1f1f, #212121)",
      },
      textColor: {
        primary: "white",
        secondary: "#DADADA",
        primaryCta: "#d07b69",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
