import supertest from "supertest";
import app from "../../../../src/api/app";
import faker from "faker";

const request = supertest(app);

describe("POST /genially", () => {
    it("Should create genially", async () => {
        const requestBody = {
            id: faker.datatype.uuid,
            name: faker.datatype.string(15),
            description: faker.datatype.string(100)
        };

        request
            .post("/genially")
            .send(requestBody)
            .expect(201)
    });

    it("Should response 400 if name length its invalid", async () => {
        const requestBody = {
            id: faker.datatype.uuid,
            name: faker.datatype.string(3),
            description: faker.datatype.string(100)
        };

        request
            .post("/genially")
            .send(requestBody)
            .expect(400);
    });
});