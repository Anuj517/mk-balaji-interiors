import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replaceAll("\\", "/");

          if (moduleId.includes("/node_modules/gsap/") || moduleId.includes("/node_modules/lenis/")) {
            return "scroll-motion";
          }

          if (
            moduleId.includes("/node_modules/framer-motion/") ||
            moduleId.includes("/node_modules/motion-dom/") ||
            moduleId.includes("/node_modules/motion-utils/")
          ) {
            return "ui-motion";
          }

          if (moduleId.includes("/node_modules/@react-three/fiber/")) {
            return "three-fiber";
          }

          if (moduleId.includes("/node_modules/three/")) {
            return "three-core";
          }

          if (moduleId.includes("/node_modules/maath/")) {
            return "three-utils";
          }
        },
      },
    },
  },
});
