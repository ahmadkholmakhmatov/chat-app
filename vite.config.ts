import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/components/UserChat.tsx", // Your main entry component
      name: "ChatWidget",
      fileName: (format) => `chat-widget.${format}.js`,
      formats: ["iife"], // Immediately Invoked Function Expression for embedding
    },
    rollupOptions: {
      // External dependencies (if needed)
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
