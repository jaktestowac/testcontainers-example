/* eslint-disable no-console */

exports.mochaHooks = {
    async beforeAll() {
        console.log("Setting up...");
    },
    async afterAll() {
        console.log("Tear down...");
    },
};
