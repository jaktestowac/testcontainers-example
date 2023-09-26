const {
    expect,
    imageName,
    exposedPort,
    baseArticlesUrl,
    baseCommentsUrl,
} = require("../config");
const { GenericContainer } = require("testcontainers");
const supertest = require("supertest");

describe("Testing endpoints with testcontainers", () => {
    let container;
    let request;

    before(async () => {
        // Create a GenericContainer:
        console.log("Setting up container:", imageName);
        container = await new GenericContainer(imageName)
            .withExposedPorts(exposedPort)
            .start();

        // Check host and mapped port:
        const host = container.getHost();
        const mappedPort = container.getMappedPort(exposedPort);

        console.log("Container running on:", host, mappedPort);

        // Simple init supertest:
        request = supertest(`${host}:${mappedPort}`);
    });

    after(async () => {
        await container.stop();
    });

    describe("Sample tests", async () => {
        it("GET /articles", async () => {
            // Act:
            const response = await request.get(baseArticlesUrl);

            // Assert:
            expect(response.status).to.equal(200);
            expect(response.body.length).to.be.greaterThan(1);
            expect(response.body[0].title).to.contain(
                "How to write effective test cases"
            );
        });

        it("GET /comments", async () => {
            // Act:
            const response = await request.get(baseCommentsUrl);

            // Assert:
            expect(response.status).to.equal(200);
            expect(response.body.length).to.be.greaterThan(1);
            expect(response.body[0].body).to.contain(
                "I loved your insights on usability"
            );
        });
    });
});
