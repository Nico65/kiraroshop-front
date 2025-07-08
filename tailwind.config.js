import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/components/nav.tsx", "./src/components/footer.tsx","./src/pages/home.tsx","./src/pages/about.tsx","./src/pages/product.tsx","./src/pages/contact.tsx", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
