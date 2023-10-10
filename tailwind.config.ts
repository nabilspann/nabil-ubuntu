import type { Config } from 'tailwindcss';
import BackgroundImages from './BackgroundImages.json';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        ...BackgroundImages,
      },
      colors: {
        "ubuntu-dark-1": "#1d1d1d",
        "ubuntu-dark-2": "#131313",
        "ubuntu-dark-3": "#35363a",
        "ubuntu-dark-4": "#202124",
        "ubuntu-dark-5": "#222222",
        "ubuntu-gray-1": "#464646",
        "ubuntu-gray-2": "#898989",
        "ubuntu-gray-3": "#343434",
        "ubuntu-blue-1": "#0073e5",
      },
      minWidth: {
        "background-image": "250px",
      },
      minHeight: {
        "background-image": "125px",
      },
    },
  },
  plugins: [],
};
export default config
