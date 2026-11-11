const { defineConfig } = require("cypress");

const {deleteUserByEmail} = require ('./cypress/support/database')

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3333",
    setupNodeEvents(on, config) {
      on('task', {
        deleteUserByEmail(email) {
          return deleteUserByEmail(email);
        }
      });
    },
  },
});
