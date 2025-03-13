export default {
  important: true, // This ensures Tailwind classes take precedence when needed
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Prevents Tailwind from resetting Chakra UI styles
  }
}