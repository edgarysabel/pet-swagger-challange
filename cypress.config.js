const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "bmj9sm",
  reporter: "mochawesome",
  reporterOptions: {
    // To display small circular charts regarding test results
    charts: true,
    // Generate JSON file to create custom reports
    json: true,
    // Customize the directory in which reports are saved
    reportsDir: "mochawesome-report",
    // Customize the report file name
    reportFilename: "mochawesome",
    // Generate new report file or overwrite the a single file
    overwrite: false,
    html: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
