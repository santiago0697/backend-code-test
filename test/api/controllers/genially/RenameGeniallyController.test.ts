import supertest from "supertest";
import app from "../../../../src/api/app";
import faker from "faker";

const request = supertest(app);

let geniallyForRename: {
    id: string,
    name: string,
    description: string
};

beforeEach(async () => {
    geniallyForRename = {
        id: faker.datatype.uuid(),
        name: faker.datatype.string(15),
        description: faker.datatype.string(100)
    };

    await request.post("/genially").send(geniallyForRename);
});

describe("PUT /genially/:id", () => {
    it("Should rename genially successfully", async () => {
        const newName = faker.datatype.string(10);

        const response = await request
            .put("/genially/" + geniallyForRename.id)
            .send({ name: newName });

        expect(response.status).toBe(204);
    });

    it("Should response not found if rename unexsiting genially", async () => {
        const newName = faker.datatype.string(10);

        const response = await request
            .put("/genially/" + faker.datatype.uuid)
            .send({ name: newName });

        expect(response.status).toBe(404);
    });

    it("Should response bad request if new name its wrong", async () => {
        const newName = faker.datatype.string(30);

        const response = await request
            .put("/genially/" + geniallyForRename.id)
            .send({ name: newName });

        expect(response.status).toBe(400);
    });
});