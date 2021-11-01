import InMemoryGeniallyRepository from "../mock/InMemoryGeniallyRepository";
import CreateGeniallyService from "../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import * as faker from "faker";

const repository = new InMemoryGeniallyRepository()
const service = new CreateGeniallyService(repository);

describe('CreateGeniallyService', () => {
    it('Should create geanily correctly', async () => {
        const geniallyServiceRequest = {
            id: faker.datatype.uuid(),
            name: faker.datatype.string(20),
            description: faker.datatype.string(125)
        };

        await service.execute(geniallyServiceRequest);

        const geniallyCreated = await repository.find(geniallyServiceRequest.id);

        expect(geniallyCreated.name).toEqual(geniallyServiceRequest.name);
        expect(geniallyCreated.description).toEqual(geniallyServiceRequest.description);
    });
});