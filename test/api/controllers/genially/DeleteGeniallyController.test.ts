import supertest from "supertest";
import app from "../../../../src/api/app";
import faker from "faker";

const request = supertest(app);

describe("DELETE /genially/:id", () => {
    it("Should remove genially", async () => {
        const geniallyForRemove = {
            id: faker.datatype.uuid(),
            name: faker.datatype.string(15),
            description: faker.datatype.string(100)
        }

        await request.post("/genially").send(geniallyForRemove);
        const response = await request.delete("/genially/" + geniallyForRemove.id).send();

        expect(response.status).toBe(204);
    });

    it("Should response not found if delete unexisting genially", async () => {
        const response = await request.delete("/genially/" + faker.datatype.uuid).send();

        expect(response.status).toBe(404);
    })
});