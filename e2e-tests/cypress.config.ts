import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "rxir4a",
  e2e: {
    baseUrl: "http://localhost:5173",
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
